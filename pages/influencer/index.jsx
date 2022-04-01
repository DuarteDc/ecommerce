import Layout from "../../src/components/Layouts"
import { wrapper } from "../../src/store";
import { startLoadAdministrableLogo } from "../../src/actions/administrableActions";
import { BannerImage } from "../../src/components/ui/bannerImage";
import { IconContext } from "react-icons";
import { MdOutlineMailOutline } from "react-icons/md";
import { BsInstagram, BsTwitter, BsFacebook, BsYoutube, BsPerson } from "react-icons/bs";
import { FaTiktok } from "react-icons/fa";

import * as Yup from 'yup';
import { useFormik } from 'formik';
import { saveDataInfluencer } from "../../src/actions/influencerActions";
import { errorNotify, successNotify } from "../../src/helpers/helpers";

const Influencer = () => {

    const handleSaveData = async (formData) => {

        const { hasError, message } = await saveDataInfluencer(formData);
        if (hasError) {
            errorNotify(message);
            return;
        }
        successNotify(message);
    }

    const initialValues = {
        fullname: '',
        email: '',
        facebook: '',
        instagram: '',
        tiktok: '',
    }

    const validationSchema = {
        fullname: Yup.string().required("La nombre es requerido").min(8, "EL nombre debde tener al menos 8 caracteres"),
        email: Yup.string().email(true, "El correo no tiene un formato valido").required("El correo es requerido"),
        facebook: Yup.string().required("El correo es requerido"),
        instagram: Yup.string().required("El correo es requerido"),
        tiktok: Yup.string().required("El correo es requerido"),
    }

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object(validationSchema),
        onSubmit: (formData) => {
            handleSaveData(formData);
        }
    });


    return (
        <Layout>
            <BannerImage
                title="Convierte en nuestro socio"
            />
            <section className=" max-w-[1490px] mx-auto my-20 h-4/5 mb-80 mt-40">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="text-justify">
                        <h1 className="text-2xl font-bold my-5 text-4xl uppercase mb-10">¿Quieres formar parte de la comunidad influerncer?</h1>
                        <p className="text-lg mb-5">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum, laudantium, eaque facere totam odit officia ex iusto enim sed aut hic quidem provident, autem natus corporis. Odio accusantium facere iste, mollitia quod animi, ex quidem quam minus, eius corporis. Dolorum fugiat aperiam cupiditate accusantium quod eos reprehenderit ut dolorem. Odit nemo
                        </p>
                        <p className="text-lg ">
                            enim sed quisquam unde nostrum dolorum debitis cupiditate provident optio sunt natus reiciendis voluptatem, illum eos vero esse doloribus! Voluptas eveniet maiores beatae sapiente, ratione fugiat veniam voluptatum placeat quasi dolorem necessitatibus molestias, officiis ipsa optio amet vero voluptatem? Molestias praesentium rerum sapiente voluptatum repellendus dolorem reprehenderit ut aliquam?
                        </p>
                    </div>
                    <div className="lg:col-span-2 lg:pl-20">
                        <form onSubmit={formik.handleSubmit}>
                            <h2 className="text-center text-2xl my-10">Ingresa tus datos aquí</h2>
                            <div className="border-[1px] border-solid border-[#e6e6e6] rounded-sm flex items-center mb-10">
                                <IconContext.Provider
                                    value={{ className: "text-[25px] text-[#888] w-[15%] " }}
                                >
                                    <BsPerson />
                                </IconContext.Provider>
                                <input type="text" name="fullname" onChange={formik.handleChange} placeholder="Ingresa tu nombre completo" className="w-full h-12 font-Poppins text-[13px] leading-[1.6] text-[#333] pr-[30px] pl-[5px] outline-0" />
                            </div>
                            <div className="border-[1px] border-solid border-[#e6e6e6] rounded-sm flex items-center mb-10">
                                <IconContext.Provider
                                    value={{ className: "text-[25px] text-[#888] w-[15%] " }}
                                >
                                    <MdOutlineMailOutline />
                                </IconContext.Provider>
                                <input type="email" name="email" onChange={formik.handleChange} placeholder="Ingresa tu enlace de facebook" className="w-full h-12 font-Poppins text-[13px] leading-[1.6] text-[#333] pr-[30px] pl-[5px] outline-0" />
                            </div>
                            <div className="border-[1px] border-solid border-[#e6e6e6] rounded-sm flex items-center mb-10">
                                <IconContext.Provider
                                    value={{ className: "text-[25px] text-[#888] w-[15%] " }}
                                >
                                    <BsFacebook />
                                </IconContext.Provider>
                                <input type="url" name="facebook" onChange={formik.handleChange} placeholder="Ingresa tu enlace de instagram" className="w-full h-12 font-Poppins text-[13px] leading-[1.6] text-[#333] pr-[30px] pl-[5px] outline-0" />
                            </div>
                            <div className="border-[1px] border-solid border-[#e6e6e6] rounded-sm flex items-center mb-10">
                                <IconContext.Provider
                                    value={{ className: "text-[25px] text-[#888] w-[15%] " }}
                                >
                                    <BsInstagram />
                                </IconContext.Provider>
                                <input type="url" name="instagram" onChange={formik.handleChange} placeholder="Ingresa tu enlace de tiktok" className="w-full h-12 font-Poppins text-[13px] leading-[1.6] text-[#333] pr-[30px] pl-[5px] outline-0" />
                            </div>
                            <div className="border-[1px] border-solid border-[#e6e6e6] rounded-sm flex items-center mb-10">
                                <IconContext.Provider
                                    value={{ className: "text-[25px] text-[#888] w-[15%] " }}
                                >
                                    <FaTiktok />
                                </IconContext.Provider>
                                <input type="url" name="tiktok" onChange={formik.handleChange} placeholder="Ingresa tu correo electronico" className="w-full h-12 font-Poppins text-[13px] leading-[1.6] text-[#333] pr-[30px] pl-[5px] outline-0" />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-[#222] py-4 border-2 boder-bg-[#222] text-white font-bold hover:bg-transparent hover:text-black">
                                Enviar
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </Layout>
    )
}


export const getStaticProps = wrapper.getStaticProps((store) => async () => {
    await store.dispatch(startLoadAdministrableLogo());
    return {
        revalidate: 3600
    }
});

export default Influencer