import { Category } from "../../domain/entities/category.entity";
import { Product } from "../../domain/entities/product.entity";

export class ProductViewModel {
  static toHttp(product: Product) {
    return {
     ...product.toModel(),
      categories: product.categories.map(category => category.toModel()),
    }
  }

  static toDomain(product: any) {
    return Product.create({
      ...product,
      categories: product.categories ? product.categories.map(category => new Category(category)) : [],
    })
  }
}