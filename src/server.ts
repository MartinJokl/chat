import { createServer } from 'http'
import next from 'next'
import { WebSocketServer, WebSocket } from 'ws';
import { isSendingMessage } from './types/message.ts';
import { createMessage, getMessageById } from './dal/custom-header-message.ts';
import { auth } from './lib/auth.ts';

const port = parseInt(process.env.PORT || '3000', 10)
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

interface UserWebSocket extends WebSocket {
  userId: string,
  headers: Headers // save headers to auth later when sending messages
}

nextApp.prepare().then(() => {
  const server = createServer((req, res) => {
    handle(req, res)
  });

  const wss = new WebSocketServer({ noServer: true });

  wss.on('connection', (ws: UserWebSocket) => {
    console.log(`someone connected to ws server: ${ws.userId}`);

    ws.on('message', async data => {
      const message = JSON.parse(data.toString());
      if (isSendingMessage(message)) {
        const newMessageId = await createMessage(ws.headers, message.reciever, message.content);
        if (!newMessageId) {
          return;
        }
        const newMessage = await getMessageById(ws.headers, newMessageId);
        if (!newMessage) {
          return;
        }
        wss.clients.forEach((recievingWs: WebSocket) => {
          const recievingUserWs = recievingWs as UserWebSocket;

          if (message.reciever === null || recievingUserWs.userId === message.reciever || recievingUserWs.userId === ws.userId) {
            recievingWs.send(JSON.stringify(newMessage));
          }
        })
      }
    })
  });

  server.on("upgrade", async (req, socket, head) => {
    const pathname = req.url;

    if (pathname?.startsWith("/_next/webpack-hmr")) {
      nextApp.getUpgradeHandler()(req, socket, head);
    }

    if (pathname === "/messages") {
      console.log(req.headers.cookie);

      const headers = toHeaders(req.headers);

      const session = await auth.api.getSession({
        headers
      });

      if (!session) {
        return;
      }
      wss.handleUpgrade(req, socket, head, (ws) => {
        const userWs = ws as UserWebSocket;
        userWs.userId = session.user.id;
        userWs.headers = headers;

        wss.emit('connection', userWs, req);
      });

    }
  });

  server.listen(port);
  console.log(`Server listening at http://localhost:${port} as ${dev ? 'development' : process.env.NODE_ENV}`);
});

function toHeaders(nodeHeaders: object): Headers {
  const headers = new Headers();

  for (const [key, value] of Object.entries(nodeHeaders)) {
    if (value) {
      headers.set(key, Array.isArray(value) ? value.join(",") : value);
    }
  }

  return headers;
}