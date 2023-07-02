import { getUsers, getUser, postUser, putUser, deleteUser } from '@/controllers/users';
import { IncomingMessage, ServerResponse } from 'http';

type EndpointPathType = '/api/users';

type EndpointMethodsType = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type EndpointType = {
  endpoint: EndpointPathType;
  method: EndpointMethodsType;
  endpointPathParts: number;
  controller: (request: IncomingMessage, response: ServerResponse) => void;
};

export const appEndpoints: EndpointType[] = [
  {
    endpoint: '/api/users',
    method: 'GET',
    endpointPathParts: 2,
    controller: (request, response) => getUsers(request, response),
  },
  {
    endpoint: '/api/users',
    method: 'GET',
    endpointPathParts: 3,
    controller: (request, response) => getUser(request, response),
  },
  {
    endpoint: '/api/users',
    method: 'POST',
    endpointPathParts: 2,
    controller: (request, response) => postUser(request, response),
  },
  {
    endpoint: '/api/users',
    method: 'PUT',
    endpointPathParts: 3,
    controller: (request, response) => putUser(request, response),
  },
  {
    endpoint: '/api/users',
    method: 'DELETE',
    endpointPathParts: 3,
    controller: (request, response) => deleteUser(request, response),
  },
];
