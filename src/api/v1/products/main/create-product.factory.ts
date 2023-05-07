import { CreateProduct } from '../domain/usecases/create-product'
import { makeProductRepository } from './product-repository.factory'

export function makeCreateProduct(): CreateProduct {
  return new CreateProduct(makeProductRepository())
}
