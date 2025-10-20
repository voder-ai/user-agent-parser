import express from 'express'
import morgan from 'morgan'
import { parseUA } from './parser.js'

const app = express()

// record incoming requests for audit purposes
app.use(morgan('combined'))

const PORT = process.env.PORT || 3000
// allow override of Cache-Control header via environment
const CACHE_CONTROL = process.env.CACHE_CONTROL || 'public, max-age=0'

// Health-check endpoint returns structured JSON for monitoring systems
app.get('/', (req, res) => {
  res.json({ status: 'ok' })
})

// Parse User-Agent and provide caching headers so clients can reuse responses
app.get('/parse', (req, res) => {
  const uaString = req.get('User-Agent')
  if (!uaString) {
    return res.status(400).json({ error: 'User-Agent header is required' })
  }

  const { result, etag } = parseUA(uaString)

  // enable client caching via ETag without server-side state
  res.set('Cache-Control', CACHE_CONTROL)
  res.set('ETag', etag)

  // respond with 304 when client cache is fresh
  if (req.get('If-None-Match') === etag) {
    return res.status(304).end()
  }

  res.json(result)
})

// centralized error handler to surface unexpected failures gracefully
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).json({ error: err.message })
})

// skip startup code during tests and coverage reporting
/* istanbul ignore next */
if (import.meta.url === `file://${process.argv[1]}`) {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
  })
}

export default app