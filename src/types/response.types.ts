export type ActionResponse<T> =
  | {
      status: 'success';
      code: number;
      data: T;
    }
  | {
      status: 'fail';
      code: number;
      data: string;
    };
