import { useRouter } from 'next/router';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';



import Layout from '../../src/components/Layouts';
import Card from '../../src/components/Layouts/Card';
import CategoriesList from '../../src/components/categories/CategoriesList';


import { wrapper } from '../../src/store';
import { startFilterProductsPerBrandAndCategory, startLoadProductsPerBrand } from '../../src/actions/brandsActions';
import { startLoadCategories } from '../../src/actions/categoryActions';

import { startLoadAdministrableLogo } from '../../src/actions/administrableActions';
import { BannerImage } from '../../src/components/ui';

import { startLoadTags } from '../../src/actions/tagsActions';
import { useEffect, useState } from 'react';

import AsideBar from '../../src/components/categories/AsideBar';


import LoadingScreen from '../../src/components/LoadingScreen';
import { useLocalStorage } from '../../src/hooks/useLocalStorage';

const Show = () => {

    const router = useRouter();
    const { query } = router;
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const { brand, filteredProducts, resultsBrand, filtersBrand } = useSelector((state) => state.brands);

    const { categories } = useSelector((state) => state.categories);

    const [storedValue, setValue,] = useLocalStorage('filtersInProducts');

    useEffect(() => {

        if (Object.keys(router.query).length !== 0) {
            setValue(router.asPath)
            return;
        }

        localStorage.removeItem('filtersInBrands')

    }, [router.asPath]);


    useEffect(() => {

        const getCurrentData = async () => {
            setLoading(true)
            if (router.asPath === storedValue && Object.keys(router.query).length !== 0) {

                if (router.query.hasOwnProperty('category_id')) {
                    const category = await categories.filter(category => category._id === router.query.category_id);
                    await dispatch(startFilterProductsPerBrandAndCategory(brand._id, ...category));
                }

            }
            setLoading(false)
        }

        getCurrentData();

    }, [router.query]);




    return (
        <Layout>
            <div className="h-96 overflow-hidden hidden md:block">
                <BannerImage
                    title={`${brand.name}`}
                />
            </div>
            {loading && <LoadingScreen />}
            <section className="container mx-auto grid grid-cols-1 md:grid-cols-3 mt-20 lg:grid-cols-4">
                <AsideBar>
                    <CategoriesList categories={categories} setLoading={setLoading} brand={brand} />
                </AsideBar>
                <div className="col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-60">
                    {
                        filteredProducts.length > 0 ? (
                            filteredProducts?.map(product => (
                                <Card key={product?._id} product={product} />
                            ))
                        ) : (
                            brand?.data?.map(product => (
                                <Card key={product?._id} product={product} />
                            ))
                        )
                    }
                </div>
            </section>
        </Layout >
    )
}

export const getServerSideProps = wrapper.getServerSideProps((store) =>
    async (ctx) => {
        await store.dispatch(startLoadProductsPerBrand(ctx.query.url));
        await store.dispatch(startLoadCategories());
        await store.dispatch(startLoadAdministrableLogo());

    })

export default Show;