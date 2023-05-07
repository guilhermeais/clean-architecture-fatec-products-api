export class Attribute {
  private readonly props: AttributeProps

  constructor(params: AttributeProps) {
    this.props = params
  }

  get type() {
    return this.props.type
  }

  get value() {
    return this.props.value
  }

  get label() {
    return this.props.label
  }

  toModel(): AttributeProps {
    return {
      ...this.props,
    }
  }
}

export type AttributeProps = {
  type: string
  value: string
  label: string
}
