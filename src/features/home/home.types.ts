import { z } from 'zod';
import { homeResponseSchema } from '@/features/home/home.schema';

export type HomeResponse = z.infer<typeof homeResponseSchema>;
