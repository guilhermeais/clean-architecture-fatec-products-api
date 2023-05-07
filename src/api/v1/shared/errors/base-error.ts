export class BaseError extends Error {
  message: string
  statusCode: number
  isClientError: boolean

  constructor(props: BaseErrorProps) {
    super(props.message)
    Object.assign(this, props)
    Error.captureStackTrace(this)
    this.name = this.constructor.name
  }
}

export type BaseErrorProps = {
  message: string
  statusCode: number
  isClientError: boolean
}
