import { randomUUID } from 'crypto'
import { Category } from './categories.entity'
import { Attribute } from './value-objects/attributes'

export class Product {
  private props: ProductProps

  private constructor(props: ProductProps) {
    props.id = props.id || randomUUID()
    this.props = props
  }

  static create(props: ProductProps): Product {
    return new Product(props)
  }

  get id() {
    return this.props.id
  }

  get ean() {
    return this.props.ean
  }  

  get title() {
    return this.props.title
  }

  get brand() {
    return this.props.brand
  }

  get attributes() {
    return this.props.attributes
  }

  get categories() {
    return this.props.categories
  }

  get costValue() {
    return this.props.costValue
  }

  get sellValue() {
    return this.props.sellValue
  }

  toModel(): ProductProps {
    return { ...this.props }
  }
}

export type ProductProps = {
  id?: string
  ean: string
  title: string
  brand: string
  attributes: Attribute[]
  categories: Category[]
  costValue: number
  sellValue: number
}
