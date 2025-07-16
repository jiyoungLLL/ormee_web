import { z } from 'zod';
import { signinSchema, signupSchema } from '@/features/auth/auth.schema';

export type SigninFormValues = z.infer<typeof signinSchema>;
export type SignupFormValues = z.infer<typeof signupSchema>;
