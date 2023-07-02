import { getUsers, getUser, postUser, putUser, deleteUser } from '@/controllers/users';
import { ControllerType } from '@/types';

type EndpointPathType = '/api/users';

type EndpointMethodsType = 'GET' | 'POST' | 'PUT' | 'DELETE';

export type EndpointType = {
  endpoint: EndpointPathType;
  method: EndpointMethodsType;
  endpointPathParts: number;
  controller: ControllerType;
};

export const appEndpoints: EndpointType[] = [
  {
    endpoint: '/api/users',
    method: 'GET',
    endpointPathParts: 2,
    controller: getUsers,
  },
  {
    endpoint: '/api/users',
    method: 'GET',
    endpointPathParts: 3,
    controller: getUser,
  },
  {
    endpoint: '/api/users',
    method: 'POST',
    endpointPathParts: 2,
    controller: postUser,
  },
  {
    endpoint: '/api/users',
    method: 'PUT',
    endpointPathParts: 3,
    controller: putUser,
  },
  {
    endpoint: '/api/users',
    method: 'DELETE',
    endpointPathParts: 3,
    controller: deleteUser,
  },
];
