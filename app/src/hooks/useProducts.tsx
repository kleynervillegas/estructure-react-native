import { useCallback, } from "react";
import { Product } from "../types/products";
import { useSqlite } from "./useSqlite";

const useProducts = () => {

  const {createOrUpdateCart } = useSqlite()

  // agregrar producto al carrito de compra
  const addProductoToCart = useCallback(async (product: Product): Promise<number> => {
   return  await createOrUpdateCart(product,1);
  }, []);

  return {
    addProductoToCart,
  }
}

export default useProducts