import { IncomingMessage } from 'http';
import { EndpointType } from '@/config/endpoints';
import { ControllerType } from '@/types';

type GetEndpointControllerType = (
  requestPathname: string,
  requestMethod: string | undefined,
  endpoints: EndpointType[]
) => ControllerType | null;

export const getRequestData = (request: IncomingMessage) => {
  const {
    url,
    method,
    headers: { host },
  } = request;

  const requestUrl = new URL(url ?? '', `http://${host ?? 'localhost'}`);
  const { pathname } = requestUrl;

  return {
    url,
    method,
    pathname,
  };
};

export const getEndpointController: GetEndpointControllerType = (
  requestPathname,
  requestMethod,
  endpoints
) => {
  const requestPathnameParts = requestPathname.slice(1).split('/');

  const endpoint = endpoints.filter(({ endpoint, method, endpointPathParts }) => {
    if (requestMethod !== method) return;
    if (endpointPathParts !== requestPathnameParts.length) return;
    if (
      requestPathnameParts.slice(0, endpoint.slice(1).split('/').length).join('/') !==
      endpoint.slice(1)
    )
      return;

    return true;
  });

  if (endpoint.length === 1) {
    const [{ controller }] = endpoint;
    return controller;
  }

  return null;
};
