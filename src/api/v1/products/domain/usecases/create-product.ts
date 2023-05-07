import { Product, ProductProps } from '../entities/product.entity'
import { ProductRepository } from '../protocols/repositories/product.repository'

export class CreateProduct {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(params: CreateProduct.Params): Promise<CreateProduct.Result> {
    return this.productRepository.create(params)
  }
}

export namespace CreateProduct {
  export type Params = ProductProps

  export type Result = Product
}
