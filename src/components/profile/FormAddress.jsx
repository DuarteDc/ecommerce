import { useEffect, useState } from 'react';

import Modal from '@mui/material/Modal';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { clearDirection, getMinicipilitesPerState, getStates, startSaveNewAddress, startUpdateAddress } from '../../actions/profileActions';
import { errorNotify, successNotify } from '../../helpers/helpers';
import { useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const FormAddress = ({ setShowForm, direction, isEditing }) => {

    const dispatch = useDispatch();

    const [states, setStates] = useState(null);
    const [municipalities, setMunicipalities] = useState(null)

    useEffect(() => {
        loadStates();
        if (isEditing) {
            loadMunicipalities(direction?.state?._id);
        }
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
        setShowForm(false)
    }

    const handleUpdateAddress = async (formData) => {

        const { hasError, message } = await dispatch(startUpdateAddress(formData, direction._id));

        if (hasError) {
            errorNotify(message);
            return;
        }
        successNotify(message);
        setShowForm(false)
    }

    const initialValues = {
        name: direction.name,
        street: direction.street,
        between_street: direction.between_street,
        postalcode: direction.postalcode,
        city: direction.city,
        references: direction.references,
        no_int: direction.no_int,
        no_ext: direction.no_ext,
        state: direction.state?._id,
        municipality: direction.municipality?._id,
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
            if (isEditing) {
                handleUpdateAddress(formData);
            } else {
                handleSaveNewAddress(formData);
            }
            closeModal();
        }
    });
    return (
        <div className="overflow-hidden mx-auto py-8 px-5 bg-white mt-5 animate__animated animate__fadeIn font-Poppins">
            <div className="flex items-center justify-between">

                {
                    !isEditing ? (
                        <h2 className="font-bold text-xl mb-10">
                            Nueva Dirección
                        </h2>
                    ) : (
                        <h2 className="font-bold text-xl mb-10">
                            Editar Dirección
                        </h2>
                    )
                }
                <p
                    onClick={() => { setShowForm(false); dispatch(clearDirection()); }} className="cursor-pointer">
                    cancelar
                </p>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="mt-5 md:mr-1">
                        <FormControl fullWidth>
                            <TextField
                                label="Nombre"
                                required={true}
                                variant="outlined"
                                name="name"
                                onChange={formik.handleChange}
                                value={formik.values.name}
                                placeholder="Nombre"
                            />
                            {formik.touched.name && formik.errors.name ? (
                                <span className="text-red-500 text-sm">{formik.errors.name}</span>
                            ) : null}
                        </FormControl>
                    </div>
                    <div className="mt-5 md:ml-1">
                        <FormControl fullWidth required>
                            <InputLabel id="demo-simple-select-required-label">Estado</InputLabel>
                            <Select
                                label="Estado *"
                                labelId="demo-simple-select-required-label"
                                id="demo-simple-select-required"
                                name="state"
                                onChange={(e) => { formik.handleChange(e); handleChangeState(e) }}
                                placeholder="Estado"
                                fullWidth
                                value={formik.values.state}
                            >
                                {
                                    states?.map(state => (
                                        <MenuItem key={state._id} value={state._id}>{state.name}</MenuItem>
                                    ))
                                }
                            </Select>
                            {formik.touched.state && formik.errors.state ? (
                                <span className="text-red-500 text-sm">{formik.errors.state}</span>
                            ) : null}
                        </FormControl>
                    </div>
                    {
                        states && (
                            <div className="mt-5 md:mr-1">
                                <FormControl fullWidth required>
                                    <InputLabel id="demo-simple-select-required-label1">Municipio</InputLabel>
                                    <Select
                                        label="Municipio *"
                                        labelId="demo-simple-select-required-label1"
                                        id="demo-simple-select-municipalities"
                                        name="municipality"
                                        required={true}
                                        onChange={formik.handleChange}
                                        placeholder="Municipio"
                                        fullWidth
                                        value={formik.values.municipality}
                                    >
                                        {
                                            municipalities?.map(municipality => (
                                                <MenuItem key={municipality._id} value={municipality._id}>{municipality.name}</MenuItem>
                                            ))
                                        }

                                    </Select>
                                    {formik.touched.municipality && formik.errors.municipality ? (
                                        <span className="text-red-500 text-sm">{formik.errors.municipality}</span>
                                    ) : null}
                                </FormControl>
                            </div>
                        )
                    }
                    <div className="mt-5 md:ml-1">
                        <FormControl fullWidth>
                            <TextField
                                label="Calle"
                                variant="outlined"
                                required={true}
                                name="street"
                                onChange={formik.handleChange}
                                value={formik.values.name}
                                placeholder="Nombre"
                            />
                            {formik.touched.street && formik.errors.street ? (
                                <span className="text-red-500 text-sm">{formik.errors.street}</span>
                            ) : null}
                        </FormControl>
                    </div>
                    <div className="mt-5 md:mr-1">
                        <FormControl fullWidth>
                            <TextField
                                name="between_street"
                                onChange={formik.handleChange}
                                value={formik.values.between_street}
                                placeholder="Entre calle y calle"
                                required={true}
                                label="Entre calle y calle"
                                variant="outlined"
                            />
                            {formik.touched.between_street && formik.errors.between_street ? (
                                <span className="text-red-500 text-sm">{formik.errors.between_street}</span>
                            ) : null}
                        </FormControl>
                    </div>
                    <div className="mt-5 md:ml-1">
                        <FormControl fullWidth>
                            <TextField
                                name="postalcode"
                                required={true}
                                onChange={formik.handleChange}
                                value={formik.values.postalcode}
                                placeholder="Código postal"
                                label="Código postal"
                            />
                            {formik.touched.postalcode && formik.errors.postalcode ? (
                                <span className="text-red-500 text-sm">{formik.errors.postalcode}</span>
                            ) : null}
                        </FormControl>
                    </div>
                    <div className="mt-5 md:mr-1">
                        <FormControl fullWidth>
                            <TextField
                                name="city"
                                label="Ciudad"
                                onChange={formik.handleChange}
                                value={formik.values.city}
                                placeholder="ciudad"
                                required={true}
                            />
                            {formik.touched.city && formik.errors.city ? (
                                <span className="text-red-500 text-sm">{formik.errors.city}</span>
                            ) : null}
                        </FormControl>
                    </div>
                    <div className="mt-5 md:ml-1">
                        <FormControl fullWidth>
                            <TextField
                                name="references"
                                onChange={formik.handleChange}
                                value={formik.values.references}
                                placeholder="Referencias"
                                label="Referencias"
                                required={true}
                            />
                            {formik.touched.references && formik.errors.references ? (
                                <span className="text-red-500 text-sm">{formik.errors.references}</span>
                            ) : null}
                        </FormControl>
                    </div>
                    <div className="mt-5 md:mr-1">
                        <FormControl fullWidth>
                            <TextField
                                name="no_ext"
                                onChange={formik.handleChange}
                                value={formik.values.no_ext}
                                placeholder="No. Exterior"
                                required={true}
                                label="No.exterior"
                            />
                            {formik.touched.no_ext && formik.errors.no_ext ? (
                                <span className="text-red-500 text-sm">{formik.errors.no_ext}</span>
                            ) : null}
                        </FormControl>
                    </div>
                    <div className="mt-5 md:ml-1">
                        <FormControl fullWidth>
                            <TextField
                                name="no_int"
                                onChange={formik.handleChange}
                                placeholder="No. Interior"
                                value={formik.values.no_int}
                                label="No. Interior"

                            />
                            {formik.touched.no_int && formik.errors.int ? (
                                <span className="text-red-500 text-sm">{formik.errors.int}</span>
                            ) : null}
                        </FormControl>
                    </div>
                </div>
                {
                    !isEditing ? (
                        <button className="bg-[#222] w-full text-white py-4 uppercase hover:bg-[#333] border-2 border-[#222] transition-all duration-700 ease-in-out mt-10"
                            type="submit"
                        >
                            Guardar Dirección
                        </button>
                    ) : (
                        <button className="bg-[#222] w-full text-white py-4 uppercase hover:bg-[#333] border-2 border-[#222] transition-all duration-700 ease-in-out mt-10"
                            type="submit"
                        >
                            Actualizar Dirección
                        </button>
                    )
                }
            </form>
        </div>
    )
}

export default FormAddress

// </div>
// {
//     !isEditing ? (
//         <button className="bg-[#222] w-full text-white py-4 uppercase hover:bg-[#333] border-2 border-[#222] transition-all duration-700 ease-in-out mt-10"
//             type="submit"
//         >
//             Guardar Dirección
//         </button>
//     ) : (
//         <button className="bg-[#222] w-full text-white py-4 uppercase hover:bg-[#333] border-2 border-[#222] transition-all duration-700 ease-in-out mt-10"
//             type="submit"
//         >
//             Actualizar Dirección
//         </button>
//     )
// }