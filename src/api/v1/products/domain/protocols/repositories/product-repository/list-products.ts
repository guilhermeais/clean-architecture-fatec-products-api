import { Product } from '../../../entities/product.entity'

export interface ListProductsRepository {
  list(
    filters: FindProductByIdRepository.Params
  ): Promise<FindProductByIdRepository.Result>
}

export namespace FindProductByIdRepository {
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
