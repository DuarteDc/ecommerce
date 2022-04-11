import Link from "next/link"

import Layout from "../../src/components/Layouts"
import { BannerImage } from "../../src/components/ui"

import { wrapper } from "../../src/store"
import { useSelector } from "react-redux"

import { startLoadAdministrableLogo } from "../../src/actions/administrableActions"
import { startLoadFaqs } from "../../src/actions/faqsActions"
import FaqsList from "../../src/components/faqs/FaqsList"
import { useState } from "react"


const FAQS = () => {

    const { faqs } = useSelector((state) => state.faqs);

    const [isActive, setIsActive] = useState(false);

    return (
        <Layout
            title="Wapizima - Preguntas frecuentes"
        >
            <BannerImage
                title="Preguntas Frecuentes"
            />
            <section className=" max-w-[1490px] mx-auto my-20 px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    <div className="p-10 hidden md:block">
                        <p className="py-5 uppercase font-bold">Tabla de contenidos</p>
                        <ul>
                            <li className="flex flex-col">
                                {
                                    faqs.map(faq => (
                                        <Link href={`/preguntas-frecuentes/#${faq._id}`} key={faq._id}>
                                            <a className="text-lg my-4 text-gray-400 hover:text-[#222]">{faq.question}</a>
                                        </Link>
                                    ))
                                }
                            </li>
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
    return {
        revalidate: 3600
    }
});

export default FAQS