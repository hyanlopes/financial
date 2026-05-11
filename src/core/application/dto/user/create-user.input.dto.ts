import { z } from 'zod';

export const CreateUserSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.email(),
});

export type CreateUserInputDto = z.infer<typeof CreateUserSchema>;
