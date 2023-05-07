import 'dotenv/config'

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',

  PG_HOST: process.env.PG_HOST || 'localhost',
  PG_PORT: parseInt(process.env?.PG_PORT || '5432'),
  PG_USER: process.env.PG_USER || 'postgres',
  PG_PASSWORD: process.env.PG_PASSWORD || 'postgres',
  PG_DATABASE: process.env.PG_DATABASE || 'postgres',

  PORT: process.env.PORT || 3000,
}
