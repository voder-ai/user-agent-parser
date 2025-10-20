# user-agent-parser

A lightweight HTTP server that parses User-Agent strings and returns structured JSON responses.

## Installation

Install dependencies and start the server:

```bash
npm install
npm start
```

By default, the server listens on port 3000. You can set `PORT` to change it.

## Usage

Health-check endpoint:

```bash
curl http://localhost:3000/
# → {"status":"ok"}
```

Parse User-Agent strings:

```bash
curl http://localhost:3000/parse \
  -H "User-Agent: YourUserAgentString"
```

**Note:** If no `CACHE_CONTROL` environment variable is provided, the server responds with a default `Cache-Control: public, max-age=0` header.

You’ll receive a JSON payload with `ua`, `browser`, `engine`, `os`, `device`, `cpu`, plus `Cache-Control` and `ETag` headers for client caching.

![npm](https://img.shields.io/npm/v/user-agent-parser)  
![coverage](https://img.shields.io/badge/coverage-100%25-brightgreen)

### Custom Cache-Control

Start the server with a custom header:

```bash
CACHE_CONTROL="private, max-age=3600" npm start
```

Then request the parse endpoint:

```bash
curl -I http://localhost:3000/parse \
  -H "User-Agent: TestAgent/1.0"
# → Cache-Control: private, max-age=3600
```

## Changelog

See the full release notes in [CHANGELOG.md](CHANGELOG.md).

## Testing

Run the full test suite:  
```bash
npm test
```

Generate a coverage report:  
```bash
npm run coverage
```

### Conditional-GET example

```bash
curl -i \
  -H "If-None-Match: <etag>" \
  http://localhost:3000/your-endpoint
```

If the resource has not changed, the server responds with:

HTTP/1.1 304 Not Modified  
Cache-Control: public, max-age=0  
ETag: <etag>