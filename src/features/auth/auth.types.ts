import { z } from 'zod';
import { accountRecoverySchema, signinSchema, signupSchema } from '@/features/auth/auth.schema';

export type SignupFormValues = z.infer<typeof signupSchema>;
export type SigninFormValues = z.infer<typeof signinSchema>;
export type AccountRecoveryFormValues = z.infer<typeof accountRecoverySchema>;
