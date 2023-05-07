import { EntityNotFoundError } from '../../../shared/errors'
import { Product } from '../entities/product.entity'
import { FindProductByIdRepository } from '../protocols/repositories/product-repository'


export class GetProductById {
  constructor(private readonly productRepository: FindProductByIdRepository) {}

  async execute(id: GetProductById.Params): Promise<GetProductById.Result> {
    const product = await this.productRepository.findById(id)
    if(!product) {
      throw new EntityNotFoundError('Produto')
    }
    return product 
  }
}

export namespace GetProductById {
  export type Params = string
  export type Result = Product
}
