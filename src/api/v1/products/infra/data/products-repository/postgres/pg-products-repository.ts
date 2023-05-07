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

  findById(id: string): Promise<FindProductByIdRepository.Result> {
    throw new Error('Method not implemented.')
  }
  list(
    filters: ListProductsRepository.Params
  ): Promise<ListProductsRepository.Result> {
    throw new Error('Method not implemented.')
  }
}
