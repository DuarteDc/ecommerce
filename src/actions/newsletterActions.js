import axios from "axios";
import client from "../config/axiosConfig";
import { errorNotify, successNotify } from "../helpers/helpers";

export const startStoreNewsletterSuscription = (email) => {
  return async () => {
    let url = "newsletter";
    try {
      const { data } = await client.post(url, email);
      successNotify(data.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
          errorNotify(error?.response?.data?.message);
      }

      errorNotify("No se pudo guardar la dirección - intente mas tarde");
    }
  };
};
