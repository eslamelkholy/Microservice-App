import { CustomError } from './CustomError';

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = 'Error Connecting to Database';
  constructor() {
    super('Error Connecting to Database');

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }

  serializeErrors() {
    return [{ message: this.reason }];
  }
}
