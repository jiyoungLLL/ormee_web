import { z } from 'zod';
import { personalInfoFormSchema } from '@/features/user/schemas/user.schema';

export type PersonalInfoFormValues = z.infer<typeof personalInfoFormSchema>;
