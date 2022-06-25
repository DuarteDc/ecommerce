
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoadAdministrableLogo } from "../../src/actions/administrableActions";
import { startLoadBrands, startLoadSubcategories } from "../../src/actions/brandsActions";
import { startLoadTags } from "../../src/actions/tagsActions";
import Layout from "../../src/components/Layouts";

import { BannerImage, ProductCard } from "../../src/components/ui";


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
import { startFilterPriducts } from "../../src/actions/productsAction";

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SubcategoriesList from "../../src/components/subcategories/SubcategoriesList";
import RangePrice from "../../src/components/prices/RangePrice";

const Category = () => {

    const { category, filteredProducts, results, categoryFilters } = useSelector((state) => state.categories);
    const { brands, subcategories } = useSelector((state) => state.brands);
    const { tags } = useSelector((state) => state.tags);
    const { categories } = useSelector((state) => state.faqs);

    const { products } = useSelector((state) => state.products);

    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const dispatch = useDispatch();

    const endpoint = `/products/filter-category/products-paginated/${router.query.url}`;
    const [queryParams, startSearchByQueryParams, starClearQueryParams] = useQueryParams(endpoint, { router });


    const handelClickPage = async (e, value) => {
        await startSearchByQueryParams({page: value});
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }


    return (
        <Layout
            categories={categories}
        >
            <BannerImage
                title={`${products?.category?.name}`}
            />
            {loading && <LoadingScreen />}
            <section className="container mx-auto grid grid-cols-1 md:grid-cols-3 mt-20 lg:grid-cols-4">
                <AsideBar>
                    {/* <CategoryFilters url={category.url} /> */}
                    <RangePrice startSearchByQueryParams={startSearchByQueryParams}/>
                    <BrandsList brands={brands} setLoading={setLoading} category={category} startSearchByQueryParams={startSearchByQueryParams} />
                    <SubcategoriesList subcategories={subcategories} startSearchByQueryParams={startSearchByQueryParams} />
                </AsideBar>
                <div className="col-span-4 md:col-span-2 lg:col-span-3">
                    {
                        Object.keys(categoryFilters).length !== 0 && (
                            <p className="text-gray-900 px-2 text-lg">
                                {results.quantity} {results.quantity > 1 ? 'resultados' : 'resultado'}  sobre {results.name}
                            </p>
                        )
                    }
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:col-span-3">
                    {
                            products?.totalDocs > 0 ? (
                            products?.products?.map((product) => (
                                <ProductCard 
                                    key={product._id} 
                                    product={product} 
                                />
                            ))
                            ):(
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
        await store.dispatch(startFilterPriducts(endpoint));
        await store.dispatch(startLoadBrands());
        await store.dispatch(startLoadTags())
        await store.dispatch(startLoadSubcategories())
        await store.dispatch(startLoadAdministrableLogo());
        await store.dispatch(startLoadFaqsCategories());
    })

export default Category;