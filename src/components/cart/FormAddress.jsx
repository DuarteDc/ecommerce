import { useEffect, useState } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getMinicipilitesPerState, getStates } from '../../actions/profileActions';
import {startSaveNewAddress} from '../../actions/shoppingCartActions';
import { errorNotify, successNotify } from '../../helpers/helpers';
import { useDispatch } from 'react-redux';


const FormAddress = ({ toggle }) => {

    const dispatch = useDispatch();

    const [states, setStates] = useState(null);
    const [municipalities, setMunicipalities] = useState(null);

    useEffect(() => {
        loadStates();
    }, []);

    const loadStates = async () => {
        const _states = await getStates();
        setStates(_states);
    }

    const loadMunicipalities = async (_id) => {
        const _municipalities = await getMinicipilitesPerState(_id);
        setMunicipalities(_municipalities);
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
        toggle();

    }

    const initialValues = {
        name: '',
        street: '',
        between_street: '',
        postalcode: '',
        city: '',
        references: '',
        no_int: '',
        no_ext: '',
        state: '',
        municipality: '',
    }

    const validationSchema = {
        name: Yup.string().required('La nombre es requerido'),
        street: Yup.string().min(8, 'La calle debe contener al menos 8 caracteres').required('La calle es requerida'),
        between_street: Yup.string().min(8, 'El campo debe contener al menos 8 caracteres').required('El campo es requerido'),
        postalcode: Yup.string().min(5, 'El código postal debe contener al menos 5 caracteres').required('el código postal es requerido').max(5, 'El código postal no debe contener mas de 5 caracteres'),
        city: Yup.string().min(5, 'La ciudad debe contener al menos 8 caracteres').required('La ciudad es requerida'),
        references: Yup.string().min(8, 'Las referencias debe contener al menos 8 caracteres').required('Las referencias son requeridas'),
        no_ext: Yup.number().typeError('El número exterior no es valido').required('El número exterior es requerido'),
        no_int: Yup.number().typeError('El número interior no es valido'),
        state: Yup.string().required('El estado es requerido'),
        municipality: Yup.string().required('El municipio es requerido')
    }

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object(validationSchema),
        onSubmit: (formData) => {
            handleSaveNewAddress(formData);
        }
    });

    return (
        <div className="overflow-hidden mx-auto py-8 px-5 bg-white mt-5 animate__animated animate__fadeIn font-Poppins">
            <div className="flex items-center justify-between">
                <h2 className="font-bold md:text-xl -mt-16">
                    Agregar Dirección
                </h2>
                <p
                    onClick={toggle} className="cursor-pointer text-xs md:text-base">
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
                            value={formik.values.name}
                            placeholder="Nombre"
                            type="text"
                            className="py-4 bg-gray-50 focus:outline-none focus:border-black focus:ring-1 focus:ring-gray-900 px-5 w-full my-1"
                        />
                        {formik.touched.name && formik.errors.name ? (
                            <span className="text-red-500 text-sm">{formik.errors.name}</span>
                        ) : null}
                    </div>
                    <div className="my-2">
                        <div className="">
                            <label className="text-sm">Estado</label>
                            <select
                                name="state"
                                onChange={(e) => { formik.handleChange(e); handleChangeState(e) }}
                                placeholder="Estado"
                                value={formik.values.state}
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
                    </div>
                    <div>
                        {
                            states && (
                                <div className="lg:ml-1">
                                    <label className="text-sm">Municipio</label>
                                    <select
                                        name="municipality"
                                        onChange={formik.handleChange}
                                        placeholder="Municipio"
                                        value={formik.values.municipality}
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
                    <div className="md:px-2">
                        <label className="text-sm">Calle</label>
                        <input
                            name="street"
                            onChange={formik.handleChange}
                            placeholder="Calle"
                            value={formik.values.street}
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
                            value={formik.values.between_street}
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
                            value={formik.values.postalcode}
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
                            value={formik.values.city}
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
                            value={formik.values.references}
                            placeholder="Referencias"
                            type="text"
                            className="py-4 bg-gray-50  focus:outline-none focus:border-black focus:ring-1 focus:ring-gray-900 px-5 w-full my-1"
                        />
                        {formik.touched.references && formik.errors.references ? (
                            <span className="text-red-500 text-sm">{formik.errors.references}</span>
                        ) : null}
                    </div>
                    <div className="lg:mr-1">
                        <label className="text-sm">No. Exterior</label>
                        <input
                            name="no_ext"
                            onChange={formik.handleChange}
                            value={formik.values.no_ext}
                            placeholder="No. Exterior"
                            type="text"
                            className="py-4 bg-gray-50  focus:outline-none focus:border-black focus:ring-1 focus:ring-gray-900 px-5 w-full my-1"
                        />
                        {formik.touched.no_ext && formik.errors.no_ext ? (
                            <span className="text-red-500 text-sm">{formik.errors.no_ext}</span>
                        ) : null}

                    </div>
                    <div className="md:px-2">
                        <label className="text-sm">No. Interior</label>
                        <input
                            name="no_int"
                            onChange={formik.handleChange}
                            placeholder="No. Interior"
                            value={formik.values.no_int}
                            type="text"
                            className="py-4 bg-gray-50  focus:outline-none focus:border-black focus:ring-1 focus:ring-gray-900 px-5 w-full my-1"
                        />
                        {formik.touched.no_int && formik.errors.int ? (
                            <span className="text-red-500 text-sm">{formik.errors.int}</span>
                        ) : null}
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