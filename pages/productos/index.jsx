import { useSelector, useDispatch } from "react-redux";
import { wrapper } from "../../src/store";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import AsideBar from "../../src/components/categories/AsideBar";
import Layout from "../../src/components/Layouts";

import { startLoadCategories } from "../../src/actions/categoryActions";
import { startLoadBrands } from "../../src/actions/brandsActions";

import { useRouter } from "next/router";
import { startLoadAdministrableLogo } from "../../src/actions/administrableActions";
import { BannerImage } from "../../src/components/ui/bannerImage";
import { ProductCard } from "../../src/components/ui";

import { useState } from "react";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import CategoriesList from "../../src/components/categories/CategoriesList";
import BrandsList from "../../src/components/brands/BrandsList";
import LoadingScreen from "../../src/components/LoadingScreen";
import Filters from "../../src/components/products/Filters";
import { startLoadFaqsCategories } from "../../src/actions/faqsActions";

import { useQueryParams } from "../../src/hooks/useQueryParams";
import RangePrice from "../../src/components/prices/RangePrice";
import { startFilterProducts, startSearchProduct } from "../../src/actions/productsAction";

import SearchIcon from '@mui/icons-material/Search';

const endpoint = "/products/filter/products-paginated";

const Products = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { startSearchByQueryParams, starClearQueryParams, paramsFilters } = useQueryParams(endpoint, { router });

  const { products, searchedProducts } = useSelector((state) => state.products);

  const { logo } = useSelector((state) => state?.administrable);
  const { brands } = useSelector((state) => state?.brands);
  const { categories } = useSelector((state) => state?.categories);
  const { categories: CategoriesFaqs } = useSelector((state) => state?.faqs);

  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');

  const handelClickPage = async (e, value) => {
    await startSearchByQueryParams({ page: value });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSearch = async (querySearch) => {
    if (!querySearch) return setQuery('');
    dispatch(startSearchProduct(querySearch));
    setQuery(querySearch);
  }

  const origin = typeof window === "undefined" ? "" : window.location.href;

  return (
    <Layout
      title="Wapizima - Productos"
      robots="index, follow"
      keywords={`Wapizima, Productos, ${brands?.map(brand => brand?.name)}, ${categories?.map(category => category?.name)}`}
      categories={CategoriesFaqs}
      ogTitle="Wapizima - Productos"
      ogType="website"
      description="Tienda en línea de distribución de productos profesionales para uñas  de calidad. Venta Menudeo y Mayoreo. Promociones, descuentos y mucho más."
      ogUrl={origin}
      ogImage={logo}
      canonical={origin}
    >
      <BannerImage title="Productos" banner="bg-banner1" />
      {loading && <LoadingScreen />}
      <section className="container mx-auto grid grid-cols-1 md:grid-cols-3 mt-20 lg:grid-cols-4">
        <AsideBar>
        {
          !query && (
            <>
              <Filters 
                starClearQueryParams={starClearQueryParams}
                endpoint={endpoint} 
              />
              <RangePrice 
                startSearchByQueryParams={startSearchByQueryParams} 
                paramsFilters={paramsFilters}
              />
              <BrandsList
                brands={brands}
                setLoading={setLoading}
                startSearchByQueryParams={startSearchByQueryParams}
                paramsFilters={paramsFilters}
              />
              <CategoriesList
                categories={categories}
                setLoading={setLoading}
                startSearchByQueryParams={startSearchByQueryParams}
                paramsFilters={paramsFilters}
              />
            </>
            )
          }
          </AsideBar>
        <div className="col-span-4 md:col-span-2 lg:col-span-3">
        <div className="flex flex-row-reverse px-3 md:px-0">
          <div className="border-[1px] border-solid border-[#e6e6e6] rounded-sm flex items-center mb-6 w-full md:w-6/12">
            <input
                type="text"
                name="email"
                placeholder="Buscar"
                className="w-full h-12 font-Poppins text-[13px] leading-[1.6] text-[#333] pr-[30px] pl-[15px] outline-0"
                onChange={()=>handleSearch(event.target.value)}
            />
            <SearchIcon className="text-[25px] text-[#888] w-[20%]"/>
          </div>
        </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-20 mt-10">
            {
              (searchedProducts?.length > 0 && query) ? (
                (searchedProducts?.length > 0 && query) ? (                
                  searchedProducts?.map((product) => (
                    <ProductCard key={product?._id} product={product} />
                  ))
              ):(
                <div className="text-center col-span-full">
                  <h4 className="text-2xl uppercase font-semibold mt-20 mb-10">
                    No hay resultados para tu busqueda
                  </h4>
                </div>
              )):(
                (products?.totalDocs > 0)? (
                  products?.products?.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))
                ) : (
                  <div className="text-center col-span-full">
                    <h4 className="text-2xl uppercase font-semibold mt-20 mb-10">
                      No hay resultados para tu busqueda
                    </h4>
                  </div>
                )
              )
            }
          </div>
          {((products?.hasNextPage || products?.hasPrevPage) && !query) && (
            <div className="flex justify-center my-10">
              <Stack spacing={2}>
                <Pagination
                  count={products?.totalPages}
                  page={products?.page}
                  renderItem={(item) => (
                    <PaginationItem
                      components={{
                        previous: ArrowBackIcon,
                        next: ArrowForwardIcon,
                      }}
                      {...item}
                    />
                  )}
                  onChange={handelClickPage}
                  size="large"
                />
              </Stack>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const endpoint = '/products/filter/products-paginated';
    await store.dispatch(startFilterProducts(endpoint));
    await store.dispatch(startLoadCategories());
    await store.dispatch(startLoadBrands());
    await store.dispatch(startLoadAdministrableLogo());
    await store.dispatch(startLoadFaqsCategories());
  }
);

export default Products;
