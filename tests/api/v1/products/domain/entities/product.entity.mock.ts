import { Attribute } from 'src/api/v1/products/domain/entities/value-objects/attributes'
import { Product } from '../../../../../../src/api/v1/products/domain/entities/product.entity'
import { faker } from '@faker-js/faker'

export function mockProduct(): Product {
  return Product.create({
    ean: faker.datatype.uuid(),
    brand: faker.vehicle.manufacturer(),
    title: faker.commerce.productName(),
    sellValue: parseFloat(faker.commerce.price()),
    costValue: parseFloat(faker.commerce.price()),
    attributes: [
      new Attribute({
        label: faker.commerce.productMaterial(),
        value:  faker.commerce.productMaterial(),
        type: faker.commerce.productMaterial()
      }),
    ],
    categories: [],
  })
}
