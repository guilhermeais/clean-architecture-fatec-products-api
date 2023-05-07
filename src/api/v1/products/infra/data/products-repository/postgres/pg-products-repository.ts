import { Category } from '../../../../domain/entities/category.entity'
import {
  ProductProps,
  Product,
} from '../../../../domain/entities/product.entity'
import {
  ListProductsRepository,
  CreateProductRepository,
  FindProductByIdRepository,
} from '../../../../domain/protocols/repositories/product-repository'
import db from './helpers/pg-connection'

export class PgProductsRepository
  implements
    ListProductsRepository,
    CreateProductRepository,
    FindProductByIdRepository
{
  static toDomain(dbProduct, dbCategories): Product {
    return Product.create({
      id: dbProduct.id,
      attributes: dbProduct.attributes,
      brand: dbProduct.brand,
      ean: dbProduct.ean,
      title: dbProduct.title,
      sellValue: dbProduct.sell_value,
      costValue: dbProduct.cost_value,
      categories: Array.isArray(dbCategories)
        ? dbCategories.map(category => new Category(category))
        : [],
    })
  }
  async create(product: ProductProps): Promise<Product> {
    const {
      id,
      attributes,
      brand,
      categories,
      costValue,
      ean,
      sellValue,
      title,
    } = product
    await db.query(
      'INSERT INTO products (id, attributes, brand, cost_value, ean, sell_value, title) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [id, JSON.stringify(attributes), brand, costValue, ean, sellValue, title]
    )

    for (const category of categories) {
      const [categoryIsAssociated] = await db.query(
        'SELECT 1=1 FROM products_categories WHERE product_id = $1 and category_id = $2',
        [id, category.id]
      )

      if (!categoryIsAssociated) {
        await db.query(
          'INSERT INTO products_categories (product_id, category_id) VALUES ($1, $2)',
          [id, category.id]
        )
      }
    }

    return Product.create(product)
  }

  async findById(id: string): Promise<FindProductByIdRepository.Result> {
    const [product] = await db.query('SELECT * FROM products WHERE id = $1', [
      id,
    ])

    if (!product) {
      return null
    }

    const categories = await this.findProductCategories(id)
    return PgProductsRepository.toDomain(product, categories)
  }

  async list(
    filters: ListProductsRepository.Params
  ): Promise<ListProductsRepository.Result> {
    const { attribute, brand, title } = filters
    let where = '1=1\n'
    let index = 1

    if (attribute?.type && attribute?.value) {
      where += `and attributes->>'${attribute.type}' = $${index++}\n`
    }

    if (brand) {
      where += `and brand = $${index++}\n`
    }

    if (title) {
      where += `and title like $${index++}\n`
    }

    const products = await db.query(
      `SELECT * FROM products WHERE ${where}`,
      [attribute, brand, title].filter(Boolean)
    )

    const parsedProduct: Product[] = []
    for (const product of products) {
      const productCategories = await this.findProductCategories(product.id)
      parsedProduct.push(
        PgProductsRepository.toDomain(product, productCategories)
      )
    }

    return parsedProduct
  }

  private findProductCategories(id: string) {
    return db.query(
      'SELECT * FROM categories WHERE id IN (SELECT category_id FROM products_categories WHERE product_id = $1)',
      [id]
    )
  }
}
