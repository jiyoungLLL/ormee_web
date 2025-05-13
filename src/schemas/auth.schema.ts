import { z } from 'zod';

export const AUTH_ERROR_MESSAGES = {
  EMPTY_ID: '아이디를 입력해주세요.',
  EMPTY_PASSWORD: '비밀번호를 입력해주세요.',
  INVALID_PASSWORD_LENGTH: '비밀번호는 8자 이상이어야 합니다.',
  INVALID_PASSWORD_SPECIAL_CHARACTER: '비밀번호는 특수문자를 1개 이상 포함해야 합니다.',
  NOT_MATCH_PASSWORD: '비밀번호가 일치하지 않습니다.',
  INVALID_PHONE_NUMBER: '올바른 번호를 선택해주세요.',
  INVALID_PHONE_NUMBER_LENGTH: '전화번호는 7~8자리로 입력해주세요.',
  INVALID_PHONE_NUMBER_ONLY: '전화번호는 숫자로 입력해주세요.',
  NOT_VERIFIED_PRIMARY_PHONE: '휴대폰 번호 인증을 완료해주세요.',
  INVALID_EMAIL: '올바른 이메일을 입력해주세요.',
  INVALID_NAME: '이름을 입력해주세요.',
  INVALID_ENGLISH_NAME: '영문으로 입력해주세요.',
} as const;

export const signinSchema = z.object({
  id: z.string().min(1, { message: AUTH_ERROR_MESSAGES.EMPTY_ID }),
  password: z.string().min(1, { message: AUTH_ERROR_MESSAGES.EMPTY_PASSWORD }),
});

export type SigninFormValues = z.infer<typeof signinSchema>;

export const PHONE_NUMBER_PREFIX = {
  MOBILE_010: '010',
  MOBILE_011: '011',
  SEOUL: '02',
} as const;

export const phoneNumberSchema = z.object({
  prefix: z.enum([PHONE_NUMBER_PREFIX.MOBILE_010, PHONE_NUMBER_PREFIX.MOBILE_011, PHONE_NUMBER_PREFIX.SEOUL], {
    errorMap: () => ({ message: AUTH_ERROR_MESSAGES.INVALID_PHONE_NUMBER }),
  }),
  number: z
    .string()
    .regex(/^\d+$/, { message: AUTH_ERROR_MESSAGES.INVALID_PHONE_NUMBER_ONLY })
    .min(7, { message: AUTH_ERROR_MESSAGES.INVALID_PHONE_NUMBER_LENGTH })
    .max(8, { message: AUTH_ERROR_MESSAGES.INVALID_PHONE_NUMBER_LENGTH }),
});

export const signupSchema = z
  .object({
    id: z.string().min(1, { message: AUTH_ERROR_MESSAGES.EMPTY_ID }),
    password: z
      .string()
      .min(8, { message: AUTH_ERROR_MESSAGES.INVALID_PASSWORD_LENGTH })
      .regex(/[!@#$%^&*(),.?":{}|<>]/, { message: AUTH_ERROR_MESSAGES.INVALID_PASSWORD_SPECIAL_CHARACTER }),
    passwordConfirm: z.string().min(1),
    primaryPhone: phoneNumberSchema,
    isVerifiedPrimaryPhone: z
      .boolean()
      .refine((val) => val === true, { message: AUTH_ERROR_MESSAGES.NOT_VERIFIED_PRIMARY_PHONE }),
    secondaryPhone: phoneNumberSchema.optional(),
    emailId: z.string().min(1, { message: AUTH_ERROR_MESSAGES.INVALID_EMAIL }),
    emailDomain: z.string().min(1, { message: AUTH_ERROR_MESSAGES.INVALID_EMAIL }),
    name: z.string().min(1, { message: AUTH_ERROR_MESSAGES.INVALID_NAME }),
    englishName: z
      .string()
      .min(1, { message: AUTH_ERROR_MESSAGES.INVALID_NAME })
      .regex(/^[A-Za-z\s]+$/, { message: AUTH_ERROR_MESSAGES.INVALID_ENGLISH_NAME }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: AUTH_ERROR_MESSAGES.NOT_MATCH_PASSWORD,
    path: ['passwordConfirm'],
  });

export type SignupFormValues = z.infer<typeof signupSchema>;
