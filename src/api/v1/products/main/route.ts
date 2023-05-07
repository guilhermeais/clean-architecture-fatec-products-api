import * as Hapi from '@hapi/hapi'
import { BaseError } from '../../shared/errors/base-error'
import { makeCreateProduct } from './create-product.factory'
import { CreateProduct } from '../domain/usecases/create-product'
import * as Joi from 'joi'
import { makeGetProductById } from './get-product-by-id.factory'
import { makeListProducts } from './list-products.factory'
import { Product } from '../domain/entities/product.entity'
import { ProductViewModel } from './view-models/product-view-model'
import { ListProducts } from '../domain/usecases/list-products'
import { Attribute } from '../domain/entities/value-objects/attributes'

function errorHandler(reply: Hapi.ResponseToolkit, error: Error | BaseError) {
  console.error(error)
  if (error instanceof BaseError) {
    const statusCode = error.statusCode || 500

    if (error.isClientError) {
      return reply.response({ error: error.message, ...error }).code(statusCode)
    }

    return reply.response({ error: 'Internal server error' }).code(statusCode)
  }

  return reply.response({ error: 'Internal server error' }).code(500)
}

export const productRoutes: Hapi.ServerRoute[] = [
  {
    method: 'POST',
    path: '/products',
    options: {
      validate: {
        payload: Joi.object({
          ean: Joi.string().required(),
          title: Joi.string().required(),
          brand: Joi.string().required(),
          attributes: Joi.array()
            .items(
              Joi.object({
                type: Joi.string().required(),
                value: Joi.string().required(),
                label: Joi.string().required(),
              })
            )
            .optional(),
          categories: Joi.array()
            .items(
              Joi.object({
                id: Joi.string().uuid().required(),
              })
            )
            .optional(),
        }),
        failAction: 'error',
      },
      handler: async (request, h) => {
        try {
          const createProduct = makeCreateProduct()
          const product = await createProduct.execute(
            ProductViewModel.toDomain(request.payload)
          )

          return h.response(ProductViewModel.toHttp(product)).code(201)
        } catch (error) {
          return errorHandler(h, error)
        }
      },
    },
  },
  {
    method: 'GET',
    path: '/products/{id}',
    handler: async (request, h) => {
      try {
        const getProductById = makeGetProductById()
        const product = await getProductById.execute(
          request.params.id as string
        )

        return h.response(ProductViewModel.toHttp(product)).code(200)
      } catch (error) {
        return errorHandler(h, error)
      }
    },
  },
  {
    method: 'GET',
    path: '/products',
    options: {
      validate: {
        query: Joi.object({
          title: Joi.string().optional(),
          brand: Joi.string().optional(),
          'attributes.type': Joi.string().optional(),
          'attributes.value': Joi.string().optional(),
          'attributes.label': Joi.string().optional(),
        }),
      },
      handler: async (request, h) => {
        try {
          const listProducts = makeListProducts()
          const params: ListProducts.Params = {
            attribute: new Attribute({
              type: request.query['attributes.type'],
              value: request.query['attributes.value'],
              label: request.query['attributes.label'],
            }),
            title: request.query.title,
            brand: request.query.brand,
          }
          const products = await listProducts.execute(params)

          return h.response(products.map(ProductViewModel.toHttp)).code(200)
        } catch (error) {
          return errorHandler(h, error)
        }
      },
    },
  },
]
