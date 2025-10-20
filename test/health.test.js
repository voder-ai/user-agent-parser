import request from 'supertest'
import { describe, it, expect } from 'vitest'
import app from '../src/index.js'

describe('Health-check', () => {
  it('GET / responds with JSON status', async () => {
    const res = await request(app).get('/')
    expect(res.status).toBe(200)
    // Response must be JSON
    expect(res.headers['content-type']).toMatch(/application\/json/)
    // Body should contain the structured status
    expect(res.body).toEqual({ status: 'ok' })
  })
})