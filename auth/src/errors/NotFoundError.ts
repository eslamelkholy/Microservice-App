import { ValidationError } from 'express-validator';
import { CustomError } from './CustomError';

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor() {
    super('Not Found');
    // Only Because we are Extending a built in Class
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: 'Not Found' }];
  }
}
