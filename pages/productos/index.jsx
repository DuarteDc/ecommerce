import { useSelector, useDispatch } from "react-redux";
import { wrapper } from "../../src/store";

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import AsideBar from "../../src/components/categories/AsideBar";
import Card from "../../src/components/Layouts/Card";
import Layout from "../../src/components/Layouts";

import { startLoadProductPerPagination, startLoadProducts } from "../../src/actions/productsAction";
import { startLoadCategories } from "../../src/actions/categoryActions";
import { startLoadBrands } from "../../src/actions/brandsActions";
import { useRouter } from "next/router";
import { startLoadAdministrableLogo } from "../../src/actions/administrableActions";
import { BannerImage } from "../../src/components/ui/bannerImage";
import { ProductCard } from "../../src/components/ui";

const Products = () => {

    const { products, filteredProducts } = useSelector((state) => state.products);
    const { categories } = useSelector((state) => state.categories);
    const { brands } = useSelector((state) => state.brands);

    const dispatch = useDispatch();

    const handelClickPage = (e, value) => {
        dispatch(startLoadProductPerPagination(value));
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    return (
        <Layout 
           title="Wapizima - Productos"
           robots="noindex"
        >
            <BannerImage
               title="Productos"
            />
            <section className="grid grid-cols-1 md:grid-cols-3 mt-20 lg:grid-cols-4">
                <div>
                    <AsideBar categories={categories} brands={brands} />
                </div>
                <div className="col-span-4 md:col-span-2 lg:col-span-3 -mt-6">
                    <p className="text-right text-sm text-gray-500 px-10">
                        {products.totalDocs === 1 ? `${products?.totalDocs} Arcticulo` : `${products?.totalDocs} Acticulos`}
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {
                            filteredProducts.length > 0 ? (
                                filteredProducts.map((product, index) => (
                                    <ProductCard key={product_id} product={product} />
                                ))
                            ) : (
                                products.products?.map((product) => (
                                    <ProductCard key={product._id} product={product} />
                                ))
                            )
                        }
                    </div>
                    {
                        !filteredProducts.length > 0 && (
                            <div className="px-10">
                                <Stack spacing={2}>
                                    <Pagination
                                        count={products.totalPages}
                                        variant="outlined"
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
    async () => {
        await store.dispatch(startLoadProducts());
        await store.dispatch(startLoadCategories());
        await store.dispatch(startLoadBrands());
        await store.dispatch(startLoadAdministrableLogo());

    })

export default Products;
