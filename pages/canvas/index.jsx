// import { useState } from 'react';

// import { startLoadAdministrableLogo } from "../../src/actions/administrableActions";
// import Layout from "../../src/components/Layouts"
// import { BannerImage, ProductCard } from "../../src/components/ui"
// import { wrapper } from '../../src/store';
// import { useRouter } from "next/router";
// import { startFilterProducts } from "../../src/actions/productsAction";
// import { startLoadFaqsCategories } from "../../src/actions/faqsActions";
// import { useDispatch, useSelector } from "react-redux";
// import { useQueryParams } from "../../src/hooks/useQueryParams";
// import AsideBar from "../../src/components/categories/AsideBar";
// import Filters from "../../src/components/products/Filters";
// import RangePrice from "../../src/components/prices/RangePrice";
// import CategoriesList from "../../src/components/categories/CategoriesList";
// import { startLoadCategories } from "../../src/actions/categoryActions";
// import { startLoadSubcategories } from "../../src/actions/brandsActions";

// import Pagination from "@mui/material/Pagination";
// import Stack from "@mui/material/Stack";
// import PaginationItem from "@mui/material/PaginationItem";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// import LoadingScreen from "../../src/components/LoadingScreen";
// import { startLoadCurrencies } from '../../src/actions/countryAcctions';

// const endpoint = "/products/canvas";

// const Canvas = () => {

//     const [query, setQuery] = useState('');
//     const router = useRouter();

//     const dispatch = useDispatch();
//     const { startSearchByQueryParams, starClearQueryParams, paramsFilters, loading } = useQueryParams(endpoint, { router });

//     const { products, searchedProducts } = useSelector((state) => state.products);

//     const { logo } = useSelector((state) => state?.administrable);
//     const { subcategories } = useSelector((state) => state?.brands);
//     const { categories } = useSelector((state) => state?.categories);
//     const { categories: CategoriesFaqs } = useSelector((state) => state?.faqs);

//     const handelClickPage = async (e, value) => {
//         await startSearchByQueryParams({ page: value });
//         window.scrollTo({
//             top: 0,
//             behavior: "smooth",
//         });
//     };

//     const handleSearch = async (querySearch) => {
//         if (!querySearch) return setQuery('');
//         setQuery(querySearch);
//     }

//     const origin = typeof window === "undefined" ? "" : window.location.href;


//     return (
//         <Layout>
//             <BannerImage title="Canvas" banner="bg-banner1" />
//             {loading && <LoadingScreen />}
//             <section className="container mx-auto grid grid-cols-1 md:grid-cols-3 mt-20 lg:grid-cols-4">
//                 <AsideBar>
//                     <Filters
//                         starClearQueryParams={starClearQueryParams}
//                         endpoint={endpoint}
//                     />
//                     <RangePrice
//                         startSearchByQueryParams={startSearchByQueryParams}
//                         paramsFilters={paramsFilters}
//                     />
//                     <CategoriesList
//                         categories={categories}
//                         startSearchByQueryParams={startSearchByQueryParams}
//                         paramsFilters={paramsFilters}
//                     />
//                 </AsideBar>
//                 <div className="col-span-4 md:col-span-2 lg:col-span-3">
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-20 mt-10">
//                         {
//                             (searchedProducts?.length > 0 && query) ? (
//                                 (searchedProducts?.length > 0 && query) ? (
//                                     searchedProducts?.map((product) => (
//                                         <ProductCard key={product?._id} product={product} />
//                                     ))
//                                 ) : (
//                                     <div className="text-center col-span-full">
//                                         <h4 className="text-2xl uppercase font-semibold mt-20 mb-10">
//                                             No hay resultados para tu busqueda
//                                         </h4>
//                                     </div>
//                                 )) : (
//                                 (products?.totalDocs > 0) ? (
//                                     products?.products?.map((product) => (
//                                         <ProductCard key={product._id} product={product} />
//                                     ))
//                                 ) : (
//                                     <div className="text-center col-span-full">
//                                         <h4 className="text-2xl uppercase font-semibold mt-20 mb-10">
//                                             No hay resultados para tu busqueda
//                                         </h4>
//                                     </div>
//                                 )
//                             )
//                         }
//                     </div>
//                     {((products?.hasNextPage || products?.hasPrevPage) && !query) && (
//                         <div className="flex justify-center my-10">
//                             <Stack spacing={2}>
//                                 <Pagination
//                                     count={products?.totalPages}
//                                     page={products?.page}
//                                     renderItem={(item) => (
//                                         <PaginationItem
//                                             components={{
//                                                 previous: ArrowBackIcon,
//                                                 next: ArrowForwardIcon,
//                                             }}
//                                             {...item}
//                                         />
//                                     )}
//                                     onChange={handelClickPage}
//                                     size="large"
//                                 />
//                             </Stack>
//                         </div>
//                     )}
//                 </div>
//             </section>
//         </Layout>
//     )
// }

// export const getStaticProps = wrapper.getStaticProps((store) => async () => {
//     const endpoint = "/products/canvas";
//     await store.dispatch(startLoadCurrencies());
//     await store.dispatch(startFilterProducts(endpoint));
//     await store.dispatch(startLoadAdministrableLogo());
//     await store.dispatch(startLoadFaqsCategories());
//     await store.dispatch(startLoadCategories());
//     await store.dispatch(startLoadSubcategories())
//     return {
//         revalidate: 300
//     }
// });

// export default Canvas


import React from 'react'

const Canvas = () => {
  return (
    <div>Canvas</div>
  )
}

export default Canvas