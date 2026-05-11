import { DomainError } from '../domain.error';

export class EmailAlreadyExistsError extends DomainError {
  readonly code = 'EMAIL_ALREADY_EXISTS';
  readonly statusCode = 409;

  constructor() {
    super('Email already in use');
  }
}
