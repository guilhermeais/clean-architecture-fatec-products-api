import { Product } from '../entities/product.entity'
import {} from '../protocols/repositories/product-repository'
import { ListProductsRepository } from '../protocols/repositories/product-repository/list-products'

export class ListProducts {
  constructor(private readonly productRepository: ListProductsRepository) {}

  async execute(params: ListProducts.Params): Promise<ListProducts.Result> {
    return await this.productRepository.list(params)
  }
}

export namespace ListProducts {
  export type Result = Product[]

  export type Params = {
    title?: string
    brand?: string
    attribute?: {
      type: string
      value: string
    }
  }
}