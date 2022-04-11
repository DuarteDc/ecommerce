import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { wrapper } from "../../src/store";

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import AsideBar from "../../src/components/categories/AsideBar";
import Layout from "../../src/components/Layouts";

import { startLoadProductPerPagination, startLoadProducts, startLoadProductsPerBrand, startLoadProductsPerCategory } from "../../src/actions/productsAction";
import { startLoadCategories } from "../../src/actions/categoryActions";
import { startLoadBrands } from "../../src/actions/brandsActions";
import { useRouter } from "next/router";
import { startLoadAdministrableLogo } from "../../src/actions/administrableActions";
import { BannerImage } from "../../src/components/ui/bannerImage";
import { ProductCard } from "../../src/components/ui";
import { addShoppingCartFromLocalStorage , shoppingCartNotLoggedfromLocalStorage  } from "../../src/actions/shoppingCartActions";
import { useLocalStorage } from "../../src/hooks/useLocalStorage";

const Products = () => {

    const { products, filteredProducts } = useSelector((state) => state.products);
    const { brands } = useSelector((state) => state.brands);
    const { logged } = useSelector((state)=>state.auth);
    const { categories } = useSelector((state) => state.categories);

    const dispatch = useDispatch();
    const router = useRouter();
    const handelClickPage = (e, value) => {
        dispatch(startLoadProductPerPagination(value));
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    const [storedValue, setValue,] = useLocalStorage('filtersInProducts');

    useEffect(() => {
        if (Object.keys(router.query).length !== 0) {
            setValue(router.asPath)
        } else {
            localStorage.removeItem('filtersInProducts')
        }
    }, [router.query]);

    useEffect(() => {
        if (!logged){
        let cartNotLogged =  localStorage.getItem('cartNotlogged') ? JSON.parse(localStorage.getItem('cartNotlogged')) : [];
          dispatch(shoppingCartNotLoggedfromLocalStorage(cartNotLogged))
        }
      }, [logged]);

        useEffect(() => {
            if (logged){
            const shoppingCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
            dispatch(addShoppingCartFromLocalStorage(shoppingCart))
            }
        }, [logged]);

    const getCurrentData = async () => {
        if (router.asPath === storedValue && Object.keys(router.query).length !== 0) {
            if (router.query.hasOwnProperty('brand')) {
                const brand = await brands.filter(brandSelected => brandSelected._id === router.query.brand);
                await dispatch(startLoadProductsPerBrand(...brand));
            }
            if (router.query.hasOwnProperty('category')) {
                const category = await categories.filter(categorySelected => categorySelected._id === router.query.category);
                await dispatch(startLoadProductsPerCategory(category[0]._id, category[0].name));
            }
        }
    }

    useEffect(() => {
        getCurrentData();
    }, [router.query])


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
                            <div className="px-10 my-10">
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

export const getStaticProps = wrapper.getStaticProps((store) =>
    async () => {
        await store.dispatch(startLoadProducts());
        await store.dispatch(startLoadCategories());
        await store.dispatch(startLoadBrands());
        await store.dispatch(startLoadAdministrableLogo());
        
        return {
            revalidate:3600
        }

    })

export default Products;
