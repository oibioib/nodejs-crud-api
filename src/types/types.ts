import { DB } from '@/db';
import { IncomingMessage, ServerResponse } from 'http';

export type ControllerType = (request: IncomingMessage, response: ServerResponse, db: DB) => void;
