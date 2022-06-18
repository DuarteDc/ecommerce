import { useRouter } from 'next/router';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';



import Layout from '../../../src/components/Layouts';
import Card from '../../../src/components/Layouts/Card';
import CategoriesList from '../../../src/components/categories/CategoriesList';


import { wrapper } from '../../../src/store';
import { startFilterProductsPerBrandAndCategory, startLoadProductsPerBrand, startloadProductsPerTagsInBrand } from '../../../src/actions/brandsActions';
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

const Show = () => {

    const router = useRouter();
    const { query } = router;
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const { brand, filteredProducts, results, BrandFilters } = useSelector((state) => state.brands);
    const { categories } = useSelector((state) => state.categories);
    const { categories: CategoriesFaqs } = useSelector((state) => state.faqs);
    const { tags } = useSelector((state) => state.tags);


    useEffect(() => {

        const getCurrentData = async () => {
            setLoading(true)
            if (Object.keys(router.query).length > 0) {
                if (router.query.hasOwnProperty('category_id')) {
                    const category = await categories.filter(category => category._id === router.query.category_id);
                    await dispatch(startFilterProductsPerBrandAndCategory(brand, ...category));
                }

                if (router.query.hasOwnProperty('tag_id')) {
                    const tag = await tags.filter(tag => tag._id === router.query.tag_id);
                    await dispatch(startloadProductsPerTagsInBrand(...tag));
                }
            }
            setLoading(false)
        }
        getCurrentData();

    }, [router.query, dispatch]);




    return (
        <Layout
            categories={CategoriesFaqs}
        >
            <BannerImage
                title={`${brand.name}`}
            />
            {loading && <LoadingScreen />}
            <section className="container mx-auto grid grid-cols-1 md:grid-cols-3 mt-20 lg:grid-cols-4">
                <AsideBar>
                    <BrandFilter url={brand.url} />
                    <CategoriesList categories={categories} setLoading={setLoading} brand={brand} />
                    <TagsList tags={tags} setLoading={setLoading} />
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
                            filteredProducts.length > 0 ? (
                                filteredProducts?.map(product => (
                                    <ProductCard key={product?._id} product={product} />
                                ))
                            ) : (
                                brand?.data?.map(product => (
                                    <ProductCard key={product?._id} product={product} />
                                ))
                            )
                        }
                    </div>
                </div>
            </section>
        </Layout >
    )
}

export const getServerSideProps = wrapper.getServerSideProps((store) =>
    async (ctx) => {
        await store.dispatch(startLoadProductsPerBrand(ctx.query.url));
        await store.dispatch(startLoadCategories());
        await store.dispatch(startLoadTags())
        await store.dispatch(startLoadAdministrableLogo());
        await store.dispatch(startLoadFaqsCategories())
    })

export default Show;