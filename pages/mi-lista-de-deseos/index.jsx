
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Image from 'next/image'

import { startLoadAdministrableLogo } from '../../src/actions/administrableActions'
import { startLoadFaqsCategories } from '../../src/actions/faqsActions'
import Layout from '../../src/components/Layouts'
import { BannerImage, ProductCard } from '../../src/components/ui'
import { wrapper } from '../../src/store'
import { useLocalStorage } from '../../src/hooks/useLocalStorage'
import { deleteProduct, startLoadProducts } from '../../src/actions/wishListActions'
import LoadingScreen from '../../src/components/LoadingScreen'
import { IconContext } from "react-icons";
import { BsSearch } from 'react-icons/bs'



const Wishlist = () => {

    const { categories } = useSelector((state) => state.faqs);
    const { products } = useSelector((state) => state.wishList);

    const [loading, setLoading] = useState(false);
    const [storedValue, setValue] = useLocalStorage('wishListProducts', '[]');

    const dispatch = useDispatch();

    const getProducts = async () => {
        setLoading(true);
        await dispatch(startLoadProducts(storedValue));
        setLoading(false);
    }

    useEffect(() => {
        getProducts();
    }, []);

    const deleteFromFavorites = (product_id) => {
        dispatch(deleteProduct(product_id));
        setValue(storedValue.filter(product => product.product_id !== product_id));
    }

    return (
        <Layout categories={categories}>
            <BannerImage title="Mi lista de deseos" />
            {loading && <LoadingScreen />}
            <section className="container mx-auto py-32 min-h-screen px-5 lg:px-0">
                <div className="flex flex-row-reverse">
                    <div className="border-[1px] border-solid border-[#e6e6e6] rounded-sm flex items-center mb-6 w-full md:w-5/12">
                        <input type="text" name="email" placeholder="Ingresa tu correo electronico" className="w-full h-12 font-Poppins text-[13px] leading-[1.6] text-[#333] pr-[30px] pl-[15px] outline-0" />
                        <IconContext.Provider
                            value={{ className: "text-[25px] text-[#888] w-[20%] " }}
                        >
                            <BsSearch />
                        </IconContext.Provider>
                    </div>
                </div>
                {

                    products.map(product => (
                        <div
                            className="flex flex-col lg:flex-row justify-between lg:px-28 border-y-2 lg:items-center lg:py-3 py-2"
                            key={product._id}>
                            <div>
                                <img
                                    // src={product.multimedia[0].path}
                                    src="https://bolster-vue.envytheme.com/_nuxt/img/category-products-img7.7fb1093.jpg"
                                    alt={product.name}
                                    className="w-full md:w-2/3"
                                // layout="fill"
                                />
                            </div>
                            <div className="lg:px-10 lg:w-2/3">
                                <p className="text-xl font-bold my-1">{product.name}</p>
                                <p className="text-black font-bold text-lg">{product.description}</p>
                                <p className="font-semibold text-lg">${product.price}</p>
                            </div>
                            <div className="w-full lg:w-2/4 flex flex-col lg:flex-row items-center">
                                <button className="bg-[#222] text-white px-5 py-2 mx-1 w-full my-1">
                                    Agregar al carrito
                                </button>
                                <button className="bg-[#222] text-white px-5 py-2 mx-1 my-1"
                                    onClick={() => deleteFromFavorites(product._id)}>
                                    Eliminar
                                </button>
                            </div>
                        </div>

                    )
                    )
                }
            </section>
        </Layout >
    )
}


export const getServerSideProps = wrapper.getServerSideProps((store) =>
    async () => {
        await store.dispatch(startLoadAdministrableLogo());
        await store.dispatch(startLoadFaqsCategories());
    })

export default Wishlist