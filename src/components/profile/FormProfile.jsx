import LocationOnIcon from '@mui/icons-material/LocationOn';

import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PersonIcon from '@mui/icons-material/Person';
import { FormControl, TextField } from "@mui/material";
import * as Yup from 'yup';
import { useFormik } from 'formik';



const FormProfile = ({ fullname, email, phone, directions }) => {
    const initialValues = {
        actual_password: '',
        new_password: '',
        confirm_new_password: ''
    }
    const validationSchema = {
        actual_password: Yup.string().required("La contraseña es requerida"),
        new_password: Yup.string().min(8, 'La contraseña debe contener al menos 8 caracteres').required("La contraseña es requerida"),
        confirm_new_password: Yup.string().oneOf([Yup.ref('new_password'), null], "La contraseña no coincide")
    }

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object(validationSchema),
        onSubmit: (formData) => {
            console.table(formData);
        }
    });
    return (
        <>
            <p className="p-4 text-center font-bold uppercase">Detalles de perfil</p>
            <div className="mt-10 md:mt-0 px-6">
                <div className="my-2 flex items-center w-full">
                    <PersonIcon className="mr-2" />
                    <input
                        name="fullname"
                        onChange={formik.handleChange}
                        placeholder="Nombre completo"
                        type="text"
                        value={fullname}
                        className="py-4 bg-gray-50  focus:outline-none focus:border-black focus:ring-1 focus:ring-gray-900 px-5 w-full my-1"
                    />
                    {formik.touched.actual_password && formik.errors.actual_password ? (
                        <span className="text-red-500 text-sm">{formik.errors.actual_password}</span>
                    ) : null}
                </div>
                <div className="my-2 flex items-center w-full">
                    <EmailIcon className="mr-2" />
                    <input
                        name="fullname"
                        onChange={formik.handleChange}
                        placeholder="Nombre completo"
                        type="text"
                        value={email}
                        className="py-4 bg-gray-50  focus:outline-none focus:border-black focus:ring-1 focus:ring-gray-900 px-5 w-full my-1"
                    />
                    {formik.touched.actual_password && formik.errors.actual_password ? (
                        <span className="text-red-500 text-sm">{formik.errors.actual_password}</span>
                    ) : null}
                </div>
                <div className="my-2 flex items-center w-full">
                    <LocalPhoneIcon className="mr-2" />
                    <input
                        name="fullname"
                        onChange={formik.handleChange}
                        placeholder="Nombre completo"
                        type="text"
                        value={phone?._id}
                        className="py-4 bg-gray-50  focus:outline-none focus:border-black focus:ring-1 focus:ring-gray-900 px-5 w-full my-1"
                    />
                    {formik.touched.actual_password && formik.errors.actual_password ? (
                        <span className="text-red-500 text-sm">{formik.errors.actual_password}</span>
                    ) : null}
                </div>
                <button className="my-5 ml-8 hover:bg-black py-2 px-4 hover:text-white font-bold border-2 border-black transition-all duration-700 ease-in-out">
                    update Acount
                </button>
            </div>
        </>
    )
}

export default FormProfile