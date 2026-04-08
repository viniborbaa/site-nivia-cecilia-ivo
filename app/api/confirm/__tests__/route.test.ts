import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { NextRequest } from 'next/server'

const SCRIPT_URL = 'https://script.google.com/macros/s/FAKE_ID/exec'

const VALID_PAYLOAD = {
  name: 'Maria Silva',
  attending: 'yes' as const,
  adults: '2',
  children: '1',
  email: 'maria@example.com',
  phone: '11999999999',
  notes: '',
}

function makeRequest(body: object) {
  return new NextRequest('http://localhost/api/confirm', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
}

describe('POST /api/confirm', () => {
  beforeEach(() => {
    process.env.APPS_SCRIPT_URL = SCRIPT_URL
  })

  afterEach(() => {
    delete process.env.APPS_SCRIPT_URL
    vi.restoreAllMocks()
  })

  it('retorna 400 quando name está vazio', async () => {
    const { POST } = await import('../route')
    const res = await POST(makeRequest({ ...VALID_PAYLOAD, name: '' }))
    const data = await res.json()
    expect(res.status).toBe(400)
    expect(data.success).toBe(false)
    expect(data.error).toMatch(/nome/i)
  })

  it('retorna 400 quando attending está vazio', async () => {
    const { POST } = await import('../route')
    const res = await POST(makeRequest({ ...VALID_PAYLOAD, attending: '' }))
    const data = await res.json()
    expect(res.status).toBe(400)
    expect(data.success).toBe(false)
  })

  it('retorna 400 quando email está vazio', async () => {
    const { POST } = await import('../route')
    const res = await POST(makeRequest({ ...VALID_PAYLOAD, email: '' }))
    const data = await res.json()
    expect(res.status).toBe(400)
    expect(data.success).toBe(false)
    expect(data.error).toMatch(/e-mail/i)
  })

  it('retorna 500 quando APPS_SCRIPT_URL não está definida', async () => {
    delete process.env.APPS_SCRIPT_URL
    const { POST } = await import('../route')
    const res = await POST(makeRequest(VALID_PAYLOAD))
    const data = await res.json()
    expect(res.status).toBe(500)
    expect(data.success).toBe(false)
  })

  it('faz fetch para APPS_SCRIPT_URL com o payload correto', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json' },
      })
    )
    vi.stubGlobal('fetch', fetchMock)

    const { POST } = await import('../route')
    await POST(makeRequest(VALID_PAYLOAD))

    expect(fetchMock).toHaveBeenCalledOnce()
    const [url, options] = fetchMock.mock.calls[0]
    expect(url).toBe(SCRIPT_URL)
    expect(options.method).toBe('POST')
    const sentBody = JSON.parse(options.body)
    expect(sentBody.name).toBe(VALID_PAYLOAD.name)
    expect(sentBody.attending).toBe(VALID_PAYLOAD.attending)
    expect(sentBody.email).toBe(VALID_PAYLOAD.email)
  })

  it('retorna { success: true } quando Apps Script responde com sucesso', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ success: true }), {
          headers: { 'Content-Type': 'application/json' },
        })
      )
    )

    const { POST } = await import('../route')
    const res = await POST(makeRequest(VALID_PAYLOAD))
    const data = await res.json()
    expect(res.status).toBe(200)
    expect(data.success).toBe(true)
  })

  it('retorna { success: false } quando Apps Script responde com erro', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify({ success: false, error: 'Erro interno do script' }), {
          headers: { 'Content-Type': 'application/json' },
        })
      )
    )

    const { POST } = await import('../route')
    const res = await POST(makeRequest(VALID_PAYLOAD))
    const data = await res.json()
    expect(res.status).toBe(500)
    expect(data.success).toBe(false)
  })

  it('retorna 500 quando fetch lança exceção', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network error')))

    const { POST } = await import('../route')
    const res = await POST(makeRequest(VALID_PAYLOAD))
    const data = await res.json()
    expect(res.status).toBe(500)
    expect(data.success).toBe(false)
  })
})
