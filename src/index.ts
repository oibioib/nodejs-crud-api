import http, { IncomingMessage, ServerResponse } from 'http';
import { PORT } from '@/config/server';
import { printStartMessage, requestListener } from '@/lib/server';
import { DB } from '@/db';

const db = new DB();

const server = http.createServer((request: IncomingMessage, response: ServerResponse) =>
  requestListener(request, response, db)
);
server.listen(PORT, () => printStartMessage(+PORT));
