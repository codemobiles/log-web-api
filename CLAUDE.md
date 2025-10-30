# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a simple Node.js/Express logging web API that accepts POST requests to write log entries to a text file.

## Architecture

- **Single file application**: [server.js](server.js) - Main Express server with all endpoints and logic
- **Log storage**: Logs are appended to `logs.txt` in the project root using Node.js `fs.appendFile`
- **No database**: All logs are stored in a plain text file

### Key Endpoints

- `POST /log` - Accepts JSON body with `content` field, appends to logs.txt
- `GET /` - Health check endpoint

## Development Commands

### Start the server

```bash
npm start
```

Server runs on port 3000 by default (hardcoded in [server.js:6](server.js#L6))

### Install dependencies

```bash
npm install
```

## Testing the API

Since there are no automated tests configured, manual testing:

```bash
# Health check
curl http://localhost:3000/

# Write a log entry
curl -X POST http://localhost:3000/log -H "Content-Type: application/json"  -d '{"content":"Your log message here"}'

# View logs
cat logs.txt
```

## Important Notes

- The PORT is hardcoded to 3000 in [server.js:6](server.js#L6)
- Log file path is `logs.txt` in the project root ([server.js:7](server.js#L7))
- The `/log` endpoint requires a `content` field in the request body
- No authentication or authorization is implemented
- No log rotation mechanism exists - logs.txt will grow indefinitely
