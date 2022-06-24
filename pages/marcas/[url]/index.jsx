import { useRouter } from 'next/router';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';



import Layout from '../../../src/components/Layouts';
import Card from '../../../src/components/Layouts/Card';
import CategoriesList from '../../../src/components/categories/CategoriesList';


import { wrapper } from '../../../src/store';
import { startFilterProductsPerBrandAndCategory, startLoadProductsPerBrand, startloadProductsPerTagsInBrand, startLoadSubcategories } from '../../../src/actions/brandsActions';
import { startLoadCategories } from '../../../src/actions/categoryActions';

import { startLoadAdministrableLogo } from '../../../src/actions/administrableActions';
import { BannerImage, ProductCard } from '../../../src/components/ui';

import { startLoadTags } from '../../../src/actions/tagsActions';
import { useEffect, useState } from 'react';

import AsideBar from '../../../src/components/categories/AsideBar';


import LoadingScreen from '../../../src/components/LoadingScreen';
import { useLocalStorage } from '../../../src/hooks/useLocalStorage';
import BrandFilter from '../../../src/components/brands/BrandFilter';
import TagsList from '../../../src/components/tags/TagsList';
import { startLoadFaqsCategories } from '../../../src/actions/faqsActions';
import { useQueryParams } from '../../../src/hooks/useQueryParams';
import { startFilterPriducts } from '../../../src/actions/productsAction';
import SubcategoriesList from '../../../src/components/subcategories/SubcategoriesList';
import RangePrice from '../../../src/components/prices/RangePrice';

import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Show = () => {
    
    const router = useRouter();
    
    const [loading, setLoading] = useState(false);
    
    
    const { brand, filteredProducts, results, BrandFilters, subcategories } = useSelector((state) => state.brands);
    const { products } = useSelector((state) => state.products);
    const { categories } = useSelector((state) => state.categories);
    const { categories: CategoriesFaqs } = useSelector((state) => state.faqs);
    
    const endpoint = `/products/filter-brand/products-paginated/${router.query.url}`;
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
            categories={CategoriesFaqs}
        >
            <BannerImage
                title={`${products?.products[0].brand.name}`}
            />
            {loading && <LoadingScreen />}
            <section className="container mx-auto grid grid-cols-1 md:grid-cols-3 mt-20 lg:grid-cols-4">
                <AsideBar>
                    <BrandFilter url={brand.url} />
                    <RangePrice startSearchByQueryParams={startSearchByQueryParams}/>
                    <CategoriesList categories={categories} setLoading={setLoading} brand={brand} startSearchByQueryParams={startSearchByQueryParams}/>
                    <SubcategoriesList subcategories={subcategories} startSearchByQueryParams={startSearchByQueryParams} />
                </AsideBar>
                <div className="col-span-4 md:col-span-2 lg:col-span-3">
                    {
                        Object.keys(BrandFilters).length !== 0 && (
                            <p className="text-gray-900 px-2 text-lg">
                                {results.quantity} {results.quantity > 1 ? 'resultados' : 'resultado'}  sobre {results.name}
                            </p>
                        )
                    }
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:col-span-3">
                        {
                            products?.products?.map(product => (
                                <ProductCard 
                                    key={product?._id}
                                    product={product} 
                                />
                            ))   
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
        </Layout >
    )
}

export const getServerSideProps = wrapper.getServerSideProps((store) =>
    async (ctx) => {
        const endpoint = `/products/filter-brand/products-paginated/${ctx.query.url}`;
        await store.dispatch(startFilterPriducts(endpoint));
        await store.dispatch(startLoadCategories());
        await store.dispatch(startLoadTags())
        await store.dispatch(startLoadSubcategories())
        await store.dispatch(startLoadAdministrableLogo());
        await store.dispatch(startLoadFaqsCategories())
    })

export default Show;