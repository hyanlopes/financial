export interface TraceContext {
  correlationId: string;
  method: string;
  path: string;
  startedAt: number;
}

export interface TracePort {
  start(context: Omit<TraceContext, 'startedAt'>): TraceContext;
  finish(context: TraceContext, statusCode: number): void;
}

export const TRACE_PORT = 'TracePort';
