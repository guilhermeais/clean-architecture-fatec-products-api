import { ListProducts } from "../domain/usecases/list-products";
import { makeProductRepository } from "./product-repository.factory";

export function makeListProducts(): ListProducts {
    return new ListProducts(makeProductRepository());
}