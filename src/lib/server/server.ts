import { IncomingMessage, ServerResponse } from 'http';
import { appEndpoints } from '@/config';
import { logRequest } from '@/lib/request-logger';
import { printColorMessage } from '@/lib/colors';
import { getEndpointController, getRequestData } from '@/lib/request';

export const printStartMessage = (PORT: number) => {
  printColorMessage({ color: 'yellow', message: `Server is running on port ${PORT}` });
};

const sendNotFoundError = (response: ServerResponse) => {
  const error = {
    code: 404,
    message: 'Oops!',
  };

  response.setHeader('Content-Type', 'application/json');
  response.writeHead(404);
  response.end(JSON.stringify(error, null, 2));
};

export const requestListener = (request: IncomingMessage, response: ServerResponse) => {
  logRequest(request);

  const { method, pathname } = getRequestData(request);
  const requestController = getEndpointController(pathname, method, appEndpoints);

  if (!requestController) {
    sendNotFoundError(response);
  } else {
    requestController(request, response);
  }
};

// sendOk(response, pathname, method, requestController());
