import { Product } from '../../../entities/product.entity'
import { Attribute, } from '../../../entities/value-objects/attributes'

export interface ListProductsRepository {
  list(
    filters: ListProductsRepository.Params
  ): Promise<ListProductsRepository.Result>
}

export namespace ListProductsRepository {
  export type Params = {
    title?: string
    brand?: string
    attribute?: Partial<Attribute>
  }
  export type Result = Product[]
}
