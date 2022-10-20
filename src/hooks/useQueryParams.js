import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { addFiltersPerProducts, clearAll, startFilterProducts } from "../actions/productsAction";
import { helpersProducts } from "../helpers";
import { params } from "../staticData/queryParams";
import Cookies from "js-cookie";

export const useQueryParams = (endpoint, { router }) => {
  const { getQueryParams, filterSearch } = helpersProducts;

  const dispatch = useDispatch();

  const [queryParams, setQueryParams] = useState("");
  const [loading, setLoading] = useState(false);

  const paramsFilters = (filter) => {
    dispatch(addFiltersPerProducts(filter));
  }

  const startSearchByQueryParams = (param) => {
    const paramIsValid = params.find((p) => p === Object?.keys(param)[0]);

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
    if (router.query.hasOwnProperty('url')) {
      router.push({
        pathname: router.route,
        query: { url: router.query.url },
      }, undefined, { shallow: true })
    } else {
      router.push(
        {
          pathname: router.path,
        },
        undefined,
        { shallow: true }
      );
    }
    await dispatch(startFilterProducts(endpoint));
    await dispatch(clearAll());
  };

  const searchData = async () => {
    const currency = Cookies.get('Currency');
    setLoading(true);
    const queries = await getQueryParams(router.asPath);
    await dispatch(startFilterProducts(endpoint, queries, currency));
    setQueryParams(queries);
    setLoading(false)
  }

  useEffect(() => {
    if (Object.keys(router.query).length > 0) searchData();
  }, [router.query]);

  return { queryParams, startSearchByQueryParams, starClearQueryParams, paramsFilters, loading };
};
