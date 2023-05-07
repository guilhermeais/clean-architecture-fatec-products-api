import { Product, ProductProps } from '../../entities/product.entity'

export interface ProductRepository {
  create(
    product: ProductRepository.CreateParams
  ): Promise<ProductRepository.CreateResult>

  findById(
    id: ProductRepository.FindByIdParams
  ): Promise<ProductRepository.FindByIdResult>
}

export namespace ProductRepository {
  export type CreateParams = ProductProps
  export type CreateResult = Product

  export type FindByIdParams = string
  export type FindByIdResult = Product | null
}
