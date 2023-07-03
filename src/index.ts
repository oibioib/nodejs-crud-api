import { PORT } from '@/config/server';
import { createServer, printStartMessage } from '@/lib/server';
import { DB } from '@/lib/db';

const db = new DB();

createServer(db).listen(PORT, () => printStartMessage(+PORT));
