import { ERRORS } from '@/config/errors';
import { sendError } from '@/lib/errors';
import { ControllerType } from '@/types';

const getUsers: ControllerType = (_request, response, db) => {
  try {
    const users = db.getUsers();

    response.setHeader('Content-Type', 'application/json');
    response.writeHead(200);
    response.end(JSON.stringify(users, null, 2));
  } catch {
    sendError(response, ERRORS.INTERNAL_SERVER_ERROR);
  }
};

export default getUsers;
