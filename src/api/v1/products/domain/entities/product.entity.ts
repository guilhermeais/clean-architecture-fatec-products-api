import { randomUUID } from 'crypto'
import { Category } from './category.entity'
import { Attribute } from './value-objects/attributes'

export class Product {
  private props: ProductProps

  private constructor(props: ProductProps) {
    props.id = props.id || randomUUID()
    props.attributes = props.attributes || []
    props.categories = props.categories || []
    props.costValue = parseFloat((props.costValue || 0).toString())
    props.sellValue = parseFloat((props.sellValue || 0).toString())
    this.props = props

    Object.assign(this.props, props)
    Object.freeze(this)
  }

  static create(props: ProductProps): Product {
    return new Product(props)
  }

  get id(): string {
    return this.props.id as string
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

  toModel() {
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
