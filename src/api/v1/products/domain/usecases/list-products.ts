import { Product } from '../entities/product.entity'
import { Attribute } from '../entities/value-objects/attributes'
import { ListProductsRepository } from '../protocols/repositories/product-repository/list-products.repository'

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
    attribute?:Attribute
  }
}
