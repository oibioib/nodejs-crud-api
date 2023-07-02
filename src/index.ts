import http from 'http';
import { PORT } from '@/config';
import { printStartMessage, requestListener } from '@/lib/server';

const server = http.createServer(requestListener);
server.listen(PORT, () => printStartMessage(+PORT));
