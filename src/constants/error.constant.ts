export const ERROR_TYPES = {
  UNAUTHORIZED: 'UNAUTHORIZED',
};

export const ERROR_MESSAGES = {
  ACCESS_TOKEN_NOT_FOUND: '로그인 후 이용해주세요.',
  ACCESS_TOKEN_EXPIRED: '로그인 유효기간이 만료되었습니다. 다시 로그인해주세요.',
  ACCESS_TOKEN_INVALID: '로그인 후 이용해주세요.',
  UNAUTHORIZED: '로그인 후 이용해주세요.',
};

export const getErrorType = (message: string) => {
  switch (message) {
    case ERROR_MESSAGES.ACCESS_TOKEN_NOT_FOUND:
      return ERROR_TYPES.UNAUTHORIZED;
    case ERROR_MESSAGES.ACCESS_TOKEN_EXPIRED:
      return ERROR_TYPES.UNAUTHORIZED;
    case ERROR_MESSAGES.ACCESS_TOKEN_INVALID:
      return ERROR_TYPES.UNAUTHORIZED;
    case ERROR_MESSAGES.UNAUTHORIZED:
      return ERROR_TYPES.UNAUTHORIZED;
    default:
      return null;
  }
};
