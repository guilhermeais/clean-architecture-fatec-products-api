import { BaseError } from "./base-error";

export class EntityNotFoundError extends BaseError {
  constructor(entityName: string) {
    super({
      message: `Entidade ${entityName} não encontrada`,
      statusCode: 404,
      isClientError: true,
    })
  }
}