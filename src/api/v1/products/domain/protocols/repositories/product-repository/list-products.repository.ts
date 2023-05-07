import { Product } from '../../../entities/product.entity'

export interface ListProductsRepository {
  list(
    filters: ListProductsRepository.Params
  ): Promise<ListProductsRepository.Result>
}

export namespace ListProductsRepository {
  export type Params = {
    title?: string
    brand?: string
    attribute?: {
      type: string
      value: string
    }
  }
  export type Result = Product[]
}
