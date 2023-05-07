import { Category } from '../../../../../../src/api/v1/products/domain/entities/category.entity'
import { faker } from '@faker-js/faker'

export function mockCategory(): Category {
  return new Category({
    name: faker.commerce.department(),
  })
}
