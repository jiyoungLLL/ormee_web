export type Response<T> = { status: 'success'; code: number; data: T } | { status: 'error'; code: number };

export type ActionResponse<T> =
  | {
      status: 'success';
      code: number;
      data: T;
    }
  | {
      status: 'error';
      code: number;
      message: string;
    };
