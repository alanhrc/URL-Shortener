import { z } from 'zod'

export const envSchema = z.object({
  NODE_ENV: z.string().optional().default('development'),
  SERVER_PORT: z.coerce.number().optional().default(3333),
  DATABASE_URL: z.string(),
  SERVER_JWT_SECRET: z.string(),
  SERVER_JWT_EXPIRES: z.string(),
  SERVER_URL_LINK: z.string().url(),
})

export type Env = z.infer<typeof envSchema>
