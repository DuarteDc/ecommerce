
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoadAdministrableLogo } from "../../src/actions/administrableActions";
import { startLoadBrands, startLoadSubcategories } from "../../src/actions/brandsActions";
import { startLoadTags } from "../../src/actions/tagsActions";
import Layout from "../../src/components/Layouts";

import { BannerImage, ProductCard } from "../../src/components/ui";
import ProductCardMobile  from "../../src/components/ui/Mobile/ProductCard";


import AsideBar from '../../src/components/categories/AsideBar';
import BrandsList from '../../src/components/brands/BrandsList';
import TagsList from '../../src/components/tags/TagsList';
import LoadingScreen from "../../src/components/LoadingScreen";

import { wrapper } from "../../src/store";
import { useRouter } from "next/router";
import { helpersProducts } from "../../src/helpers";
import CategoryFilters from "../../src/components/categories/CategoryFilters";
import { startLoadFaqsCategories } from "../../src/actions/faqsActions";
import { useQueryParams } from "../../src/hooks/useQueryParams";
import { startFilterProducts } from "../../src/actions/productsAction";

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SubcategoriesList from "../../src/components/subcategories/SubcategoriesList";
import RangePrice from "../../src/components/prices/RangePrice";
import { startLoadCurrencies, startLoadPricesCurrencies } from "../../src/actions/countryAcctions";
import { startLoadBrandsPerCategory } from "../../src/actions/brandsActions";
import { startLoadSubcategoriesPerCategory } from "../../src/actions/categoryActions";

const Category = () => {

    const { category, subcategories } = useSelector((state) => state.categories);
    const { brands } = useSelector((state) => state.brands);
    const { categories } = useSelector((state) => state.faqs);
    const { dimensions } = useSelector(state => state.ui);
    const { currencyPrices } = useSelector(state => state.countries);
    const { products } = useSelector((state) => state.products);

    const router = useRouter();

    const endpoint = `/products/filter-category/products-paginated/${router.query.url}`;

    const { startSearchByQueryParams, starClearQueryParams, paramsFilters, loading } = useQueryParams(endpoint, { router });

    const handelClickPage = async (e, value) => {
        await startSearchByQueryParams({ page: value });
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    return (
        <Layout
            categories={categories}
            robots="index, follow"
        >
            <BannerImage
                title={`${products?.category?.name}`}
                banner="bg-banner2"
            />
            {loading && <LoadingScreen />}
            <section className="container mx-auto grid grid-cols-1 md:grid-cols-3 mt-20 lg:grid-cols-4">
                <AsideBar>
                    <CategoryFilters
                        starClearQueryParams={starClearQueryParams}
                        endpoint={endpoint}
                    />
                    <RangePrice
                        startSearchByQueryParams={startSearchByQueryParams}
                        paramsFilters={paramsFilters}
                        currencyPrices={currencyPrices}
                    />
                    <BrandsList
                        brands={brands}
                        paramsFilters={paramsFilters}
                        category={category}
                        startSearchByQueryParams={startSearchByQueryParams}
                    />
                    <SubcategoriesList
                        subcategories={subcategories}
                        paramsFilters={paramsFilters}
                        startSearchByQueryParams={startSearchByQueryParams}
                    />
                </AsideBar>
                <div className="col-span-4 md:col-span-2 lg:col-span-3">
                    <div className="grid grid-cols-2 lg:grid-cols-3 lg:col-span-3">
                        {
                            products?.totalDocs > 0 ? (
                                products?.products?.map((product) => (
                                        <ProductCard
                                            key={product._id}
                                            product={product}
                                        />
                                    
                                ))
                            ) : (
                                <div className="text-center col-span-full">
                                    <h4 className="text-2xl uppercase font-semibold mt-20 mb-10">No hay resultados para tu busqueda</h4>
                                </div>
                            )
                        }
                    </div>
                    {
                        (products.hasNextPage || products.hasPrevPage) && (
                            <div className="flex justify-center my-10">
                                <Stack spacing={2}>
                                    <Pagination
                                        count={products.totalPages}
                                        page={products.page}
                                        renderItem={(item) => (
                                            <PaginationItem
                                                components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                                                {...item}
                                            />
                                        )}
                                        onChange={handelClickPage}
                                        size="large"
                                    />
                                </Stack>
                            </div>
                        )
                    }
                </div>
            </section>
        </Layout>
    )
}

export const getServerSideProps = wrapper.getServerSideProps((store) =>
    async (ctx) => {
        const endpoint = `/products/filter-category/products-paginated/${ctx.query.url}`;
        const isValid = await store.dispatch(startFilterProducts(endpoint, undefined, ctx.req.cookies.Currency));
        if (!isValid) {
            return {
                notFound: true,
            }
        }
        await store.dispatch(startLoadBrandsPerCategory(ctx.query.url));
        await store.dispatch(startLoadSubcategoriesPerCategory(ctx.query.url));
        await store.dispatch(startLoadAdministrableLogo());
        await store.dispatch(startLoadPricesCurrencies(ctx.req?.cookies?.Currency || 'MXN'));
        await store.dispatch(startLoadFaqsCategories());
        await store.dispatch(startLoadCurrencies());
    })

export default Category;