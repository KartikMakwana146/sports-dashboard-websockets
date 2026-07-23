import WebSocket, { WebSocketServer } from 'ws';

function sendJson (socket, payload) {
    if(socket.readyState !== WebSocket.OPEN) return;

    socket.send(JSON.stringify(payload));
}

function broadcast (wss, payload) {
    wss.clients.forEach((client) => {
        if(client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(payload));
        }
    });
}

export function attachWebSocketServer (server) {
    const wss = new WebSocketServer({ 
        server,
        path: '/ws',
        maxPayload: 1024 * 1024 // 1 MB
    });

    wss.on('connection', (socket) => {
        sendJson(socket, { type: 'Welcome' });

        socket.on('error', (err) => {
            console.log('WebSocket error:', err);
        });
    });

    function broadcastMatchCreated (match) {
        broadcast(wss, { type: 'MatchCreated', data: match });
    }

    return { broadcastMatchCreated };
}