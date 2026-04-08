import { NextRequest, NextResponse } from 'next/server';

interface RSVPPayload {
  name: string;
  attending: 'yes' | 'no';
  adults: string;
  children: string;
  email: string;
  phone: string;
  notes: string;
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.APPS_SCRIPT_URL) {
      console.error('[RSVP] APPS_SCRIPT_URL não configurada.');
      return NextResponse.json(
        { success: false, error: 'Configuração do servidor incompleta.' },
        { status: 500 }
      );
    }

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

    const payload = {
      name: body.name.trim(),
      attending: body.attending,
      adults: body.adults ?? '1',
      children: body.children ?? '0',
      email: body.email.trim(),
      phone: body.phone?.trim() ?? '',
      notes: body.notes?.trim() ?? '',
    };

    const res = await fetch(process.env.APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (data.success) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, error: data.error ?? 'Erro ao salvar.' },
      { status: 500 }
    );
  } catch (error) {
    console.error('[RSVP] Erro ao salvar no Apps Script:', error);
    return NextResponse.json(
      { success: false, error: 'Não foi possível salvar a confirmação. Tente novamente.' },
      { status: 500 }
    );
  }
}
