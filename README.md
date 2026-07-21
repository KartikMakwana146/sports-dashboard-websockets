# WebSocket Scoreboard

A Node.js API for managing matches and scoreboard data with Express, Drizzle ORM, PostgreSQL, and Zod validation.

## What It Does

The current codebase exposes a small REST API for creating and listing matches. It stores match and commentary data in PostgreSQL through Drizzle, and validates request payloads with Zod.

## Requirements

- Node.js 18 or newer
- npm
- PostgreSQL database

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root with your database URL:

```bash
DATABASE_URL=postgres://user:password@localhost:5432/websocket_scoreboard
```

3. Run the database migration:

```bash
npm run db:migrate
```

4. Start the server:

```bash
npm start
```

The server listens on port `6060`.

## Scripts

- `npm start` - Start the API server
- `npm run dev` - Start the API server with Node watch mode
- `npm run db:generate` - Generate a new Drizzle migration from the schema
- `npm run db:migrate` - Apply migrations to the database
- `npm test` - Placeholder test script

## API

### `GET /matches`

Returns a list of matches ordered by `startTime`.

Query parameters:

- `limit` - Optional positive integer, capped at 100

Response:

```json
{
   "data": []
}
```

### `POST /matches`

Creates a match.

Body:

```json
{
   "sport": "Football",
   "homeTeam": "Team A",
   "awayTeam": "Team B",
   "startTime": "2026-07-21T18:00:00.000Z",
   "endTime": "2026-07-21T20:00:00.000Z",
   "homeScore": 0,
   "awayScore": 0
}
```

Validation rules:

- `sport`, `homeTeam`, and `awayTeam` are required
- `startTime` and `endTime` must be valid ISO date strings
- `endTime` must be after `startTime`
- `homeScore` and `awayScore` default to `0` when omitted

## Database Schema

The main tables defined in the schema are:

- `matches` - Match metadata, scores, status, and timestamps
- `commentary` - Commentary events linked to a match

## Project Structure

```text
websocket-scoreboard/
├── server.js
├── drizzle.config.js
├── drizzle/
├── src/
│   ├── app.js
│   ├── db/
│   │   ├── db.js
│   │   └── schema.js
│   ├── routes/
│   │   └── matches.js
│   ├── utils/
│   │   └── match-status.js
│   └── validation/
│       └── matches.js
└── README.md
```

## Notes

- The application currently exposes REST endpoints only; there is no WebSocket layer implemented yet.
- Database connection setup lives in `src/db/db.js` and requires `DATABASE_URL` to be set before the app starts.
