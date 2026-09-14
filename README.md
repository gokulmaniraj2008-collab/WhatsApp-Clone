# ChatWave Go

A clean-room WhatsApp-style chat clone built with Go, WebSockets, Bootstrap, and an in-memory message store.

## Stack
- Go 1.24
- `net/http` REST server
- Gorilla WebSocket for realtime messaging
- Bootstrap 5 UI
- No npm, Node.js, Swift, or Android build dependency in the server project

## Run locally

```bash
go mod download
go run ./cmd/chatwave
```

Open `http://localhost:8080`.

## API
- `GET /api/health` — service health
- `GET /api/messages` — recent messages
- `GET /ws` — realtime WebSocket channel

## CI
GitHub Actions runs `go mod download`, `go test ./...`, and `go build ./cmd/chatwave`.

This is an independent learning project and is not affiliated with WhatsApp or Meta.
