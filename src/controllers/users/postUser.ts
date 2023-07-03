import { ERRORS } from '@/config/errors';
import { RequestBodyError, sendError } from '@/lib/errors';
import { generateId } from '@/lib/id';
import { getRequestBody, verifyUserBody } from '@/lib/request';
import { ControllerType } from '@/types';

const postUser: ControllerType = async (request, response, db) => {
  try {
    // const requestBody = await parseRequestBody(request);
    const requestBody = await getRequestBody(request);
    const verifiedUserData = verifyUserBody(requestBody);

    if (verifiedUserData) {
      const alreadyExistUsersIds = db.getUserIds();
      const id = generateId(alreadyExistUsersIds);

      const newUser = { id, ...verifiedUserData };

      db.addUser(newUser);

      response.setHeader('Content-Type', 'application/json');
      response.writeHead(200);
      response.end(JSON.stringify(newUser, null, 2));
    } else throw new RequestBodyError();
  } catch (error) {
    if (error instanceof RequestBodyError) {
      sendError(response, ERRORS.INVALID_USER_BODY);
    } else {
      sendError(response, ERRORS.INTERNAL_SERVER_ERROR);
    }
  }
};

export default postUser;
