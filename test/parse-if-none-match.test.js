import request from 'supertest'
import { describe, it, expect } from 'vitest'
import app from '../src/index.js'

describe('Conditional GET /parse', () => {
  it('returns 304 Not Modified when If-None-Match matches ETag', async () => {
    const userAgent = 'TestAgent/1.0'

    const firstRes = await request(app)
      .get('/parse')
      .set('User-Agent', userAgent)
    expect(firstRes.status).toBe(200)
    const etag = firstRes.headers['etag']
    expect(etag).toBeDefined()

    const secondRes = await request(app)
      .get('/parse')
      .set('User-Agent', userAgent)
      .set('If-None-Match', etag)
    expect(secondRes.status).toBe(304)
    expect(secondRes.text).toBe('')
  })
})