import { IconContext } from "react-icons";
import { MdOutlineMailOutline } from "react-icons/md";
import { BsInstagram, BsTwitter, BsFacebook, BsYoutube, BsPerson } from "react-icons/bs";
import { FaTiktok } from "react-icons/fa";

import * as Yup from 'yup';
import { useFormik } from 'formik';
import { saveDataInfluencer } from "../../../src/actions/influencerActions";
import { errorNotify, successNotify } from "../../../src/helpers/helpers";

const FormInfluencer = () => {

    const handleSaveData = async (formData, resetForm) => {

        const { hasError, message } = await saveDataInfluencer(formData);
        if (hasError) {
            errorNotify(message);
            return;
        }
        successNotify(message);
        resetForm({ values: initialValues })
    }

    const initialValues = {
        fullname: '',
        email: '',
        facebook: '',
        instagram: '',
        tiktok: '',
    }

    const facebookRegex = RegExp(
        /http(?:s):\/\/(?:www\.)facebook\.com\/.+/i
    );

    const instagramRegex = RegExp(
        /http(?:s):\/\/(?:www\.)instagram\.com\/.+/i
    );

    const tiktokRegex = RegExp(
        /http(?:s):\/\/(?:www\.)tiktok\.com\/.+|http(?:s):\/\/(?:vm\.)tiktok\.com\/.+/i
    );

    const validationSchema = {
        fullname: Yup.string().required("La nombre es requerido").min(8, "EL nombre debde tener al menos 8 caracteres"),
        email: Yup.string().email(true, "El correo no tiene un formato valido").required("El correo es requerido"),
        facebook: Yup.string().required("El link de facebook es requerido").matches(facebookRegex, "Error: el link de facebook no valido"),
        instagram: Yup.string().required("El link de instagram es requerido").matches(instagramRegex, "Error: el link de instagram no valido"),
        tiktok: Yup.string().required("El link de tiktok es requerido").matches(tiktokRegex, "Error: el link de tiktok no valido"),
    }

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object(validationSchema),
        onSubmit: (formData, { resetForm }) => {
            handleSaveData(formData, resetForm);
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <h2 className="font-Poppins text-[25px] uppercase font-lg  text-[#222] text-center font-semibold mb-10">Ingresa tus datos</h2>
            <div className="mb-8">
                <div className="border-[1px] border-solid border-[#e6e6e6] rounded-sm flex items-center">
                    <IconContext.Provider
                        value={{ className: "text-[25px] text-[#888] w-[15%] " }}
                    >
                        <BsPerson />
                    </IconContext.Provider>
                    <input type="text" name="fullname" onChange={formik.handleChange} value={formik.values.fullname} placeholder="Ingresa tu nombre completo" className="w-full h-12 font-Poppins text-[13px] leading-[1.6] text-[#333] pr-[30px] pl-[5px] outline-0" />
                </div>
                {formik.touched.fullname && formik.errors.fullname ? (
                    <p className="text-red-500 text-sm">{formik.errors.fullname}</p>
                ) : null}
            </div>
            <div className="mb-8">
                <div className="border-[1px] border-solid border-[#e6e6e6] rounded-sm flex items-center">
                    <IconContext.Provider
                        value={{ className: "text-[25px] text-[#888] w-[15%] " }}
                    >
                        <MdOutlineMailOutline />
                    </IconContext.Provider>
                    <input type="email" name="email" onChange={formik.handleChange} value={formik.values.email} placeholder="Ingresa tu enlace de facebook" className="w-full h-12 font-Poppins text-[13px] leading-[1.6] text-[#333] pr-[30px] pl-[5px] outline-0" />
                </div>
                {formik.touched.email && formik.errors.email ? (
                    <p className="text-red-500 text-sm">{formik.errors.email}</p>
                ) : null}
            </div>
            <div className="mb-8">
                <div className="border-[1px] border-solid border-[#e6e6e6] rounded-sm flex items-center">
                    <IconContext.Provider
                        value={{ className: "text-[25px] text-[#888] w-[15%] " }}
                    >
                        <BsFacebook />
                    </IconContext.Provider>
                    <input type="texy" name="facebook" onChange={formik.handleChange} value={formik.values.facebook} placeholder="Ingresa tu enlace de facebook" className="w-full h-12 font-Poppins text-[13px] leading-[1.6] text-[#333] pr-[30px] pl-[5px] outline-0" />
                </div>
                {formik.touched.facebook && formik.errors.facebook ? (
                    <p className="text-red-500 text-sm">{formik.errors.facebook}</p>
                ) : null}
            </div>
            <div className="mb-8">
                <div className="border-[1px] border-solid border-[#e6e6e6] rounded-sm flex items-center">
                    <IconContext.Provider
                        value={{ className: "text-[25px] text-[#888] w-[15%] " }}
                    >
                        <BsInstagram />
                    </IconContext.Provider>
                    <input type="text" name="instagram" onChange={formik.handleChange} value={formik.values.instagram} placeholder="Ingresa tu enlace de instagram" className="w-full h-12 font-Poppins text-[13px] leading-[1.6] text-[#333] pr-[30px] pl-[5px] outline-0" />
                </div>
                {formik.touched.instagram && formik.errors.instagram ? (
                    <p className="text-red-500 text-sm">{formik.errors.instagram}</p>
                ) : null}
            </div>
            <div className="mb-8">
                <div className="border-[1px] border-solid border-[#e6e6e6] rounded-sm flex items-center">
                    <IconContext.Provider
                        value={{ className: "text-[25px] text-[#888] w-[15%] " }}
                    >
                        <FaTiktok />
                    </IconContext.Provider>
                    <input type="text" name="tiktok" onChange={formik.handleChange} value={formik.values.tiktok} placeholder="Ingresa tu enlace de tiktok" className="w-full h-12 font-Poppins text-[13px] leading-[1.6] text-[#333] pr-[30px] pl-[5px] outline-0" />
                </div>
                {formik.touched.tiktok && formik.errors.tiktok ? (
                    <p className="text-red-500 text-sm">{formik.errors.tiktok}</p>
                ) : null}
            </div>
            <button
                type="submit"
                className="w-full bg-[#222] py-4 border-2 boder-bg-[#222] text-white font-bold hover:bg-transparent hover:text-black">
                Enviar
            </button>
        </form>
    )
}

export default FormInfluencer