# RSVP — Integração com Google Sheets

Integração do formulário de confirmação de presença com Google Sheets via Google Apps Script.
Não requer conta empresarial — funciona com Gmail pessoal.

---

## O que a LLM fez

- [x] Configurar Vitest (`vitest.config.ts`, scripts `test`/`test:watch` no `package.json`)
- [x] Remover dependência `googleapis`
- [x] Escrever testes (RED): `app/api/confirm/__tests__/route.test.ts`
- [x] Reescrever `app/api/confirm/route.ts` para usar `fetch` → Apps Script (GREEN)
- [x] Atualizar `.env.local.example` com a nova variável `APPS_SCRIPT_URL`

---

## O que você precisa fazer

### A — Criar a planilha Google Sheets

1. Criar planilha nova com seu Gmail pessoal
2. Na aba `Sheet1`, colocar os headers na linha 1:

| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| Timestamp | Nome | Vai? | Adultos | Crianças | Email | Telefone | Observações |

### B — Criar e publicar o Apps Script

1. Na planilha: **Extensões > Apps Script**
2. Apagar o código existente e colar:

```javascript
function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.appendRow([
      new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
      data.name,
      data.attending === 'yes' ? 'Sim' : 'Não',
      data.adults,
      data.children,
      data.email,
      data.phone,
      data.notes,
    ]);
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Clicar em **Implantar > Nova implantação**:
   - Tipo: **App da Web**
   - Executar como: **Eu** (seu Gmail)
   - Quem tem acesso: **Qualquer pessoa**
4. Copiar a URL gerada (formato: `https://script.google.com/macros/s/SEU_ID/exec`)

### C — Configurar variável de ambiente

1. Criar `.env.local` na raiz:
   ```
   APPS_SCRIPT_URL=https://script.google.com/macros/s/SEU_ID/exec
   ```
2. Na Vercel: **Settings > Environment Variables** → adicionar `APPS_SCRIPT_URL`

---

## Verificação

```bash
npm test          # 8 testes passando
npm run dev       # Abrir o formulário, preencher e enviar
                  # Verificar que a linha aparece na planilha
```
