import { useSelector } from "react-redux";
import { startLoadAdministrableLogo } from "../../src/actions/administrableActions";
import { startLoadBrands } from "../../src/actions/brandsActions";
import { startLoadProductsPerCategory } from "../../src/actions/categoryActions";
import { startLoadTags } from "../../src/actions/tagsActions";
import Layout from "../../src/components/Layouts";
import Card from "../../src/components/Layouts/Card";
import { BannerImage, ProductCard } from "../../src/components/ui";

import { wrapper } from "../../src/store";

const Category = () => {

    const { category } = useSelector((state) => state.categories);
    const { brands } = useSelector((state) => state.brands);
    const { tags } = useSelector((state) => state.tags);

    return (
        <Layout>
            <div className="h-96 overflow-hidden hidden md:block">
                <BannerImage
                    title={`${category.name}`}
                />
            </div>
            <section className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:col-span-3">
                        {
                            category.data.map(product => (
                                <ProductCard
                                    product={product}
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