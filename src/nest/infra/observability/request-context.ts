import { AsyncLocalStorage } from 'async_hooks';

export type RequestStore = {
  correlationId: string;
  requestId?: string;
  userId?: string;
  traceId?: string;
};

export const requestContext = new AsyncLocalStorage<RequestStore>();
