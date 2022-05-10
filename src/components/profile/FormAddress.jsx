import { useEffect, useState } from 'react';

import Modal from '@mui/material/Modal';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getMinicipilitesPerState, getStates, startSaveNewAddress } from '../../actions/profileActions';
import { errorNotify, successNotify } from '../../helpers/helpers';
import { useDispatch } from 'react-redux';

const FormAddress = ({ setShowForm }) => {

    const dispatch = useDispatch();

    const [states, setStates] = useState(null);
    const [municipalities, setMunicipalities] = useState(null)

    useEffect(() => {
        loadStates();
    }, []);

    const loadStates = async () => {
        const _states = await getStates();
        setStates(_states);
    }

    const handleChangeState = async (e) => {
        const _id = e.target.value
        const _municipalities = await getMinicipilitesPerState(_id);
        setMunicipalities(_municipalities);
    }

    const handleSaveNewAddress = async (formData) => {

        const { hasError, message } = await dispatch(startSaveNewAddress(formData));

        if (hasError) {
            errorNotify(message);
            return;
        }
        successNotify(message);
        setShowForm(false)
    }

    const initialValues = {
        name: '',
        street: '',
        between_street: '',
        postalcode: '',
        city: '',
        references: '',
        no_int: '',
        state: '',
        municipality: '',
    }
    const validationSchema = {
        name: Yup.string().required('La nombre es requerido'),
        street: Yup.string().min(8, 'La direccion debe contener al menos 8 caracteres').required('La dirección es requerida'),
        between_street: Yup.string().min(8, 'El campo debe contener al menos 8 caracteres').required('El campo es requerido'),
        postalcode: Yup.number().typeError('El número no es valido').min(5, 'El campo debe contener al menos 5 caracteres').required('el campo es requerido').max(5, 'El campo no debe contener mas de 5 caracteres'),
        city: Yup.string().min(5, 'El campo debe contener al menos 8 caracteres').required('El campo es requerido'),
        references: Yup.string().min(8, 'El campo debe contener al menos 8 caracteres').required('El campo es requerido'),
        no_int: Yup.number().typeError('El número no es valido').required('El campo es requerido'),
        state: Yup.string().required('El campo es requerido'),
        municipality: Yup.string().required('El campo es requerido')
    }

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object(validationSchema),
        onSubmit: (formData) => {
            handleSaveNewAddress(formData);
            closeModal();
        }
    });
    return (
        <div className="overflow-hidden mx-auto py-8 px-2 bg-white mt-5 animate__animated animate__fadeIn font-Poppins">
            <div className="flex items-center justify-between">
                <h2 className="font-bold text-xl mb-10">
                    Nueva Dirección
                </h2>
                <p
                    onClick={() => setShowForm(false)} className="cursor-pointer">
                    cancelar
                </p>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="my-2 md:px-2">
                        <label className="text-sm">Nombre</label>
                        <input
                            name="name"
                            onChange={formik.handleChange}
                            placeholder="Nombre"
                            type="text"
                            className="py-4 bg-gray-50 focus:outline-none focus:border-black focus:ring-1 focus:ring-gray-900 px-5 w-full my-1"
                        />
                        {formik.touched.name && formik.errors.name ? (
                            <span className="text-red-500 text-sm">{formik.errors.name}</span>
                        ) : null}
                    </div>
                    <div className="my-2 md:px-2">
                        <label className="text-sm">Calle</label>
                        <input
                            name="street"
                            onChange={formik.handleChange}
                            placeholder="Calle"
                            type="text"
                            className="py-4 bg-gray-50  focus:outline-none focus:border-black focus:ring-1 focus:ring-gray-900 px-5 w-full my-1"
                        />
                        {formik.touched.street && formik.errors.street ? (
                            <span className="text-red-500 text-sm">{formik.errors.street}</span>
                        ) : null}
                    </div>
                    <div className="my-2 md:px-2">
                        <label className="text-sm">Entre calle y calle</label>
                        <input
                            name="between_street"
                            onChange={formik.handleChange}
                            placeholder="Entre calle y calle"
                            type="text"
                            className="py-4 bg-gray-50  focus:outline-none focus:border-black focus:ring-1 focus:ring-gray-900 px-5 w-full my-1"
                        />
                        {formik.touched.between_street && formik.errors.between_street ? (
                            <span className="text-red-500 text-sm">{formik.errors.between_street}</span>
                        ) : null}
                    </div>
                    <div className="my-2 md:px-2">
                        <label className="text-sm">Código postal</label>
                        <input
                            name="postalcode"
                            onChange={formik.handleChange}
                            placeholder="Código postal"
                            type="text"
                            className="py-4 bg-gray-50  focus:outline-none focus:border-black focus:ring-1 focus:ring-gray-900 px-5 w-full my-1"
                        />
                        {formik.touched.postalcode && formik.errors.postalcode ? (
                            <span className="text-red-500 text-sm">{formik.errors.postalcode}</span>
                        ) : null}
                    </div>
                    <div className="my-2 md:px-2">
                        <label className="text-sm">Ciudad</label>
                        <input
                            name="city"
                            onChange={formik.handleChange}
                            placeholder="ciudad"
                            type="text"
                            className="py-4 bg-gray-50  focus:outline-none focus:border-black focus:ring-1 focus:ring-gray-900 px-5 w-full my-1"
                        />
                        {formik.touched.city && formik.errors.city ? (
                            <span className="text-red-500 text-sm">{formik.errors.city}</span>
                        ) : null}
                    </div>
                    <div className="my-2 md:px-2">
                        <label className="text-sm">Referencias</label>
                        <input
                            name="references"
                            onChange={formik.handleChange}
                            placeholder="Referencias"
                            type="text"
                            className="py-4 bg-gray-50  focus:outline-none focus:border-black focus:ring-1 focus:ring-gray-900 px-5 w-full my-1"
                        />
                        {formik.touched.references && formik.errors.references ? (
                            <span className="text-red-500 text-sm">{formik.errors.references}</span>
                        ) : null}
                    </div>
                    <div className="my-2 md:px-2">
                        <label className="text-sm">No. Interior</label>
                        <input
                            name="no_int"
                            onChange={formik.handleChange}
                            placeholder="No. Interior"
                            type="text"
                            className="py-4 bg-gray-50  focus:outline-none focus:border-black focus:ring-1 focus:ring-gray-900 px-5 w-full my-1"
                        />
                        {formik.touched.no_int && formik.errors.no_int ? (
                            <span className="text-red-500 text-sm">{formik.errors.no_int}</span>
                        ) : null}
                    </div>
                    <div className="my-2 grid grid-cols-1 lg:grid-cols-2">
                        <div className="lg:mr-1">
                            <label className="text-sm">Estado</label>
                            <select
                                name="state"
                                onChange={(e) => { formik.handleChange(e); handleChangeState(e) }}
                                placeholder="Estado"
                                type="text"
                                className="py-4 bg-gray-50  focus:outline-none focus:border-black focus:ring-1 focus:ring-gray-900 px-5 w-full my-1"
                            >
                                <option value="">Seleciona un estado</option>
                                {
                                    states?.map(state => (
                                        <option key={state._id} value={state._id}>{state.name}</option>
                                    ))
                                }

                            </select>
                            {formik.touched.state && formik.errors.state ? (
                                <span className="text-red-500 text-sm">{formik.errors.state}</span>
                            ) : null}
                        </div>
                        {
                            states && (
                                <div className="lg:ml-1">
                                    <label className="text-sm">Municipio</label>
                                    <select
                                        name="municipality"
                                        onChange={formik.handleChange}
                                        placeholder="Municipio"
                                        type="text"
                                        className="py-4 bg-gray-50  focus:outline-none focus:border-black focus:ring-1 focus:ring-gray-900 px-5 w-full my-1"
                                    >
                                        <option value="">Seleciona un municipio</option>
                                        {
                                            municipalities?.map(municipality => (
                                                <option key={municipality._id} value={municipality._id}>{municipality.name}</option>
                                            ))
                                        }

                                    </select>
                                    {formik.touched.municipality && formik.errors.municipality ? (
                                        <span className="text-red-500 text-sm">{formik.errors.municipality}</span>
                                    ) : null}
                                </div>
                            )
                        }
                    </div>
                </div>
                <button className="bg-[#222] w-full text-white py-4 uppercase hover:bg-[#333] border-2 border-[#222] transition-all duration-700 ease-in-out mt-10"
                    type="submit"
                >
                    Guardar Dirección
                </button>
            </form>
        </div>
    )
}

export default FormAddress