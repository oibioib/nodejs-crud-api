import { getRequestData } from '@/lib/request';
import { ControllerType } from '@/types';

const postUser: ControllerType = (request, response, db) => {
  console.log('contrller postuser data');
  const { method, pathname } = getRequestData(request);
  const responseData = {
    code: 200,
    pathname,
    method,
    message: 'controller /api/users POST',
  };

  response.setHeader('Content-Type', 'application/json');
  response.writeHead(200);
  response.end(JSON.stringify(responseData, null, 3));
};

export default postUser;
