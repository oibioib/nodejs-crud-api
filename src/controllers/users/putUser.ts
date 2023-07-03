import { ERRORS } from '@/config/errors';
import { RequestBodyError, sendError } from '@/lib/errors';
import { isIdValid } from '@/lib/id';
import { getRequestData, getRequestBody, verifyUserBody } from '@/lib/request';
import { ControllerType } from '@/types';

const putUser: ControllerType = async (request, response, db) => {
  try {
    const { pathname } = getRequestData(request);
    const [requestUserId] = pathname.split('/').slice(-1);

    if (!isIdValid(requestUserId)) {
      sendError(response, ERRORS.INVALID_USER_ID);
      return;
    }

    const requestBody = await getRequestBody(request);
    const verifiedUserData = verifyUserBody(requestBody);

    if (verifiedUserData) {
      const updatedUser = db.updateUser({ id: requestUserId, ...verifiedUserData });

      if (!updatedUser) {
        sendError(response, ERRORS.USER_NOT_EXIST);
        return;
      }

      response.setHeader('Content-Type', 'application/json');
      response.writeHead(200);
      response.end(JSON.stringify(updatedUser, null, 2));
    } else throw new RequestBodyError();
  } catch (error) {
    if (error instanceof RequestBodyError) {
      sendError(response, ERRORS.INVALID_USER_BODY);
    } else {
      sendError(response, ERRORS.INTERNAL_SERVER_ERROR);
    }
  }
};

export default putUser;
