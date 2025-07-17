import { z } from 'zod';
import {
  phoneNumberSchema,
  passwordSchema,
  nameSchema,
  nicknameSchema,
  emailIdSchema,
  emailDomainSchema,
  USER_ERROR_MESSAGES,
  idSchema,
} from '@/features/user/schemas/user.schema';

export const signinSchema = z.object({
  id: z.string().min(1, { message: USER_ERROR_MESSAGES.EMPTY_ID }),
  password: z.string().min(1, { message: USER_ERROR_MESSAGES.EMPTY_PASSWORD }),
});

export const signupSchema = z
  .object({
    id: idSchema,
    password: passwordSchema,
    passwordConfirm: z.string().min(1, { message: USER_ERROR_MESSAGES.NOT_MATCH_PASSWORD }),
    phoneNumber: phoneNumberSchema,
    isVerifiedPhoneNumber: z
      .boolean()
      .refine((val) => val === true, { message: USER_ERROR_MESSAGES.NOT_VERIFIED_PRIMARY_PHONE }),
    emailId: emailIdSchema,
    emailDomain: emailDomainSchema,
    name: nameSchema,
    teacherName: nicknameSchema,
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: USER_ERROR_MESSAGES.NOT_MATCH_PASSWORD,
    path: ['passwordConfirm'],
  });

export const passwordCheckSchema = z.object({
  password: z.string().min(1, { message: USER_ERROR_MESSAGES.EMPTY_PASSWORD }),
});
