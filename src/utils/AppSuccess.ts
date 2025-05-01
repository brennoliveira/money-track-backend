
export abstract class AppSuccess<T = any> {
  public readonly success = true;

  constructor(
    public readonly data: T,
    public readonly statusCode: number
  ) {}
}
