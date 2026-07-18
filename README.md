# WebSocket Scoreboard

A real-time scoreboard application built with Express.js and WebSocket technology for live score updates and tracking.

## Overview

This project provides a server-based scoreboard system that can be used to display and update scores in real-time using WebSocket connections. Perfect for sports events, competitions, gaming tournaments, or any application requiring live score updates.

## Prerequisites

- Node.js (v14.0.0 or higher)
- npm (v6.0.0 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd websocket-scoreboard
```

2. Install dependencies:
```bash
npm install
```

## Usage

### Development Mode

Run the server in development mode with automatic restart on file changes:

```bash
npm run dev
```

### Production Mode

Start the server in production mode:

```bash
npm start
```

The server will start and listen on port `6060`:
```
Server listening on port 6060
```

## Available Scripts

- `npm start` - Start the server in production mode
- `npm run dev` - Start the server in development mode with file watching enabled
- `npm test` - Run tests (currently not configured)

## Project Structure

```
websocket-scoreboard/
├── server.js              # Main server entry point
├── src/
│   └── app.js            # Express application configuration
├── package.json          # Project dependencies and metadata
└── README.md             # This file
```

## Dependencies

- **express** (^5.2.1) - Fast, unopinionated web framework for Node.js

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. The server will be available at `http://localhost:6060`

## Next Steps

- Add WebSocket support (consider using Socket.IO or the native ws library)
- Implement scoreboard data models
- Create API endpoints for score management
- Add client-side interface for score display and updates
- Implement real-time score broadcasting to connected clients

## License

ISC

## Author

[Your Name]

---

For more information or to contribute, please contact the project maintainer.
