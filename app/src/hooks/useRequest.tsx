import { useCallback, } from "react";
import axiosInstance from "../config/axiosConfig";
import { getToken } from "../src/utils/functions";

const useRequest = () => {

  // Función para realizar una solicitud HTTP a la api core
  const handleRequest = useCallback(async ({
    baseURL = 'https://dev.midrtas.com/api/',
    url,
    method = "GET",
    data = {},
    params = {},
    headers = {},
    signal,
    responseType = "json",
    withCredentials = false,
    timeout = 0,
    redirect = 'follow',
    withErrorAlert = false,
    handleErrorCallback,
  }: any): Promise<any> => {
    try {
      const token = (await getToken())?.token;
      const options = {
        baseURL,
        url,
        method,
        data,
        params,
        headers: {
          ...headers,
          'Accept': 'application/json, text/plain, */*',
          'token': `${token}`
        },
        signal,
        responseType,
        timeout,
        withCredentials,
        redirect
      };

      const response = await axiosInstance(options);

      return {
        data: response.data,
        statusError: false
      };

    } catch (err: any) {
      return {
        data: null,
        error: err?.response?.data,
        statusError: true
      };
    }
  }, []);

  return {
    handleRequest,
  }
}

export default useRequest