import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { startLoadAdministrableLogo } from '../../src/actions/administrableActions'
import { startLoadFaqsCategories } from '../../src/actions/faqsActions'
import Layout from '../../src/components/Layouts'
import { BannerImage, ProductCard } from '../../src/components/ui'
import { wrapper } from '../../src/store'
import { useLocalStorage } from '../../src/hooks/useLocalStorage'
import { searcProduct, startLoadProducts } from '../../src/actions/wishListActions';
import LoadingScreen from '../../src/components/LoadingScreen'
import Link from 'next/link'
import { useRouter } from 'next/router'

import SearchIcon from '@mui/icons-material/Search';

const Wishlist = () => {

    const router = useRouter();

    const { categories } = useSelector((state) => state.faqs);
    const { products, allProducts, wishList } = useSelector((state) => state.wishList);
    const { logo } = useSelector((state) => state.administrable);

    const [loading, setLoading] = useState(false);
    const [storedValue, setValue] = useLocalStorage('wishListProducts');

    const dispatch = useDispatch();

    const getProducts = async () => {
        setLoading(true);
        const { products } = await dispatch(startLoadProducts(storedValue));
        const wishList = products?.map(product => ({ product_id: product._id }));
        if (Array.isArray(wishList)) {
            setValue(wishList)
        }
        setLoading(false);
    }

    useEffect(() => {
        if (!storedValue) setValue([]);
        getProducts();
    }, [router]);

    const handleSeachProduct = (query) => {
        if (wishList.length) {
            let data = allProducts.filter((product) => {
                return product.name.toLowerCase().includes(query.toLowerCase())
            })
            if (data.length > 0) {
                dispatch(searcProduct(data));
            }
        }
    }

    const origin = typeof window === "undefined" ? "" : window.location.href;

    return (
        <Layout 
            title="Wapizima - Mi lista de deseos"
            categories={categories} 
            robots="index, follow"
            keywords={`Wapizima, Mi lista de deseos, Guarda tus articulos favoritos, productos}`}
            ogTitle="Wapizima - Mi lista de deseos"
            ogType="website"
            description="No has guardado nada todavía. No te preocupes ¡es muy sencillo! Para hacer tu selección más fácil, agrega productos a tu lista de favoritos dando clic en el corazón que está en la esquina inferior izquierda de cada uno de nuestros productos."
            ogUrl={origin}
            ogImage={logo}
            canonical={origin}
            >
            <BannerImage title="Mi lista de deseos" banner="bg-banner10"/>
            {loading && <LoadingScreen />}
            <section className="container mx-auto py-32 min-h-screen px-5 lg:px-0 font-Poppins">
                {
                    allProducts?.length > 0 && (
                        <div className="flex flex-row-reverse mb-10">
                            <div className="border-[1px] border-solid border-[#e6e6e6] rounded-sm flex items-center mb-6 w-full md:w-5/12">
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="Buscar"
                                    className="w-full h-12 font-Poppins text-[13px] leading-[1.6] text-[#333] pr-[30px] pl-[15px] outline-0"
                                    onChange={() => handleSeachProduct(event.target.value)}
                                />
                                <SearchIcon className = "text-[25px] text-[#888] w-[20%]"/>
                            </div>
                        </div>
                    )
                }
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {
                        allProducts.length > 0 ? (
                                products.map(product => (
                                    <ProductCard
                                        key={product._id}
                                        product={product}
                                    />
                                )))
                            : (
                                <div className="text-center col-span-full">
                                    <h4 className="text-2xl uppercase font-semibold mt-20 mb-10">Guarda tus articulos favoritos</h4>
                                    <p className="mb-16 px-5 lg:px-96">No has guardado nada todavía. No te preocupes ¡es muy sencillo! Para hacer tu selección más fácil, agrega productos a tu lista de favoritos dando clic en el corazón que está en la esquina inferior izquierda de cada uno de nuestros productos.</p>
                                    <Link href="/productos">
                                        <a className="bg-[#222] w-full text-white py-4 uppercase hover:bg-white hover:text-[#222] border-2 border-[#222] transition-all duration-700 ease-in-out px-10">Explorar ahora</a>
                                    </Link>
                                </div>
                            )
                    }
                </div>
            </section>
        </Layout >
    )
}


export const getStaticProps = wrapper.getStaticProps((store) =>
    async () => {
        await store.dispatch(startLoadAdministrableLogo());
        await store.dispatch(startLoadFaqsCategories());
        return {
            revalidate: 3600
        }
    })

export default Wishlist
