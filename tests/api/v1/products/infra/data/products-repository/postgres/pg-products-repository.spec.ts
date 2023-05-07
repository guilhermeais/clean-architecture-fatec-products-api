import { afterAll, beforeAll, beforeEach, describe, expect, test } from 'vitest'
import { PgProductsRepository } from '../../../../../../../../src/api/v1/products/infra/data/products-repository/postgres/pg-products-repository'
import db from '../../../../../../../../src/api/v1/products/infra/data/products-repository/postgres/helpers/pg-connection'
import {
  dropTables,
  migrateTables,
} from '../../../../../../../../src/api/v1/products/infra/data/products-repository/postgres/helpers/migrate-tables'
import { mockProduct } from '../../../../domain/entities/product.entity.mock'
import { mockCategory } from '../../../../domain/entities/category.entity.mock'
import { Category } from '../../../../../../../../src/api/v1/products/domain/entities/category.entity'
import { faker } from '@faker-js/faker'
import { Product } from '../../../../../../../../src/api/v1/products/domain/entities/product.entity'

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

  async function makeDBCategory() {
    const mockedCategory = mockCategory()

    await db.query(
      'INSERT INTO categories (id, name) VALUES ($1, $2) RETURNING *',
      [mockedCategory.id, mockedCategory.name]
    )

    return mockedCategory
  }

  async function makeDBProduct(
    categories: Category[] = [],
    product?: Partial<Product>
  ) {
    const mockedProduct = {
      ...mockProduct().toModel(),
      ...(product || {}),
    }

    await db.query(
      'INSERT INTO products (id, attributes, brand, cost_value, ean, sell_value, title) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [
        mockedProduct.id,
        JSON.stringify(mockedProduct.attributes),
        mockedProduct.brand,
        mockedProduct.costValue,
        mockedProduct.ean,
        mockedProduct.sellValue,
        mockedProduct.title,
      ]
    )

    for (const category of categories) {
      await db.query(
        'INSERT INTO products_categories (product_id, category_id) VALUES ($1, $2)',
        [mockedProduct.id, category.id]
      )
    }

    return Product.create(mockedProduct)
  }

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

  describe('findById()', () => {
    test('should return a existing product by id', async () => {
      const mockedProduct = await makeDBProduct()

      const product = await sut.findById(mockedProduct.id)

      expect(product?.toModel()).toEqual(mockedProduct.toModel())
    })

    test('should return a existing product with categories by id', async () => {
      const mockedCategory = await makeDBCategory()
      const mockedProduct = await makeDBProduct([mockedCategory])

      const product = await sut.findById(mockedProduct.id)

      expect(product?.toModel()).toEqual({
        ...mockedProduct.toModel(),
        categories: [mockedCategory],
      })
    })

    test('should return null if product does not exists', async () => {
      const product = await sut.findById(faker.datatype.uuid())

      expect(product).toEqual(null)
    })
  })

  describe('list()', () => {
    test('should return a list of products according to the filters', async () => {
      const expectedProduct = await makeDBProduct()
      await makeDBProduct()

      const products = await sut.list({
        title: expectedProduct.title,
        brand: expectedProduct.brand,
      })

      expect(products).toEqual([expectedProduct])
    })

    test('should return a list of products with categories', async () => {
      const mockedCategory = await makeDBCategory()
      const expectedProduct = await makeDBProduct([mockedCategory])
      await makeDBProduct()

      const products = await sut.list({
        title: expectedProduct.title,
        brand: expectedProduct.brand,
      })

      expect(products.length).toEqual(1)
      expect(products[0].toModel()).toEqual({
        ...expectedProduct.toModel(),
        categories: [mockedCategory],
      })
    })
  })
})
