import { types } from "../types";

const initialState = {
  brandsHome: [],
  brands: [],
  products: [],
  brand: [],
  subcategories: [],
  categoriesSelected: [],
  filteredProducts: [],
  BrandFilters: [],
  results: {},
};

export const brandsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.loadBrandsHome:
      return {
        ...state,
        brandsHome: payload,
      };

    case types.loadBrands:
      return {
        ...state,
        brands: payload,
      };

    case types.load_brands_per_category:
      return {
        ...state,
        brands: payload,
      }

    case types.filters_to_products_from_brand: {
      const { filter, products } = payload;

      let filterInFilters = state.BrandFilters.find(
        (filterSelected) => filterSelected._id === filter._id
      );

      return filterInFilters
        ? {
          ...state,
        }
        : {
          ...state,
          filteredProducts:
            products.length > 0
              ? [...products, ...state.filteredProducts]
              : [...state.filteredProducts],
          BrandFilters: [filter, ...state.BrandFilters],
          results: { quantity: products.length, name: filter.name },
        };
    }

    case types.load_products_from_brand:
      return {
        ...state,
        brand: payload,
      };

    case types.clear_all_filter_from_brands:
      return {
        ...state,
        filteredProducts: initialState.filteredProducts,
        BrandFilters: initialState.BrandFilters,
        results: initialState.results,
      };

    case types.load_subcategories:
      return {
        ...state,
        subcategories: payload,
      };

    default:
      return state;
  }
};
