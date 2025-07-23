import { z } from 'zod';
import { userInfoEditRequestSchema, userInfoResponseSchema } from '@/features/user/schemas/userApi.schema';

export type UserInfoResponse = z.infer<typeof userInfoResponseSchema>;
export type UserInfoEditRequest = z.infer<typeof userInfoEditRequestSchema>;
