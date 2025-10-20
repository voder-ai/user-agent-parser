# Changelog

## [1.2.0] - 2024-07-15

## [1.1.0] - 2024-07-01

### Added
- Default `Cache-Control` header adjusted to `public, max-age=0`
- Added `CACHE_CONTROL` override option for specifying custom cache-control headers
- Added tests for default and custom cache-control behavior

## [1.0.0] - 2024-06-21

### Added
- Health-check endpoint (`GET /`) returning structured JSON `{ status: 'ok' }`
- `/parse` endpoint parsing `User-Agent` header into `ua`, `browser`, `engine`, `os`, `device`, `cpu`
- ETag support on `/parse` responses; clients receive `304 Not Modified` when `If-None-Match` matches
- Customizable `Cache-Control` header on `/parse` via `CACHE_CONTROL` environment variable
- `parseUA()` function using `ua-parser-js` and MD5 hashing to compute ETag
- Request logging with Morgan
- Centralized error handler for graceful error responses
- Vitest + Supertest test suite covering endpoints, conditional requests, and parser utility

### Fixed
- Return `400 Bad Request` when `User-Agent` header is missing on `/parse`
- Throw error in `parseUA()` if no User-Agent string is provided

### Documentation
- `README.md` updated with custom cache-control usage example
- Added `LICENSE` (MIT)
- Defined `start` and `test` scripts and required dependencies in `package.json`