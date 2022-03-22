import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import * as Yup from 'yup';
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import { startRegister } from "../../actions/authActions";

const FormSignUp = () => {

    const [error, setError] = useState(false);
    const [messageError, setMessageError] = useState('');

    const router = useRouter();
    const dispatch = useDispatch();

    const handelRegisterUser = async (formData) => {

        const { hasError, message } = await dispatch(startRegister(formData));

        if (hasError) {
            setError(true);
            setMessageError(message || '');
            setTimeout(() => setError(false), 4000);
            return;
        }

        const destination = router.query.p?.toString() || '';
        router.replace(destination);router.replace('/');
    }

    const initialValues = {
        fullname: '',
        email: '',
        password: ''
    }
    
    const validationSchema = {
        fullname: Yup.string().min(8, "El nombre debe contener al menos 8 caracteres").required("El nombre es requerido"),
        email: Yup.string().email("El correo no tiene un valido").required("El correo escrequerido"),
        password: Yup.string().min(8, "La contraseña debe contener al menos 8 caracteres").required("La contraseña es requerida")
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object(validationSchema),
        onSubmit: (formData) => {
            handelRegisterUser(formData);
        }
    });

    return (
        <form onSubmit={formik.handleSubmit} className="w-full">
            {
                error && (
                    <div
                        className="my-5 py-4 flex justify-center bg-red-600 text-white font-bold animate__animated animate__fadeIn">
                        <ErrorOutlineIcon className="mr-2" />
                        <p>{messageError}</p>
                    </div>
                )
            }
            <div className="w-10/12 mx-auto mt-20">
                <div className="">
                    <label className="uppercase my-5 block">Nombre(s)</label>
                    <input
                        onChange={formik.handleChange}
                        name="fullname"
                        className="py-4 bg-gray-50  focus:outline-none focus:border-black focus:ring-1 focus:ring-gray-900 px-5 w-full"
                        autoComplete="off"
                    />
                    {formik.touched.fullname && formik.errors.fullname ? (
                        <span className="text-red-500 text-sm">{formik.errors.fullname}</span>
                    ) : null}
                </div>
                <div className="">
                    <label className="uppercase my-5 block">Correo Electronico</label>
                    <input
                        onChange={formik.handleChange}
                        label="Correo electronico"
                        name="email"
                        className="py-4 bg-gray-50  focus:outline-none focus:border-black focus:ring-1 focus:ring-gray-900 px-5 w-full"
                        autoComplete="off"
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <span className="text-red-500 text-sm">{formik.errors.email}</span>
                    ) : null}
                </div>
                <div className="">
                    <label className="uppercase my-5 block">Contraseña</label>
                    <input
                        onChange={formik.handleChange}
                        type="password"
                        name="password"
                        className="py-4 bg-gray-50  focus:outline-none focus:border-black focus:ring-1 focus:ring-gray-900 px-5 w-full"
                        error={formik.errors.password}
                        autoComplete="off"
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <span className="text-red-500 text-sm">{formik.errors.password}</span>
                    ) : null}
                </div>
                {/* <div className="">
                    <label className="uppercase my-5 block">Repetir Contraseña</label>
                    <input
                        onChange={formik.handleChange}
                        type='password'
                        name="password"
                        className="py-4 bg-gray-50  focus:outline-none focus:border-black focus:ring-1 focus:ring-gray-900 px-5 w-full"
                        error={formik.errors.password}
                        autoComplete="off"
                    />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="mr-1">
                        <label className="uppercase my-5 block">Repetir Contraseña</label>
                        <select
                            onChange={formik.handleChange}
                            type='password'
                            name="password"
                            className="py-4 bg-gray-50  focus:outline-none focus:border-black focus:ring-1 focus:ring-gray-900 px-5 w-full"
                            error={formik.errors.password}
                            autoComplete="off"
                        >
                            <option value="">Unaaaaaaaaaaaaaaaaaaaaaaaaaaaa</option>
                        </select>
                    </div>
                    <div className="ml-1">
                        <label className="uppercase my-5 block">Repetir Contraseña</label>
                        <select
                            onChange={formik.handleChange}
                            type='password'
                            name="password"
                            className="py-4 bg-gray-50  focus:outline-none focus:border-black focus:ring-1 focus:ring-gray-900 px-5 w-full"
                            error={formik.errors.password}
                            autoComplete="off"
                        >
                            <option value="">Dossssssssssssssssssssssss</option>
                        </select>
                    </div>
                </div> */}
                <div className="mt-10">
                    <button className="bg-black w-full text-white py-4 uppercase hover:bg-white border-2 border-black hover:text-black transition-all duration-700 ease-in-out"
                        type="submit"
                    >
                        Crear Cuenta
                    </button>
                    <div className="text-center text-principal text-sm underline mt-5">
                        <Link href={router.query.p ? `/auth/login?p=${router.query.p}` : '/auth/login'}>
                            <a>¿Ya tienes Cuenta?</a>
                        </Link>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default FormSignUp