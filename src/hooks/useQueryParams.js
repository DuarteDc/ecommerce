import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { addFiltersPerProducts, clearAll, removeItemFromFilters, startFilterProducts } from "../actions/productsAction";
import { helpersProducts } from "../helpers";
import { params } from "../staticData/queryParams";
import Cookies from "js-cookie";
import { clearSubcategories } from "../actions/categoryActions";

export const useQueryParams = (endpoint, { router }) => {
  const { getQueryParams, filterSearch } = helpersProducts;

  const dispatch = useDispatch();

  const [queryParams, setQueryParams] = useState("");
  const [loading, setLoading] = useState(false);

  const paramsFilters = (filter) => {
    dispatch(addFiltersPerProducts(filter));
  }

  const startSearchByQueryParams = (param, type = 2) => {
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
    filterSearch({ router, param, type });
  };

  const removeQueryParam = async (param = {}, endpoint = '') => {

    const arrFiltered = [];
    let currenQueries = Object.entries(router.query);

    if (param.type === 3 && router.query.hasOwnProperty('subcategory_id')) {
      const { subcategory_id, category_id, ...rest } = router.query;
      arrFiltered = Object.entries(rest);
      dispatch(clearSubcategories())
    } else {
      arrFiltered = currenQueries.filter(([key, value]) => value !== param?._id && value != param?.min && value != param?.max);
    }

    const newQueries = Object.fromEntries(arrFiltered);
    router.push(
      {
        pathname: router.path,
        query: newQueries
      },
      undefined,
      { shallow: true }
    );

    if (Object.keys(newQueries).length < 1) await dispatch(startFilterProducts(endpoint));

    dispatch(removeItemFromFilters(param));
  }

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
    const currency = Cookies.get('Currency') || 'MXN';
    setLoading(true);
    const queries = await getQueryParams(router.asPath);
    await dispatch(startFilterProducts(endpoint, queries, currency));
    setQueryParams(queries);
    setLoading(false)
  }

  useEffect(() => {
    if (Object.keys(router.query).length > 0) searchData();
  }, [router.asPath]);

  return { queryParams, startSearchByQueryParams, starClearQueryParams, paramsFilters, removeQueryParam, loading };
};
