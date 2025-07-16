import { z } from 'zod';
import { passwordCheckSchema, personalInfoFormSchema } from '@/features/user/schemas/user.schema';

export type PersonalInfoFormValues = z.infer<typeof personalInfoFormSchema>;
export type PasswordCheckFormValues = z.infer<typeof passwordCheckSchema>;
