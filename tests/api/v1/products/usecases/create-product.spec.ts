import { beforeEach, describe, expect, test, vitest } from 'vitest'
import { mock, MockProxy } from 'vitest-mock-extended'
import { CreateProduct } from '../../../../../src/api/v1/products/domain/usecases/create-product'
import { ProductRepository } from '../../../../../src/api/v1/products/domain/protocols/repositories/product.repository'
import { mockProduct } from '../domain/entities/product.entity.mock'

describe('CreateProduct', () => {
  let sut: CreateProduct
  let productRepository: MockProxy<ProductRepository>

  beforeEach(async () => {
    productRepository = mock<ProductRepository>({
      create: vitest.fn().mockResolvedValue(mockProduct()),
    })
    sut = new CreateProduct(productRepository)
  })

  test('should create an product', async () => {
    const params = mockProduct().toModel()
    const mockedProduct = mockProduct()
    productRepository.create.mockResolvedValueOnce(mockedProduct)
    const result = await sut.execute(params)

    expect(result).toEqual(mockedProduct)
    expect(productRepository.create).toHaveBeenCalledWith(params)
  })

  test('should throw if ProductRepository throws', async () => {
    const params = mockProduct().toModel()
    const error = new Error('any_error')
    productRepository.create.mockRejectedValueOnce(error)
    const result = sut.execute(params)

    await expect(result).rejects.toThrow(error)
    expect(productRepository.create).toHaveBeenCalledWith(params)
  });
})
