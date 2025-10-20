import request from 'supertest'
import { describe, it, expect } from 'vitest'
import app from '../src/index.js'

describe('Parse endpoint', () => {
  it('GET /parse responds with parsed user-agent JSON and caching headers', async () => {
    const customUA = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/100.0.4896.75 Safari/537.36'
    const res = await request(app)
      .get('/parse')
      .set('User-Agent', customUA)

    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('ua', customUA)
    expect(res.body).toHaveProperty('browser')
    expect(res.body).toHaveProperty('engine')
    expect(res.body).toHaveProperty('os')
    expect(res.body).toHaveProperty('device')
    expect(res.body).toHaveProperty('cpu')
    expect(res.headers).toHaveProperty('cache-control')
    expect(res.headers['cache-control']).toMatch(/public/i)
    expect(res.headers).toHaveProperty('etag')
    expect(typeof res.headers.etag).toBe('string')
  })
})