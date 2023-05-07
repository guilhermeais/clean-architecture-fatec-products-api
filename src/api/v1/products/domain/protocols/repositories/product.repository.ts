import { Product, ProductProps } from '../../entities/product.entity'

export interface ProductRepository {
  create(
    product: ProductRepository.CreateParams
  ): Promise<ProductRepository.CreateResult>
}

export namespace ProductRepository {
  export type CreateParams = ProductProps
  export type CreateResult = Product
}
