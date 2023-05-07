import { beforeEach, describe, expect, test, vitest } from 'vitest'
import { MockProxy, mock } from 'vitest-mock-extended'
import { ProductRepository } from '../../../../../src/api/v1/products/domain/protocols/repositories/product.repository'
import { mockProduct } from '../domain/entities/product.entity.mock'
import { GetProductById } from '../../../../../src/api/v1/products/domain/usecases/get-product-by-id'
import { EntityNotFoundError } from '../../../../../src/api/v1/shared/errors'

describe('GetProductById', () => {
  let productRepository: MockProxy<ProductRepository>
  let sut: GetProductById

  beforeEach(async () => {
    productRepository = mock<ProductRepository>({
      findById: vitest.fn().mockResolvedValue(mockProduct()),
    })

    sut = new GetProductById(productRepository)
  })

  test('should search a product by id', async () => {
    const mockedProduct = mockProduct()
    productRepository.findById.mockResolvedValueOnce(mockedProduct)
    const params = mockedProduct.id
    const result = await sut.execute(params)

    expect(result).toEqual(mockedProduct)
    expect(productRepository.findById).toHaveBeenCalledWith(params)
  })

  test('should throw EntityNotFound error if any product was found', async () => {
    productRepository.findById.mockResolvedValueOnce(null)
    const params = 'non-existing-id'
    const promise = sut.execute(params)

    await expect(promise).rejects.toThrow(new EntityNotFoundError('Produto'))
  })
})
