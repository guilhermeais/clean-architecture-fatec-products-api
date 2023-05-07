import { afterAll, beforeAll, beforeEach, describe, expect, test } from 'vitest'
import { PgProductsRepository } from '../../../../../../../../src/api/v1/products/infra/data/products-repository/postgres/pg-products-repository'
import db from '../../../../../../../../src/api/v1/products/infra/data/products-repository/postgres/helpers/pg-connection'
import {
  dropTables,
  migrateTables,
} from '../../../../../../../../src/api/v1/products/infra/data/products-repository/postgres/helpers/migrate-tables'
import { mockProduct } from '../../../../domain/entities/product.entity.mock'
import { mockCategory } from '../../../../domain/entities/category.entity.mock'

describe('PgProductsRepository integration', () => {
  let sut: PgProductsRepository

  beforeAll(async () => {
    await migrateTables()
  })

  beforeEach(() => {
    sut = new PgProductsRepository()
  })

  afterAll(async () => {
    await dropTables()
  })
  describe('create()', () => {
    test('should insert a product at the database', async () => {
      const mockedProduct = mockProduct().toModel()

      await sut.create(mockedProduct)

      const [product] = await db.query('SELECT * FROM products WHERE id = $1', [
        mockedProduct.id,
      ])

      expect(product.id).toBe(mockedProduct.id)
      expect(product.brand).toBe(mockedProduct.brand)
      expect(product.ean).toBe(mockedProduct.ean)
      expect(product.title).toBe(mockedProduct.title)
      expect(product.sell_value).toBe(mockedProduct.sellValue)
      expect(product.cost_value).toBe(mockedProduct.costValue)
      expect(product.attributes).toEqual(mockedProduct.attributes)
    })

    test('should vinculate product with categories', async () => {
      const mockedProduct = mockProduct().toModel()
      const mockedCategory = mockCategory()

      await db.query('INSERT INTO categories (id, name) VALUES ($1, $2)', [
        mockedCategory.id,
        mockedCategory.name,
      ])

      mockedProduct.categories = [mockedCategory]
      await sut.create(mockedProduct)

      const [productCategories] = await db.query(
        'SELECT * FROM products_categories WHERE product_id = $1',
        [mockedProduct.id]
      )

      expect(productCategories.product_id).toBe(mockedProduct.id)
      expect(productCategories.category_id).toBe(mockedCategory.id)
    })
  })
})
