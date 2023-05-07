import { Product } from "../../../entities/product.entity"

export interface FindProductByIdRepository {
  findById(
    id: FindProductByIdRepository.Params
  ): Promise<FindProductByIdRepository.Result>
}

export namespace FindProductByIdRepository {
  export type Params = string
  export type Result = Product | null
}
