import { EnvVars } from '@infra/config/env/env.schema';
import { EnvPort } from '@core/shared/ports/config/env.port';

export class EnvService implements EnvPort {
  constructor(private readonly env: EnvVars) {}

  get<K extends keyof EnvVars>(key: K): EnvVars[K] {
    return this.env[key];
  }

  getAll(): EnvVars {
    return this.env;
  }
}
