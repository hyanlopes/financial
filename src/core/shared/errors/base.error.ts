export abstract class BaseError {
  abstract readonly code: string;
  abstract readonly statusCode: number;

  constructor(public readonly message: string) {}
}
