import { EnvVars } from '@infra/config/env/env.schema';

export interface EnvPort {
  get<K extends keyof EnvVars>(key: K): EnvVars[K];
  getAll(): EnvVars;
}

export const ENV_PORT = 'EnvPort';
