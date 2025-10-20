import request from 'supertest'
import { describe, it, expect } from 'vitest'
import app from '../src/index.js'

describe('GET /parse without User-Agent header', () => {
  it('responds 400 with an error message', async () => {
    const res = await request(app)
      .get('/parse')

    expect(res.status).toBe(400)
    expect(res.body).toEqual({ error: 'User-Agent header is required' })
  })
})