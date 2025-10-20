import { parseUA } from '../src/parser.js'
import crypto from 'crypto'
import { describe, it, expect } from 'vitest'

describe('parseUA()', () => {
  const sampleUA =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) ' +
    'AppleWebKit/537.36 (KHTML, like Gecko) ' +
    'Chrome/91.0.4472.124 Safari/537.36'

  it('returns an object with ua, browser, engine, os, device, cpu and a correct ETag', () => {
    const { result, etag } = parseUA(sampleUA)

    expect(result).toHaveProperty('ua', sampleUA)
    expect(result).toHaveProperty('browser')
    expect(result).toHaveProperty('engine')
    expect(result).toHaveProperty('os')
    expect(result).toHaveProperty('device')
    expect(result).toHaveProperty('cpu')

    const expectedHash = crypto
      .createHash('md5')
      .update(JSON.stringify(result))
      .digest('hex')
    expect(etag).toBe(`"${expectedHash}"`)
  })

  it('throws an error when the User-Agent string is missing or empty', () => {
    expect(() => parseUA()).toThrow('User-Agent string is required')
    expect(() => parseUA('')).toThrow('User-Agent string is required')
  })
})