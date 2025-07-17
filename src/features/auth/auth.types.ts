import { z } from 'zod';
import { passwordCheckSchema, signinSchema, signupSchema } from '@/features/auth/auth.schema';

export type SigninFormValues = z.infer<typeof signinSchema>;
export type SignupFormValues = z.infer<typeof signupSchema>;
export type PasswordCheckFormValues = z.infer<typeof passwordCheckSchema>;
