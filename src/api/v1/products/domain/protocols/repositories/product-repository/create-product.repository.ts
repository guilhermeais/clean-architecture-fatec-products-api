import { Product, ProductProps } from '../../../entities/product.entity'

export interface CreateProductRepository {
  create(
    product: CreateProductRepository.Params
  ): Promise<CreateProductRepository.Result>
}

export namespace CreateProductRepository {
  export type Params = ProductProps
  export type Result = Product
}