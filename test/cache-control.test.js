import { describe, it, expect, beforeEach, vi } from 'vitest'
import request from 'supertest'

describe('Cache-Control header override', () => {
  beforeEach(() => {
    vi.resetModules()
    process.env.CACHE_CONTROL = 'private, max-age=3600'
  })

  it('responds with the overridden Cache-Control header', async () => {
    const { default: app } = await import('../src/index.js')
    const res = await request(app)
      .get('/parse')
      .set('User-Agent', 'TestAgent/1.0')
    expect(res.headers['cache-control']).toBe('private, max-age=3600')
  })
})