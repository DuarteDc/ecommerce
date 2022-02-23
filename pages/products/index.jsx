import { useSelector } from "react-redux";
import { startLoadProducts } from "../../src/actions/productsAction";
import { startLoadCategories } from "../../src/actions/categoryActions";
import AsideBar from "../../src/components/categories/AsideBar";
import Card from "../../src/components/Layouts/Card";
import { wrapper } from "../../src/store";
import Layout from "../../src/components/Layouts";

const Products = () => {

    const { products } = useSelector((state) => state.products);
    const { categories } = useSelector((state) => state.categories);
    return (
        <Layout>
            <section className="grid grid-cols-1 md:grid-cols-3 mt-20 lg:grid-cols-4">
                <div className="hidden md:block">
                    <AsideBar categories={categories} />
                </div>
                <div className="col-span-4 md:col-span-2 lg:col-span-3 -mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t-2 border-gray-200">
                        {
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
        await store.dispatch(startLoadProducts())
        await store.dispatch(startLoadCategories())
    })

export default Products;