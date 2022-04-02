import Link from "next/link"

import Layout from "../../src/components/Layouts"
import { BannerImage } from "../../src/components/ui"

import { wrapper } from "../../src/store"
import { useSelector } from "react-redux"

import { startLoadAdministrableLogo } from "../../src/actions/administrableActions"
import { startLoadFaqs } from "../../src/actions/faqsActions"

import Collapse from '@mui/material/Collapse';


const FAQS = () => {

    const { faqs } = useSelector((state) => state.faqs);

    return (
        <Layout
            title="Wapizima - Preguntas frecuentes"
        >
            <BannerImage
                title="Preguntas Frecuentes"
            />
            <section className=" max-w-[1490px] mx-auto my-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    <div className="p-10">
                        <p className="py-5 uppercase font-bold">Tabla de contenidos</p>
                        <ul>
                            <li className="flex flex-col">
                                {
                                    faqs.map(faq => (
                                        <Link href={`/preguntas-frecuentes/#${faq._id}`} key={faq._id}>
                                            <a className=" my-4">{faq.question}</a>
                                        </Link>
                                    ))
                                }
                            </li>
                        </ul>
                    </div>
                    <div className="lg:col-span-2 my-10">
                        {
                            faqs.map(faq => (
                                <div className="my-4" key={faq._id}>
                                    <p className="py-2 font-bold text-xl" id={`${faq._id}`}>{faq.question}</p>
                                    <Collapse in={true} timeout="auto" unmountOnExit className="mb-10">
                                        <p className="">{faq.answer}</p>
                                    </Collapse>
                                    <hr />
                                </div>
                            ))
                        }
                    </div>
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