import axios from 'axios';
import client from '../config/axiosConfig';
import Cookies from 'js-cookie';

import { types } from '../types';

export const startLoadProducts = () => {
  return async (dispatch) => {
    let url = "/products";
    try {
      const res = await client.get(url);
      dispatch(loadProducts(res.data.products));
    } catch (error) {
      console.log(error);
    }
  };
};

export const loadProducts = (products) => ({
  type: types.loadProducts,
  payload: products,
});

export const startLoadProduct = (slug, currency) => {
  return async (dispatch) => {
    let url = `products/slug/${slug}`;
    try {
      const res = await client.get(url, {
        headers: {
          'Currency': currency
        }
      });
      const { product, relatedProducts } = res.data;
      dispatch(loadProduct(product, relatedProducts));
      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return false;
      }
    }
  };
};

export const loadProduct = (product, relatedProducts) => ({
  type: types.loadProduct,
  payload: {
    product,
    relatedProducts,
  },
});

export const addProductSelected = (product) => ({
  type: types.addProductSelected,
  payload: product,
});

export const clearAll = () => ({
  type: types.clear_all_filter,
});

/*                       Filtros                       */

export const addFiltersPerProducts = (filter) => ({
  type: types.filters_to_products,
  payload: filter,
});

export const startLoadProductsPerCategory = (category) => {
  return async (dispatch) => {
    let url = `/products/category/${category._id}`;
    try {
      const res = await client.get(url);
      dispatch(loadProductsPerCategory(category, res.data.products));
    } catch (error) {
      console.log(error);
    }
  };
};

export const loadProductsPerCategory = (category, products) => ({
  type: types.filters_to_products,
  payload: {
    filter: category,
    products,
  },
});

export const startloadProductsPerTags = (tag) => {
  return async (dispatch) => {
    let url = `/products/tag/${tag._id}`;
    try {
      const res = await client.get(url);
      dispatch(loadProductsPerTags(tag, res.data.products));
    } catch (error) {
      console.log(error);
    }
  };
};

export const loadProductsPerTags = (tag, products) => ({
  type: types.filters_to_products,
  payload: {
    filter: tag,
    products,
  },
});

export const removeItemFromFilters = (item) => ({
  type: types.remove_filter,
  payload: item,
});

/*                  Paginación                   */

export const startLoadProductPerPagination = (page) => {
  return async (dispatch) => {
    let url = `products?page=${page}`;
    try {
      const res = await client.get(url);
      dispatch(loadProducts(res.data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const loadProductPerPagination = (products) => ({
  type: types.load_products_per_pagination,
  payload: products,
});

/********************+filtro de productos *******************************/

export const startFilterProducts = (endpoint, params = '', currency = Cookies.get('Currency') || 'MXN') => {
  return async (dispatch) => {
    try {
      const { data } = await client.get(`${endpoint}${params}`, {
        headers: {
          'Currency': currency
        }
      });
      dispatch(filterProducts(data, params));
      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return false;
      }
    }
  };
};

export const filterProducts = (products, params) => ({
  type: types.filter_products,
  payload: products
});

/**************************buscar producto*********************************/

export const startSearchProduct = (query, currency = Cookies.get('Currency') || 'MXN') => {
  return async (dispatch) => {
    const url = `/search/products?search=${query}`;
    try {
      const res = await client.get(url, {
        headers: {
          'Currency': currency
        }
      });
      dispatch(searchProduct(res.data.results));
    } catch (error) {
      console.log(error);
    }
  };
};

export const searchProduct = (products) => ({
  type: types.search_products,
  payload: products,
});


export const startLoadProductsRSS = async () => {
  let url = "/products/without/pagination";
  try {
    const res = await client.get(url);
    return res.data.products;
  } catch (error) {
    console.log(error);
  }
};
