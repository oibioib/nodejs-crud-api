import { getRequestData } from '@/lib/request';
import { IncomingMessage, ServerResponse } from 'http';

const deleteUser = (request: IncomingMessage, response: ServerResponse) => {
  console.log('contrller deleteuser data');
  const { method, pathname } = getRequestData(request);
  const responseData = {
    code: 200,
    pathname,
    method,
    message: 'controller /api/users/{userId} delete',
  };

  response.setHeader('Content-Type', 'application/json');
  response.writeHead(200);
  response.end(JSON.stringify(responseData, null, 3));
};

export default deleteUser;
