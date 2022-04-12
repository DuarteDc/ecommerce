
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoadAdministrableLogo } from "../../src/actions/administrableActions";
import { startLoadBrands } from "../../src/actions/brandsActions";
import { startFilterProductsFromCategories, startLoadProductsPerCategory } from "../../src/actions/categoryActions";
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

const Category = () => {

    const { category } = useSelector((state) => state.categories);
    const { brands } = useSelector((state) => state.brands);
    const { tags } = useSelector((state) => state.tags);


    const { getQueryParams } = helpersProducts;

    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const dispatch = useDispatch();


    useEffect(() => {
        const params = getQueryParams(router.asPath);
        const getCurrentData = async () => {
            await dispatch(startFilterProductsFromCategories(params))
        }
        getCurrentData();
    }, [router.query])

    return (
        <Layout>
            <div className="h-96 overflow-hidden hidden md:block">
                <BannerImage
                    title={`${category.name}`}
                />
                {loading && <LoadingScreen />}
            </div>
            <section className="container mx-auto grid grid-cols-1 md:grid-cols-3 mt-20 lg:grid-cols-4">
                <AsideBar>
                    <BrandsList brands={brands} setLoading={setLoading} />
                    <TagsList tags={tags} setLoading={setLoading} />
                </AsideBar>
                <div className="col-span-4 md:col-span-2 lg:col-span-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:col-span-3">
                        {
                            category.data.map(product => (
                                <ProductCard
                                    product={product} key={product._id}
                                />
                            ))
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