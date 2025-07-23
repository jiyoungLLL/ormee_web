import { z } from 'zod';
import {
  accountRecoverySchema,
  passwordChangeFormSchema,
  passwordCheckSchema,
  signinSchema,
  signupSchema,
} from '@/features/auth/auth.schema';

export type SignupFormValues = z.infer<typeof signupSchema>;
export type SigninFormValues = z.infer<typeof signinSchema>;
export type PasswordCheckFormValues = z.infer<typeof passwordCheckSchema>;
export type PasswordChangeFormValues = z.infer<typeof passwordChangeFormSchema>;
export type AccountRecoveryFormValues = z.infer<typeof accountRecoverySchema>;
