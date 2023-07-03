import { DB } from '@/lib/db';
import { IncomingMessage, ServerResponse } from 'http';

export type ControllerType = (request: IncomingMessage, response: ServerResponse, db: DB) => void;

export type UserIdType = string;
export type UserNameType = string;
export type UserAgeType = number;
export type UserHobbyType = string;

export type UserType = {
  id: UserIdType;
  username: UserNameType;
  age: UserAgeType;
  hobbies: UserHobbyType[];
};
