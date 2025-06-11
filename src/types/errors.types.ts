export class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class AuthError extends CustomError {
  constructor(
    message: string = '로그인 후 이용해주세요.',
    public redirectTo: string = '/signin',
  ) {
    super(message);
  }
}
