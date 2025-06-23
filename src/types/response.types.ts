export type ApiResponse<T = void> = T extends void
  ? {
      status: 'success';
      code: number;
    }
  :
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
