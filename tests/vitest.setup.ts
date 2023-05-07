import { vitest } from 'vitest'
import { newDb } from 'pg-mem'

export const pgMem = newDb().adapters.createPgPromise()

vitest.mock(
  '../src/api/v1/products/infra/data/products-repository/postgres/helpers/pg-connection',
  () => ({
    __esModule: true,
    default: pgMem,
  })
)

