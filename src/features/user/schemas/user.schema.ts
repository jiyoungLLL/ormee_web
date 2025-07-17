import { z } from 'zod';

export const USER_ERROR_MESSAGES = {
  EMPTY_ID: '아이디를 입력해주세요.',
  INVALID_ID_MIN_LENGTH: '아이디는 4자 이상이어야 합니다.',
  INVALID_ID_MAXLENGTH: '아이디는 15자 이하여야 합니다.',
  INVALID_ID_SPECIAL_CHARACTER: '아이디는 영문 소문자, 숫자, 특수문자(_)만 사용 가능합니다.',
  EMPTY_PASSWORD: '비밀번호를 입력해주세요.',
  INVALID_PASSWORD_MIN_LENGTH: '비밀번호는 8자 이상이어야 합니다.',
  INVALID_PASSWORD_MAX_LENGTH: '비밀번호는 16자 이하여야 합니다.',
  INVALID_PASSWORD_SPECIAL_CHARACTER: '비밀번호는 영어 대/소문자, 숫자, 특수문자 중 2개 이상 포함해야 합니다.',
  NOT_MATCH_PASSWORD: '비밀번호가 일치하지 않습니다.',
  INVALID_PHONE_NUMBER: '올바른 휴대전화 번호를 입력해주세요.',
  EMPTY_PHONE_NUMBER: '전화번호를 입력해주세요.',
  INVALID_PHONE_NUMBER_LENGTH: '전화번호는 11자리로 입력해주세요.',
  INVALID_PHONE_NUMBER_ONLY: '전화번호는 숫자로 입력해주세요.',
  NOT_VERIFIED_PRIMARY_PHONE: '휴대폰 번호 인증을 완료해주세요.',
  INVALID_EMAIL: '올바른 이메일을 입력해주세요.',
  EMPTY_NAME: '이름을 입력해주세요.',
  INVALID_NAME: '이름은 한글로 입력해주세요.',
  EMPTY_TEACHER_NAME: '강사명을 입력해주세요.',
  INVALID_TEACHER_NAME: '강사명은 특수문자 혹은 숫자를 포함할 수 없습니다.',
} as const;

export const PHONE_NUMBER_PREFIX = {
  MOBILE_010: '010',
  MOBILE_011: '011',
} as const;

export const phoneNumberSchema = z
  .string()
  .transform((val) => val.trim())
  .refine((val) => val.length > 0 || val === '', {
    message: USER_ERROR_MESSAGES.EMPTY_PHONE_NUMBER,
  })
  .refine((val) => val === '' || /^\d+$/.test(val), {
    message: USER_ERROR_MESSAGES.INVALID_PHONE_NUMBER_ONLY,
  })
  .refine((val) => val === '' || val.length === 11, {
    message: USER_ERROR_MESSAGES.INVALID_PHONE_NUMBER_LENGTH,
  })
  .refine(
    (val) =>
      val === '' || val.startsWith(PHONE_NUMBER_PREFIX.MOBILE_010) || val.startsWith(PHONE_NUMBER_PREFIX.MOBILE_011),
    {
      message: USER_ERROR_MESSAGES.INVALID_PHONE_NUMBER,
    },
  );

export const idSchema = z
  .string()
  .min(4, { message: USER_ERROR_MESSAGES.INVALID_ID_MIN_LENGTH })
  .max(15, { message: USER_ERROR_MESSAGES.INVALID_ID_MAXLENGTH })
  .regex(/^[a-z0-9_]+$/, { message: USER_ERROR_MESSAGES.INVALID_ID_SPECIAL_CHARACTER });

export const passwordSchema = z
  .string()
  .min(8, { message: USER_ERROR_MESSAGES.INVALID_PASSWORD_MIN_LENGTH })
  .max(16, { message: USER_ERROR_MESSAGES.INVALID_PASSWORD_MAX_LENGTH })
  .refine(
    (password) => {
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumber = /[0-9]/.test(password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

      const conditions = [hasUpperCase, hasLowerCase, hasNumber, hasSpecialChar];
      const satisfiedConditions = conditions.filter(Boolean).length;

      return satisfiedConditions >= 2;
    },
    { message: USER_ERROR_MESSAGES.INVALID_PASSWORD_SPECIAL_CHARACTER },
  );

export const nameSchema = z
  .string()
  .min(1, { message: USER_ERROR_MESSAGES.EMPTY_NAME })
  .regex(/^[가-힣]+$/, { message: USER_ERROR_MESSAGES.INVALID_NAME });

export const nicknameSchema = z
  .string()
  .min(1, { message: USER_ERROR_MESSAGES.EMPTY_TEACHER_NAME })
  .regex(/^[\uAC00-\uD7A3\u1100-\u11FF\u3130-\u318F\uA960-\uA97FA-Za-z\s]+$/, {
    message: USER_ERROR_MESSAGES.INVALID_TEACHER_NAME,
  });

export const emailIdSchema = z.string().min(1, { message: USER_ERROR_MESSAGES.INVALID_EMAIL });
export const emailDomainSchema = z.string().min(1, { message: USER_ERROR_MESSAGES.INVALID_EMAIL });

export const personalInfoFormSchema = z
  .object({
    name: nameSchema,
    nickname: nicknameSchema,
    password: passwordSchema.optional(),
    passwordConfirm: z.string().optional(),
    phoneNumber: phoneNumberSchema,
    isPhoneNumberVerified: z.boolean().optional(),
    emailId: emailIdSchema,
    emailDomain: emailDomainSchema,
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: USER_ERROR_MESSAGES.NOT_MATCH_PASSWORD,
    path: ['passwordConfirm'],
  });
