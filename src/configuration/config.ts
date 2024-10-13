import { registerAs } from '@nestjs/config';

export const appConfig = registerAs(
  'app-config',
  () =>
    ({
      HTTP_PORT: Number(process.env.HTTP_PORT) || 8080
    }) as const,
);

export const postgresConfig = registerAs(
  'postgres-config',
  () =>
    ({
      host: process.env.POSTGRES_HOST || 'localhost',
      port: Number(process.env.POSTGRES_PORT) || 5432,
      username: process.env.POSTGRES_USER || 'user',
      password: process.env.POSTGRES_PASSWORD || 'password',
      database: process.env.POSTGRES_DB || 'db',
    }) as const,
);
