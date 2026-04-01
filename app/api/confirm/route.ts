import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

/* Tipagem dos dados recebidos pelo formulário */
interface RSVPPayload {
  name: string;
  attending: 'yes' | 'no';
  adults: string;
  children: string;
  email: string;
  phone: string;
  notes: string;
}

/* Formata a data/hora atual no fuso de Brasília */
function getBrasiliaTimestamp(): string {
  return new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    dateStyle: 'short',
    timeStyle: 'medium',
  }).format(new Date());
}

/* Autentica com a Service Account do Google e retorna o cliente Sheets */
function getSheetsClient() {
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: privateKey,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return google.sheets({ version: 'v4', auth });
}

export async function POST(request: NextRequest) {
  try {
    /* Valida variáveis de ambiente obrigatórias */
    if (
      !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ||
      !process.env.GOOGLE_PRIVATE_KEY ||
      !process.env.GOOGLE_SHEET_ID
    ) {
      console.error('[RSVP] Variáveis de ambiente do Google Sheets não configuradas.');
      return NextResponse.json(
        { success: false, error: 'Configuração do servidor incompleta.' },
        { status: 500 }
      );
    }

    /* Lê e valida o corpo da requisição */
    const body: RSVPPayload = await request.json();

    if (!body.name?.trim()) {
      return NextResponse.json(
        { success: false, error: 'Nome é obrigatório.' },
        { status: 400 }
      );
    }

    if (!body.attending) {
      return NextResponse.json(
        { success: false, error: 'Por favor, informe se irá ao evento.' },
        { status: 400 }
      );
    }

    if (!body.email?.trim()) {
      return NextResponse.json(
        { success: false, error: 'E-mail é obrigatório.' },
        { status: 400 }
      );
    }

    /* Monta a linha para inserção na planilha */
    const row = [
      getBrasiliaTimestamp(),             // A: Timestamp
      body.name.trim(),                   // B: Nome
      body.attending === 'yes' ? 'Sim' : 'Não', // C: Vai ao evento
      body.adults ?? '1',                 // D: Adultos
      body.children ?? '0',              // E: Crianças
      body.email.trim(),                  // F: Email
      body.phone?.trim() ?? '',           // G: Telefone
      body.notes?.trim() ?? '',           // H: Observações
    ];

    /* Insere a linha na planilha via API */
    const sheets = getSheetsClient();

    await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: 'Sheet1!A:H',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [row],
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[RSVP] Erro ao salvar no Google Sheets:', error);
    return NextResponse.json(
      { success: false, error: 'Não foi possível salvar a confirmação. Tente novamente.' },
      { status: 500 }
    );
  }
}
