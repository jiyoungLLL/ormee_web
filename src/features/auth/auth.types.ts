import { z } from 'zod';
import { passwordChangeFormSchema, passwordCheckSchema, signinSchema, signupSchema } from '@/features/auth/auth.schema';

export type SigninFormValues = z.infer<typeof signinSchema>;
export type SignupFormValues = z.infer<typeof signupSchema>;
export type PasswordCheckFormValues = z.infer<typeof passwordCheckSchema>;
export type PasswordChangeFormValues = z.infer<typeof passwordChangeFormSchema>;
