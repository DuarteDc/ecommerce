import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { startFilterPriducts } from "../actions/productsAction";
import { helpersProducts } from "../helpers";
import { params } from "../staticData/queryParams";

export const useQueryParams = (endpoint, { router }) => {
  const { getQueryParams, filterSearch } = helpersProducts;

  const dispatch = useDispatch();

  const [queryParams, setQueryParams] = useState("");

  const startSearchByQueryParams = (param) => {
    const paramIsValid = params.find((p) => p === Object.keys(param)[0]);

    if (!paramIsValid) {
      router.push(
        {
          pathname: router.path,
        },
        undefined,
        { shallow: true }
      );
    }

    filterSearch({ router, param });
  };

  const starClearQueryParams = async (endpoint) => {
    await startFilterPriducts(endpoint);
  };

  useEffect(() => {
    if (router.query) {
      const queries = getQueryParams(router.asPath);
      dispatch(startFilterPriducts(endpoint, queries));
      setQueryParams(queries);
      return;
    }
    starClearQueryParams(endpoint)
  }, [router.asPath]);

  return [queryParams, startSearchByQueryParams, starClearQueryParams];
};
