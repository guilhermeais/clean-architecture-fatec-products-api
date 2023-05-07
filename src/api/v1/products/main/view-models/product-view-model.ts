import { Category } from "../../domain/entities/category.entity";
import { Product } from "../../domain/entities/product.entity";
import { Attribute } from "../../domain/entities/value-objects/attributes";

export class ProductViewModel {
  static toHttp(product: Product) {
    return {
     ...product.toModel(),
      categories: product.categories.map(category => category.toModel()),
      attributes: product.attributes.map(attribute => attribute.toModel()),
    }
  }

  static toDomain(product: any) {
    return Product.create({
      ...product,
      categories: product.categories ? product.categories.map(category => new Category(category)) : [],
      attributes: product.attributes ? product.attributes.map(attribute => new Attribute(attribute)) : [],
    })
  }
}