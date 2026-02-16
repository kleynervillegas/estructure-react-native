import { useCallback, } from "react";
import { Product } from "../types/products";
import { useSqlite } from "./useSqlite";

const useProducts = () => {

  const { createOrUpdateCart, deleteOneProductCart } = useSqlite()

  // agregrar producto al carrito de compra
  const addProductoToCart = useCallback(async (product: Product): Promise<number> => {
    return await createOrUpdateCart(product, 1);
  }, [createOrUpdateCart]);

  // agregrar producto al carrito de compra
  const deleteroductoToCart = useCallback(async (product: Product): Promise<boolean> => {
    return await deleteOneProductCart(product.id_product);
  }, [deleteOneProductCart]);

  return {
    addProductoToCart,
    deleteroductoToCart,
  }
}

export default useProducts