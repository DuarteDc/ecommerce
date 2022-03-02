import { useSelector } from "react-redux";
import { wrapper } from "../../src/store";

import AsideBar from "../../src/components/categories/AsideBar";
import Card from "../../src/components/Layouts/Card";
import Layout from "../../src/components/Layouts";

import { startLoadProducts } from "../../src/actions/productsAction";
import { startLoadCategories } from "../../src/actions/categoryActions";
import { startLoadBrands } from "../../src/actions/brandsActions";

const Products = () => {

    const { products, productsfilter } = useSelector((state) => state.products);
    const { categories } = useSelector((state) => state.categories);
    const { brands } = useSelector((state) => state.brands);

    return (
        <Layout>
            <h1 className="text-center uppercase text-2xl bg-gray-50 py-3 mt-10 font-bold container mx-auto">Productos</h1>
            <section className="grid grid-cols-1 md:grid-cols-3 mt-20 lg:grid-cols-4">
                <div className="">
                    <AsideBar categories={categories} brands={brands} />
                </div>
                <div className="col-span-4 md:col-span-2 lg:col-span-3 -mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t-2 border-gray-200">
                        {productsfilter.length > 0 ?
                            productsfilter?.map((product, index) => (
                                <Card key={index} product={product} />
                            ))
                            :
                            products?.map((product) => (
                                <Card key={product._id} product={product} />
                            ))
                        }
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export const getServerSideProps = wrapper.getServerSideProps((store) =>
    async () => {
        await store.dispatch(startLoadProducts());
        await store.dispatch(startLoadCategories());
        await store.dispatch(startLoadBrands());
    })

export default Products;
