import { useEffect, useState } from 'react';

import Modal from '@mui/material/Modal';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { getMinicipilitesPerState, getStates, saveAddress } from '../../actions/profileAcctions';

const FormAddress = ({ isOpen, closeModal, loadAddress }) => {

    const [states, setStates] = useState(null);
    const [municipalities, setMunicipalities] = useState(null)

    useEffect(() => {
        loadStates();
    }, [])



    const loadStates = async () => {
        const _states = await getStates();
        setStates(_states);
    }

    const handleChangeState = async ({ target }) => {
        const _id = target.value
        const _municipalities = await getMinicipilitesPerState(_id);
        setMunicipalities(_municipalities);
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
        postalcode: Yup.number().min(5, 'El campo debe contener al menos 5 caracteres').required('el campo es requerido'),
        city: Yup.string().min(5, 'El campo debe contener al menos 8 caracteres').required('El campo es requerido'),
        references: Yup.string().min(8, 'El campo debe contener al menos 8 caracteres').required('El campo es requerido'),
        no_int: Yup.number().required('El campo es requerido'),
        municipality: Yup.string().required('El campo es requerido')
        //state: Yup.string().required('El campo es requerido'),
    }

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object(validationSchema),
        onSubmit: (formData) => {
            saveAddress(formData);
            closeModal();
            loadAddress();
        }
    });
    return (
        <Modal
            open={isOpen}
            onClose={closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className="overflow-hidden w-11/12 md:w-5/12  mx-auto p-8 bg-white mt-5">
                <h2 className="font-bold text-xl">
                    Nueva Dirección
                </h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="my-2">
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
                    <div className="my-2">
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
                    <div className="my-2">
                        <label className="text-sm">Entre(calle)</label>
                        <input
                            name="between_street"
                            onChange={formik.handleChange}
                            placeholder="Entre(calle)"
                            type="text"
                            className="py-4 bg-gray-50  focus:outline-none focus:border-black focus:ring-1 focus:ring-gray-900 px-5 w-full my-1"
                        />
                        {formik.touched.between_street && formik.errors.between_street ? (
                            <span className="text-red-500 text-sm">{formik.errors.between_street}</span>
                        ) : null}
                    </div>
                    <div className="my-2">
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
                    <div className="my-2">
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
                    <div className="my-2">
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
                    <div className="my-2">
                        <label className="text-sm">No. Interior</label>
                        <input
                            name="no_int"
                            onChange={formik.handleChange}
                            placeholder="No. Interior"
                            type="text"
                            className="py-4 bg-gray-50  focus:outline-none focus:border-black focus:ring-1 focus:ring-gray-900 px-5 w-full my-1"
                        />
                        {formik.touched.references && formik.errors.references ? (
                            <span className="text-red-500 text-sm">{formik.errors.references}</span>
                        ) : null}
                    </div>
                    <div className="my-2 grid grid-cols-1 lg:grid-cols-2">
                        <div className="lg:mr-1">
                            <label className="text-sm">Estado</label>
                            <select
                                name="state"
                                onChange={handleChangeState}
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
                    <button className="bg-black w-full text-white py-4 uppercase hover:bg-white border-2 border-black hover:text-black transition-all duration-700 ease-in-out"
                        type="submit"
                    >
                        Guardar Dirección
                    </button>
                </form>
            </div>
        </Modal>
    )
}

export default FormAddress