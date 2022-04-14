
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoadAdministrableLogo } from "../../src/actions/administrableActions";
import { startLoadBrands } from "../../src/actions/brandsActions";
import { startFilterProductsFromCategories, startFilterProductsPerBrandAndCategory, startLoadProductsPerCategory, startloadProductsPerTagsInCategory } from "../../src/actions/categoryActions";
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

const Category = () => {

    const { category, filteredProducts, results, categoryFilters } = useSelector((state) => state.categories);
    const { brands } = useSelector((state) => state.brands);
    const { tags } = useSelector((state) => state.tags);


    const { getQueryParams } = helpersProducts;

    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const dispatch = useDispatch();


    useEffect(() => {

        const getCurrentData = async () => {
            setLoading(true)
            if (Object.keys(router.query).length > 0) {
                if (router.query.hasOwnProperty('brand_id')) {
                    const brand = await brands.filter(brand => brand._id === router.query.brand_id);
                    await dispatch(startFilterProductsPerBrandAndCategory(...brand, category._id));
                }

                if (router.query.hasOwnProperty('tag_id')) {
                    const tag = await tags.filter(tag => tag._id === router.query.tag_id);
                    await dispatch(startloadProductsPerTagsInCategory(...tag));
                }
            }
            setLoading(false)
        }

        getCurrentData();


    }, [router.query])

    return (
        <Layout>
            <BannerImage
                title={`${category.name}`}
            />
            {loading && <LoadingScreen />}
            <section className="container mx-auto grid grid-cols-1 md:grid-cols-3 mt-20 lg:grid-cols-4">
                <AsideBar>
                    <CategoryFilters url={category.url} />
                    <BrandsList brands={brands} setLoading={setLoading} category={category} />
                    <TagsList tags={tags} setLoading={setLoading} />
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
                            filteredProducts.length > 0 ? (
                                filteredProducts.map((product, index) => (
                                    <ProductCard key={index} product={product} />
                                ))
                            ) : (
                                category.data.map(product => (
                                    <ProductCard
                                        product={product} key={product._id}
                                    />
                                ))
                            )
                        }
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export const getServerSideProps = wrapper.getServerSideProps((store) =>
    async (ctx) => {
        await store.dispatch(startLoadProductsPerCategory(ctx.query.url));
        await store.dispatch(startLoadBrands());
        await store.dispatch(startLoadTags())
        await store.dispatch(startLoadAdministrableLogo());
    })

export default Category;