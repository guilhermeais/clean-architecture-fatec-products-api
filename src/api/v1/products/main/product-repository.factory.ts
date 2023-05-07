import { PgProductsRepository } from '../infra/data/products-repository/postgres/pg-products-repository'
import {
  ListProductsRepository,
  CreateProductRepository,
  FindProductByIdRepository,
} from '../domain/protocols/repositories/product-repository'

export function makeProductRepository(): ListProductsRepository &
  CreateProductRepository &
  FindProductByIdRepository {
  return new PgProductsRepository()
}
