import { beforeEach, describe, expect, test, vitest } from 'vitest'
import { ListProducts } from '../../../../../src/api/v1/products/domain/usecases/list-products'
import { ListProductsRepository } from '../../../../../src/api/v1/products/domain/protocols/repositories/product-repository/list-products.repository'
import { MockProxy, mock } from 'vitest-mock-extended'
import { mockProduct } from '../domain/entities/product.entity.mock'
import { faker } from '@faker-js/faker'
import { Product } from '../../../../../src/api/v1/products/domain/entities/product.entity'

describe('ListProducts', () => {
  let sut: ListProducts
  let productRepository: MockProxy<ListProductsRepository>
  let mockedProducts: Product[]

  beforeEach(() => {
    mockedProducts = [mockProduct()]
    productRepository = mock<ListProductsRepository>({
      list: vitest.fn().mockResolvedValue(mockedProducts),
    })
    sut = new ListProducts(productRepository)
  })

  test('should search all products with the given filters', async () => {
    const filters: ListProducts.Params = {
      title: faker.commerce.productName(),
      brand: faker.commerce.productMaterial(),
      attribute: {
        type: faker.commerce.productMaterial(),
        value: faker.commerce.productMaterial(),
      },
    }

    const result = await sut.execute(filters)

    expect(productRepository.list).toHaveBeenCalledWith(filters)
    expect(result).toEqual(mockedProducts)
  })

  test('should throw if product repository throws', async () => {
    const filters: ListProducts.Params = {
      title: faker.commerce.productName(),
      brand: faker.commerce.productMaterial(),
      attribute: {
        type: faker.commerce.productMaterial(),
        value: faker.commerce.productMaterial(),
      },
    }

    productRepository.list.mockRejectedValueOnce(new Error())

    await expect(sut.execute(filters)).rejects.toThrow()
  });
})
