export class InternalServerError extends Error {
  public statusCode: number;

  constructor(message: string = 'Internal Server Error') {
    super(message);
    this.name = 'InternalServerError';
    this.statusCode = 500;

    Object.setPrototypeOf(this, InternalServerError.prototype);
  }
}