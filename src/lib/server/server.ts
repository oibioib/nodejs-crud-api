import { IncomingMessage, ServerResponse } from 'http';
import { appEndpoints } from '@/config/endpoints';
import { DB } from '@/db';
import { logRequest } from '@/lib/request-logger';
import { printColorMessage } from '@/lib/colors';
import { getEndpointController, getRequestData } from '@/lib/request';
import { sendError } from '@/lib/errors';
import { ERRORS } from '@/config/errors';

export const printStartMessage = (PORT: number) => {
  printColorMessage({ color: 'yellow', message: `Server is running on port ${PORT}` });
};

export const requestListener = (request: IncomingMessage, response: ServerResponse, db: DB) => {
  logRequest(request);

  const { method, pathname } = getRequestData(request);
  const requestController = getEndpointController(pathname, method, appEndpoints);

  if (!requestController) {
    sendError(response, ERRORS.NO_ENDPOINT);
  } else {
    requestController(request, response, db);
  }
};
