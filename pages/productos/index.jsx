import { useSelector, useDispatch } from "react-redux";
import { wrapper } from "../../src/store";

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import AsideBar from "../../src/components/categories/AsideBar";
import Layout from "../../src/components/Layouts";

import { startLoadProductPerPagination, startLoadProducts, startLoadProductsPerBrand, startLoadProductsPerCategory, startloadProductsPerTags } from "../../src/actions/productsAction";
import { startLoadCategories } from "../../src/actions/categoryActions";
import { startLoadBrands } from "../../src/actions/brandsActions";
import { startLoadTags } from "../../src/actions/tagsActions";
import { useRouter } from "next/router";
import { startLoadAdministrableLogo } from "../../src/actions/administrableActions";
import { BannerImage } from "../../src/components/ui/bannerImage";
import { ProductCard } from "../../src/components/ui";

import { useEffect, useState } from "react";
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import CategoriesList from "../../src/components/categories/CategoriesList";
import BrandsList from "../../src/components/brands/BrandsList";
import TagsList from "../../src/components/tags/TagsList";
import LoadingScreen from "../../src/components/LoadingScreen";
import Filters from "../../src/components/products/Filters";
import { startLoadFaqsCategories } from "../../src/actions/faqsActions";
import { getStateAuth, startVerifyToken } from "../../src/actions/authActions";
import { shoppingCartNotLoggedfromLocalStorage } from "../../src/actions/shoppingCartActions";


const Products = () => {

    const dispatch = useDispatch();

    const { products, filteredProducts, results, filters } = useSelector((state) => state.products);
    const { logged } = useSelector((state) => state.auth);
    const { brands } = useSelector((state) => state.brands);
    const { categories } = useSelector((state) => state.categories);
    const { categories: CategoriesFaqs } = useSelector((state) => state.faqs);
    const { tags } = useSelector((state) => state.tags);

    useEffect(() => {
        if (!logged) {
            let cartNotLogged = localStorage.getItem('cartNotlogged') ? JSON.parse(localStorage.getItem('cartNotlogged')) : [];
            dispatch(shoppingCartNotLoggedfromLocalStorage(cartNotLogged))
        }
    }, [logged]);

    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const handelClickPage = (e, value) => {
        dispatch(startLoadProductPerPagination(value));
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    useEffect(() => {

        const getCurrentData = async () => {
            setLoading(true)
            if (Object.keys(router.query).length > 0) {
                if (router.query.hasOwnProperty('brand_id')) {
                    const brand = await brands.filter(brand => brand._id === router.query.brand_id);
                    await dispatch(startLoadProductsPerBrand(...brand));
                }

                if (router.query.hasOwnProperty('category_id')) {
                    const category = await categories.filter(category => category._id === router.query.category_id);
                    await dispatch(startLoadProductsPerCategory(...category));
                }

                if (router.query.hasOwnProperty('tag_id')) {
                    const tag = await tags.filter(tag => tag._id === router.query.tag_id);
                    await dispatch(startloadProductsPerTags(...tag));
                }
            }
            setLoading(false)
        }

        getCurrentData();

    }, [router.query]);

    return (
        <Layout
            title="Wapizima - Productos"
            robots="noindex"
            categories={CategoriesFaqs}
        >
            <BannerImage
                title="Productos"
            />
            {loading && <LoadingScreen />}
            <section className="container mx-auto grid grid-cols-1 md:grid-cols-3 mt-20 lg:grid-cols-4">
                <AsideBar>
                    <Filters />
                    <BrandsList brands={brands} setLoading={setLoading} />
                    <CategoriesList categories={categories} setLoading={setLoading} />
                    <TagsList tags={tags} setLoading={setLoading} />
                </AsideBar>
                <div className="col-span-4 md:col-span-2 lg:col-span-3">
                    {
                        Object.keys(filters).length !== 0 && (
                            <p className="text-gray-500 px-2 text-xl text-right">
                                {results.quantity} {results.quantity > 1 ? 'resultados' : 'resultado'}  sobre {results.name}
                            </p>
                        )
                    }
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-20 mt-10">
                        {
                            filteredProducts.length > 0 ? (
                                filteredProducts.map((product, index) => (
                                    <ProductCard key={index} product={product} />
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
                            <div className="flex justify-center my-10">
                                <Stack spacing={2}>
                                    <Pagination
                                        count={products.totalPages}
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
        await store.dispatch(startLoadProducts());
        await store.dispatch(startLoadCategories());
        await store.dispatch(startLoadBrands());
        await store.dispatch(startLoadTags());
        await store.dispatch(startLoadAdministrableLogo());
        await store.dispatch(startLoadFaqsCategories());
    })

export default Products;

