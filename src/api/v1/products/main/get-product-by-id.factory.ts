import { GetProductById } from "../domain/usecases/get-product-by-id";
import { makeProductRepository } from "./product-repository.factory";

export function makeGetProductById(): GetProductById {
    return new GetProductById(makeProductRepository());
}