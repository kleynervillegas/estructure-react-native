import { useCallback, } from "react";
import { Quotation } from "../types/quotation";
import { useSqlite } from "./useSqlite";

const useQuotation = () => {

  const { createQuotation, getAllQuotation } = useSqlite()

  // agregar cotización
  const createdQuotation = useCallback(async (quotation: Quotation): Promise<number> => {
    return await createQuotation(quotation, 1);
  }, [createQuotation]);

  // obtener cotizaciones
  const getQuotation = useCallback(async (): Promise<Quotation[]> => {
    let quotations: Quotation[] = await getAllQuotation();
    quotations = quotations.map((item: any) => {
      return {
        id: item.id,
        service: item.service,
        user_id: item.user_id,
        protection: item.protection,
        image: item.image,
        dimensions_json: JSON.parse(item.dimensions_json),
        client_json: JSON.parse(item.client_json),
        quality_json: JSON.parse(item.quality_json),
        additional_json: JSON.parse(item.additional_json),
      }
    });
    return quotations;
  }, [getAllQuotation]);


  return {
    createdQuotation,
    getQuotation
  }
}

export default useQuotation