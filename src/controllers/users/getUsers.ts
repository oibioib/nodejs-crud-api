import { ControllerType } from '@/types';

const getUsers: ControllerType = (request, response, db) => {
  const users = db.getUsers();

  response.setHeader('Content-Type', 'application/json');
  response.writeHead(200);
  response.end(JSON.stringify(users, null, 2));
};

export default getUsers;
