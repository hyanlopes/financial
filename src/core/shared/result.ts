import { BaseError } from './errors/base.error';

export type Success<T> = { ok: true; value: T };
export type Failure<E> = { ok: false; error: E };
export type Result<T, E = BaseError> = Success<T> | Failure<E>;

export const ok = <T>(value: T): Success<T> => ({ ok: true, value });
export const fail = <E>(error: E): Failure<E> => ({ ok: false, error });

export const isOk = <T, E>(result: Result<T, E>): result is Success<T> =>
  result.ok;
export const isFail = <T, E>(result: Result<T, E>): result is Failure<E> =>
  !result.ok;
