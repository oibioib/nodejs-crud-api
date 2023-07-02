import { getRequestData } from '@/lib/request';
import { IncomingMessage, ServerResponse } from 'http';

const putUser = (request: IncomingMessage, response: ServerResponse) => {
  console.log('contrller putuser data');
  const { method, pathname } = getRequestData(request);
  const responseData = {
    code: 200,
    pathname,
    method,
    message: 'controller /api/users/{userId} PUT',
  };

  response.setHeader('Content-Type', 'application/json');
  response.writeHead(200);
  response.end(JSON.stringify(responseData, null, 3));
};

export default putUser;
