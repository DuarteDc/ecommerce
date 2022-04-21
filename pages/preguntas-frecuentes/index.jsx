import Link from "next/link"

import Layout from "../../src/components/Layouts"
import { BannerImage } from "../../src/components/ui"

import { wrapper } from "../../src/store"
import { useDispatch, useSelector } from "react-redux"

import { startLoadAdministrableLogo } from "../../src/actions/administrableActions"
import { startLoadFaqs, startLoadFaqsCategories, startLoadFaqsPerCategories } from "../../src/actions/faqsActions"
import FaqsList from "../../src/components/faqs/FaqsList"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { helpersProducts } from "../../src/helpers"
import LoadingScreen from "../../src/components/LoadingScreen"
import { BiCategoryAlt } from "react-icons/bi"
import { IconContext } from "react-icons";


const FAQS = () => {

    const { faqs, categories } = useSelector((state) => state.faqs);

    const { filterSearch } = helpersProducts;

    const [loading, setLoading] = useState(false);
    const [faqActive, setFaqActive] = useState();

    const router = useRouter();
    const dispatch = useDispatch();

    const getCurrentData = async () => {
        setLoading(true);
        setFaqActive(router.query.category_id);
        await dispatch(startLoadFaqsPerCategories(router.query.category_id));
        setLoading(false)
    }

    const getFaqsPerCategoryId = async (category_id) => {
        if (category_id !== router.query.category_id) {
            setLoading(true);
            setFaqActive(category_id);
            filterSearch({ router, category_id });
            await dispatch(startLoadFaqsPerCategories(category_id))
            setLoading(false);
        }
    }

    useEffect(() => {
        getCurrentData();
    }, [router.query]);

    return (
        <Layout
            title="Wapizima - Preguntas frecuentes"
            categories={categories}
        >
            <BannerImage
                title="Preguntas Frecuentes"
            />
            {loading && <LoadingScreen />}
            <section className=" max-w-[1490px] mx-auto my-20 px-4 min-h-screen">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    <div className="p-10 hidden md:block">
                        <p className="py-5 uppercase font-bold">Tabla de contenidos</p>
                        <ul>
                            {
                                categories.map(category => (
                                    <li
                                        className="flex items-center cursor-pointer"
                                        key={category._id}
                                        onClick={() => getFaqsPerCategoryId(category._id)}
                                    >
                                        <IconContext.Provider
                                            value={{ className: `text-[25px] text-[#888] ${category._id === faqActive ? "font-semibold text-black" : "text-gray-400"}` }}
                                        >
                                            <BiCategoryAlt />
                                        </IconContext.Provider>
                                        <a
                                            className={`text-lg my-4 
                                            ${category._id == faqActive ? "font-semibold text-black" : "text-gray-400 hover:text-[#222]"}`}>
                                            {category.name}
                                        </a>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <FaqsList faqs={faqs} />
                </div>
            </section>
        </Layout>
    )
}

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
    await store.dispatch(startLoadAdministrableLogo());
    await store.dispatch(startLoadFaqs());
    await store.dispatch(startLoadFaqsCategories());
    await store.dispatch(startLoadFaqsCategories());
    return {
        revalidate: 3600
    }
});

export default FAQS