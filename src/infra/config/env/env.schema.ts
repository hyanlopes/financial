import { z } from 'zod';

export const EnvSchema = z.object({
  NODE_ENV: z.enum(['dev', 'tst', 'prd']),
  POSTGRES_URL: z.url(),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).optional(),
});

export type EnvVars = z.infer<typeof EnvSchema>;
