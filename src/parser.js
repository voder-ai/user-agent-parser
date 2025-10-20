import UAParser from 'ua-parser-js'
import crypto from 'crypto'

export function parseUA(uaString) {
  if (!uaString) {
    throw new Error('User-Agent string is required')
  }

  const parser = new UAParser(uaString)
  const result = {
    ua: uaString,
    browser: parser.getBrowser(),
    engine: parser.getEngine(),
    os: parser.getOS(),
    device: parser.getDevice(),
    cpu: parser.getCPU()
  }

  const body = JSON.stringify(result)
  const hash = crypto.createHash('md5').update(body).digest('hex')
  const etag = `"${hash}"`

  return { result, etag }
}