import { z } from 'zod';
import { userInfoResponseSchema } from '@/features/user/schemas/userApi.schema';

export type UserInfoResponse = z.infer<typeof userInfoResponseSchema>;
