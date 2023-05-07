import pgPromises from 'pg-promise'
import { env } from '../../../../../../../../config/env'

const pgp = pgPromises()
const db = pgp({
  host: env.PG_HOST,
  port: env.PG_PORT,
  user: env.PG_USER,
  password: env.PG_PASSWORD,
  database: env.PG_DATABASE,
})

export default db
