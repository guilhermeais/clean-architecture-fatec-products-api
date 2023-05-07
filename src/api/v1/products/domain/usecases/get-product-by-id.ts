import { Product } from '../entities/product.entity'
import { ProductRepository } from '../protocols/repositories/product.repository'

export class GetProductById {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: GetProductById.Params): Promise<GetProductById.Result> {
    const product = await this.productRepository.findById(id)

    return product as GetProductById.Result
  }
}

export namespace GetProductById {
  export type Params = string
  export type Result = Product
}
