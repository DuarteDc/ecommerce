import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import * as Yup from 'yup';
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { startLoginGoogle } from "../../actions/authActions";

import { GoogleLogin } from 'react-google-login';

import { startRegister } from "../../actions/authActions";
import LoadingScreen from "../LoadingScreen";

// import Input, { getCountries, getCountryCallingCode } from 'react-phone-number-input/input';
// import en from 'react-phone-number-input/locale/en.json';

import { TextField } from "@mui/material";

import helpers from "../../helpers/helpers";
import ErrorIcon from '@mui/icons-material/Error';

const FormSignUp = () => {

    const [loading, setLoading] = useState();
    const [value, setValue] = useState()

    const [error, setError] = useState(false);
    const [messageError, setMessageError] = useState('');

    const router = useRouter();
    const dispatch = useDispatch();

    // const CountrySelect = ({ value, onChange, labels, ...rest }) => (
    //     <select {...rest} value={value} onChange={(event) => onChange(event.target.value || undefined)}
    //     className="py-1 bg-gray-50  focus:outline-none focus:border-black focus:ring-1 focus:ring-gray-900 w-24 mr-2">
    //         <option value="">Tel:</option>
    //         {getCountries().map((country) => (
    //             <option key={country} value={country}>
    //                 {labels[country]} +{getCountryCallingCode(country)}
    //             </option>
    //         ))}
    //     </select>
    // );

    const handelRegisterUser = async (formData) => {

        setLoading(true);

        const { hasError, message } = await dispatch(startRegister(formData));

        if (hasError) {
            setError(true);
            setMessageError(message);
            setTimeout(() => setError(false), 4000);
            setLoading(false);
            return;
        }

        const destination = router.query.p?.toString() || '';
        const newRoute = helpers.getLastRoute(destination);
        router.replace(newRoute);
        setLoading(false);
    }

    const initialValues = {
        fullname: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        // phone: ''
    }

    // const phoneRegex = RegExp(
    //     /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
    // );

    const validationSchema = {
        fullname: Yup.string().min(8, "El nombre debe contener al menos 8 caracteres").required("El nombre es requerido"),
        email: Yup.string().email("El correo no tiene un valido").required("El correo es requerido"),
        password: Yup.string().min(8, "La contraseña debe contener al menos 8 caracteres").required("La contraseña es requerida"),
        passwordConfirmation: Yup.string().required('Confirma la contraseña').oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden. vuelve a intentarlo'),
        // phone: Yup.string().matches(phoneRegex, "El número de telefono no es valido").required("El numero de telefono es requerido")
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object(validationSchema),
        onSubmit: (formData) => {
            const data = {
                fullname: formData.fullname,
                email: formData.email,
                password: formData.password,
            }
            handelRegisterUser(data);
        }
    });

    // const [phoneNumber, setPhoneNumber] = useState();
    // const [country, setCountry] = useState();

    const responseGoogle = async ({ tokenId }) => {

        setLoading(true)
        const isValid = await dispatch(startLoginGoogle(tokenId));

        if (!isValid) {
            setError(true);
            setMessageError(message);
            setTimeout(() => setError(false), 4000);
            setLoading(false);
            return;
        }
    
        const destination = router.query.p?.toString() || '';
        const newRoute = helpers.getLastRoute(destination);
        router.replace(newRoute);
        setLoading(false);
    }

    return (
        <>{loading && <LoadingScreen />}
            <form onSubmit={formik.handleSubmit} className="w-full">
                <div className="mx-auto mt-10">
                    <div className="">
                        <label className="uppercase mb-5 block">Nombre Completo</label>
                        <TextField
                            type="text"
                            name="fullname"
                            onChange={formik.handleChange}
                            placeholder="Tú Nombre"
                            label="Tu Nombre"
                            fullWidth
                            required={true}
                            error={formik.touched.fullname && formik.errors.fullname ? true : false}
                            helperText={formik.touched.fullname && formik.errors.fullname && formik.errors.fullname}
                            autoComplete={false}
                        />
                    </div>
                    <div className="">
                        <label className="uppercase my-5 block">Correo Electronico</label>
                        <TextField
                            type="email"
                            name="email"
                            label="Correo electrónico"
                            required={true}
                            onChange={formik.handleChange}
                            placeholder="Correo electronico"
                            fullWidth
                            error={formik.touched.email && formik.errors.email ? true : false}
                            helperText={formik.touched.email && formik.errors.email && formik.errors.email}
                            autoComplete={false}
                        />
                    </div>
                    <div className="">
                        <label className="uppercase my-5 block">Contraseña</label>
                        <TextField
                            type="password"
                            name="password"
                            onChange={formik.handleChange}
                            label="Contraseña"
                            required={true}
                            placeholder="Tú contraseña"
                            fullWidth
                            error={formik.touched.password && formik.errors.password ? true : false}
                            helperText={formik.touched.password && formik.errors.password && formik.errors.password}
                            autoComplete={false}
                        />
                    </div>
                    <div className="">
                        <label className="uppercase my-5 block">Confirmar Contraseña</label>
                        <TextField
                            type="password"
                            name="passwordConfirmation"
                            onChange={formik.handleChange}
                            label="Confirmar contraseña"
                            required={true}
                            placeholder="Tú contraseña"
                            fullWidth
                            error={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation ? true : false}
                            helperText={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && formik.errors.passwordConfirmation}
                            autoComplete={false}
                        />
                    </div>
                        {
                        error &&
                            (
                            <span className="flex items-center mt-10 justify-center">
                                <ErrorIcon 
                                    className = "text-red-600 mr-1"
                                />
                                <p className="text-red-600 text-sm">{messageError}</p>
                            </span>
                            )
                        }   
                    {/*
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
                        <button className="bg-[#222] w-full text-white py-4 uppercase hover:bg-[#333] border-2 border-[#222] transition-all duration-700 ease-in-out"
                            type="submit"
                        >
                            Crear Cuenta
                        </button>
                        <div className="text-center text-gray-500 text-sm font-semibold my-3">
                            <Link href={router.query.p ? `/auth/login?p=${router.query.p}` : '/auth/login'}>
                                <a className="hover:text-gray-900 transition-all duration-700 ease-out">¿Ya tienes Cuenta?</a>
                            </Link>
                        </div>
                    </div>
                    <div className="my-5">
                        <div className="flex items-center">
                            <hr className="w-full h-0.5 bg-gray-200 mr-2" />
                            <p className="text-gray-200 font-semibold">O</p>
                            <hr className="w-full h-0.5 bg-gray-200 ml-2" />
                        </div>
                        <GoogleLogin
                            clientId={process.env.NEXT_PUBLIC_GOOGLE_ID}
                            buttonText="Registrarme con Google"
                            className="w-full mt-5 py-3"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                    </div>
                </div>
            </form>
        </>
    )
}

export default FormSignUp