export class Category {
  private readonly props: CategoryProps

  constructor(params: CategoryProps) {
    this.props = params
  }

  get id() {
    return this.props.id
  }

  get name() {
    return this.props.name
  }

  toModel() {
    return {
      ...this.props,
    }
  }
}

export type CategoryProps = {
  id: string
  name: string
}
