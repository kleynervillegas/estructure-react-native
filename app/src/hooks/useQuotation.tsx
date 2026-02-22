import { useCallback, } from "react";
import { Quotation } from "../types/quotation";
import { useSqlite } from "./useSqlite";

const useQuotation = () => {

  const { createQuotation, getAllQuotation } = useSqlite()

  // agregar cotización
  const createdQuotation = useCallback(async (quotation: Quotation): Promise<number> => {
    return await createQuotation(quotation, 1);
  }, [createQuotation]);

  // agregar cotización
  const getQuotation = useCallback(async (): Promise<Quotation[]> => {
    return await getAllQuotation();
  }, [getAllQuotation]);


  return {
    createdQuotation,
    getAllQuotation,
    getQuotation
  }
}

export default useQuotation