import * as Hapi from '@hapi/hapi'
import { env } from './env'
import { productRoutes } from '../api/v1/products/main/route'

const app = Hapi.server({
  port: env.PORT,
})

app.route([
  ...productRoutes,
])

export default app