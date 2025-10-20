import { describe, it, expect, beforeEach, vi } from 'vitest'
import request from 'supertest'

beforeEach(() => {
  vi.resetModules()
  vi.doMock('../src/parser.js', () => ({
    parseUA: () => { throw new Error('boom') }
  }))
})

describe('Centralized error handler', () => {
  it('catches internal errors and responds with status 500 and error JSON', async () => {
    const { default: app } = await import('../src/index.js')
    const res = await request(app)
      .get('/parse')
      .set('User-Agent', 'anything')
    expect(res.status).toBe(500)
    expect(res.body).toEqual({ error: 'boom' })
  })
})