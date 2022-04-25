import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import * as Yup from 'yup';
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import { startRegister } from "../../actions/authActions";
import LoadingScreen from "../LoadingScreen";

import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

import Input, { getCountries, getCountryCallingCode } from 'react-phone-number-input/input';
import en from 'react-phone-number-input/locale/en.json';

const FormSignUp = () => {

    const [loading, setLoading] = useState();
    const [value, setValue] = useState()

    const [error, setError] = useState(false);
    const [messageError, setMessageError] = useState('');

    const router = useRouter();
    const dispatch = useDispatch();

    const CountrySelect = ({ value, onChange, labels, ...rest }) => (
        <select {...rest} value={value} onChange={(event) => onChange(event.target.value || undefined)}
        className="py-1 bg-gray-50  focus:outline-none focus:border-black focus:ring-1 focus:ring-gray-900 w-24 mr-2">
            <option value="">Tel:</option>
            {getCountries().map((country) => (
                <option key={country} value={country}>
                    {labels[country]} +{getCountryCallingCode(country)}
                </option>
            ))}
        </select>
    );

    const handelRegisterUser = async (formData) => {

        setLoading(true);

        const { hasError, message } = await dispatch(startRegister(formData));

        if (hasError) {
            setError(true);
            setMessageError(message || '');
            setTimeout(() => setError(false), 4000);
            setLoading(false);
            return;
        }

        const destination = router.query.p?.toString() || '';
        router.replace(destination); router.replace('/');
        setLoading(false);
    }

    const initialValues = {
        fullname: '',
        email: '',
        password: '',
        passwordConfirmation: '',
        phone: ''
    }

    const phoneRegex = RegExp(
        /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
    );

    const validationSchema = {
        fullname: Yup.string().min(8, "El nombre debe contener al menos 8 caracteres").required("El nombre es requerido"),
        email: Yup.string().email("El correo no tiene un valido").required("El correo escrequerido"),
        password: Yup.string().min(8, "La contraseña debe contener al menos 8 caracteres").required("La contraseña es requerida"),
        passwordConfirmation: Yup.string().required('Confirma la contraseña').oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden. vuelve a intentarlo'),
        phone: Yup.string().matches(phoneRegex, "El número de telefono no es valido").required("El numero de telefono es requerido")
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object(validationSchema),
        onSubmit: (formData) => {
            //handelRegisterUser(formData);
            alert(JSON.stringify(formData));
        }
    });

    const [phoneNumber, setPhoneNumber] = useState();
    const [country, setCountry] = useState();

    return (
        <>{loading && <LoadingScreen />}
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
                <div className="mx-auto mt-20">
                    <div className="">
                        <label className="uppercase my-5 block">Nombre Completo</label>
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
                        <label className="uppercase my-5 block">Número de teléfono celular</label>
                        <div className="flex">
                            <CountrySelect labels={en} value={country} onChange={setCountry} name="countrySelect" />
                            <input
                                name="phone"
                                country={country}
                                value={phoneNumber}
                                onChange={(e) => { setPhoneNumber(e.target.value); formik.handleChange(e) }}
                                className="py-4 bg-gray-50  focus:outline-none focus:border-black focus:ring-1 focus:ring-gray-900 px-5 w-full"
                            />
                        </div>
                        {formik.touched.phone && formik.errors.phone ? (
                            <span className="text-red-500 text-sm">{formik.errors.phone}</span>
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
                    <div className="">
                        <label className="uppercase my-5 block">Repetir Contraseña</label>
                        <input
                            onChange={formik.handleChange}
                            type='password'
                            name="passwordConfirmation"
                            className="py-4 bg-gray-50  focus:outline-none focus:border-black focus:ring-1 focus:ring-gray-900 px-5 w-full"
                            error={formik.errors.passwordConfirmation}
                            autoComplete="off"
                        />
                        {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation ? (
                            <span className="text-red-500 text-sm">{formik.errors.passwordConfirmation}</span>
                        ) : null}
                    </div>
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
                </div>
            </form>
        </>
    )
}

export default FormSignUp