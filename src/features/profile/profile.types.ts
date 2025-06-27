import { z } from 'zod';
import { profileEditFormSchema, profileSchema } from '@/features/profile/profile.schema';

export type UserProfileData = {
  nickname: string;
  image: string | null;
  bio: string | null;
};

export type ProfileResponse = z.infer<typeof profileSchema>;
export type ProfileEditForm = z.infer<typeof profileEditFormSchema>;
