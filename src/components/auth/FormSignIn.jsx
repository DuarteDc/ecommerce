import { useState } from "react";
import { useFormik } from "formik";
import Link from "next/link";

import { useDispatch } from "react-redux";
import * as Yup from 'yup';
import { startLoginEmailPassword } from "../../actions/authActions";
import errorHandler from "../../actions/errorHandler";
import { useRouter } from "next/router";


export const FormSignIn = () => {
    const router = useRouter()
    const dispatch = useDispatch();
    const [errors, setErrors] = useState("");
    const initialValues = {
        email: '',
        password: ''
    }
    const validationSchema = {
        email: Yup.string().email(true).required("El correo es requerido"),
        password: Yup.string().min(8, 'La contraseña debe contener al menos 8 caracteres').required("La contraseña es requerida")
    }

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object(validationSchema),
        onSubmit: (formData) => {
            dispatch(startLoginEmailPassword(formData));
            router.push('/')
        }
    });

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <div className="pb-3">
                    <label className="uppercase my-5 block">Correo electronico</label>
                    <input
                        name="email"
                        onChange={formik.handleChange}
                        placeholder="Correo electronico"
                        type="email"
                        className="py-4 bg-gray-50  focus:outline-none focus:border-black focus:ring-1 focus:ring-gray-900 px-5 w-full mb-2"
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <span className="text-red-500">{formik.errors.email}</span>
                    ) : null}

                </div>
                <div className="pb-3">
                    <label className="uppercase my-5 w-full block">Contraseña</label>
                    <input
                        name="password"
                        onChange={formik.handleChange}
                        placeholder="Contraseña"
                        type="password"
                        className="py-4 bg-gray-50  focus:outline-none focus:border-black focus:ring-1 focus:ring-gray-900 px-5 w-full mb-2"
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <span className="text-red-500">{formik.errors.password}</span>
                    ) : null}
                </div>

                <div className="text-right text-gray-500 text-sm font-semibold my-3">
                    <Link href='/Auth/PassFV'>
                        <a className="hover:text-black transition-all duration-700 ease-out">¿Has olvidado la contraseña?</a>
                    </Link>
                </div>
                <div>
                    <button className="bg-black w-full text-white py-4 uppercase hover:bg-white border-2 border-black hover:text-black transition-all duration-700 ease-in-out"
                        type="submit"
                    >
                        Iniciar Sesion
                    </button>
                </div>
            </form>
        </>
    );
}