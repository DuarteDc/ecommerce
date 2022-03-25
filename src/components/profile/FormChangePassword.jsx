import Modal from '@mui/material/Modal';

import { useFormik } from 'formik';

import * as Yup from 'yup';

import { startChangePassword } from '../../actions/authActions';
import { errorNotify, successNotify } from '../../helpers/helpers';

const FormChangePassword = ({ isOpen, closeModal }) => {

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

    const handleChangePassword = async (formData) => {

        const isValid = await startChangePassword(formData);
        if (isValid) {
            successNotify("La contraseña se actualizo con exito");
            return;
        }
        errorNotify("Hubo un problema al cambiar la contraseña");
    }

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object(validationSchema),
        onSubmit: (formData) => {
            handleChangePassword(formData);
            closeModal();
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
                    Cambiar Contraseña
                </h2>
                <form onSubmit={formik.handleSubmit}>
                    <div className="my-2">
                        <label htmlFor="" className="text-sm">Contraseña</label>
                        <input
                            name="actual_password"
                            onChange={formik.handleChange}
                            placeholder="Contraseña"
                            type="password"
                            className="py-4 bg-gray-50  focus:outline-none focus:border-black focus:ring-1 focus:ring-gray-900 px-5 w-full my-1"
                        />
                        {formik.touched.actual_password && formik.errors.actual_password ? (
                            <span className="text-red-500 text-sm">{formik.errors.actual_password}</span>
                        ) : null}
                    </div>
                    <div className="my-2">
                        <label htmlFor="" className="text-sm">Nueva Contraseña</label>
                        <input
                            name="new_password"
                            onChange={formik.handleChange}
                            placeholder="Nueva Contraseña"
                            type="password"
                            className="py-4 bg-gray-50  focus:outline-none focus:border-black focus:ring-1 focus:ring-gray-900 px-5 w-full my-1"
                        />
                        {formik.touched.new_password && formik.errors.new_password ? (
                            <span className="text-red-500 text-sm">{formik.errors.new_password}</span>
                        ) : null}
                    </div>
                    <div className="my-2">
                        <label htmlFor="" className="text-sm">Confirmar Contraseña</label>
                        <input
                            name="confirm_new_password"
                            onChange={formik.handleChange}
                            placeholder="Repetir Contraseña"
                            type="password"
                            className="py-4 bg-gray-50  focus:outline-none focus:border-black focus:ring-1 focus:ring-gray-900 px-5 w-full my-1"
                        />
                        {formik.touched.confirm_new_password && formik.errors.confirm_new_password ? (
                            <span className="text-red-500 text-sm">{formik.errors.confirm_new_password}</span>
                        ) : null}
                    </div>
                    <button className="bg-black w-full text-white py-4 uppercase hover:bg-white border-2 border-black hover:text-black transition-all duration-700 ease-in-out"
                        type="submit"
                    >
                        Cambiar contraseña
                    </button>
                </form>
            </div>
        </Modal>
    )
}

export default FormChangePassword