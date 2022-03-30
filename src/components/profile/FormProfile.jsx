import { useDispatch } from 'react-redux';

import * as Yup from 'yup';
import { useFormik } from 'formik';

import { startUpdateDataUser } from '../../actions/profileActions'
import { errorNotify, successNotify } from '../../helpers/helpers';

const FormProfile = ({ fullname, email, phone, setIsEditing }) => {

    const dispatch = useDispatch();

    const handleUpdateDataUser = async (formData) => {

        const { hasError, message } = await dispatch(startUpdateDataUser(formData));

        if (hasError) {
            errorNotify(message);
            return;
        }
        successNotify(message);
        setIsEditing(false);
    }

    const initialValues = {
        fullname: fullname,
        email: email,
        phone_number: phone.phone_number,
    }

    const phoneRegex = RegExp(
        /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
    );

    const validationSchema = {
        fullname: Yup.string().required("La nombre es requerido").min(8, "EL nombre debde tener al menos 8 caracteres"),
        email: Yup.string().email(true, "El correo no tiene un formato valido").required("El correo es requerido"),
        phone_number: Yup.string().matches(phoneRegex, "El número de telefono no es valido").required("El numero de telefono es requerido")
    }

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object(validationSchema),
        onSubmit: (formData) => {
            handleUpdateDataUser(formData);
        }
    });

    return (
        <div className="animate__animated animate__fadeIn relative">
            <p className="p-4 text-center font-bold uppercase">Detalles de perfil</p>
            <p
                onClick={() => setIsEditing(false)}
                className="absolute top-0 right-2 cursor-pointer"
            >Cancelar</p>
            <div className="mt-10 md:mt-0 px-6">
                <form onSubmit={formik.handleSubmit}>
                    <div className="my-2 w-full">
                        <label htmlFor="fullname" className="text-lg">Nombre completo:</label>
                        <input
                            id="fullname"
                            name="fullname"
                            onChange={formik.handleChange}
                            value={formik.values.fullname}
                            placeholder="Nombre completo"
                            type="text"
                            className="py-4 bg-gray-50  focus:outline-none focus:border-black focus:ring-1 focus:ring-gray-900 px-5 w-full my-1"
                        />
                        {formik.touched.fullname && formik.errors.fullname ? (
                            <p className="text-red-500 text-sm">{formik.errors.fullname}</p>
                        ) : null}
                    </div>
                    <div className="my-2 w-full">
                        <label htmlFor="email" className="text-lg">Correo electronico:</label>
                        <input
                            id="email"
                            name="email"
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            placeholder="Correo electronico"
                            type="email"
                            className="py-4 bg-gray-50  focus:outline-none focus:border-black focus:ring-1 focus:ring-gray-900 px-5 w-full my-1"
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <span className="text-red-500 text-sm">{formik.errors.email}</span>
                        ) : null}
                    </div>
                    <div className="my-2 w-full">
                        <label htmlFor="phone_number" className="text-lg">Telefono:</label>
                        <input
                            id="phone_number"
                            name="phone_number"
                            onChange={formik.handleChange}
                            value={formik.values.phone_number}
                            placeholder="Numero telefonico"
                            type="text"
                            className="py-4 bg-gray-50  focus:outline-none focus:border-black focus:ring-1 focus:ring-gray-900 px-5 w-full my-1"
                        />
                        {formik.touched.phone_number && formik.errors.phone_number ? (
                            <span className="text-red-500 text-sm">{formik.errors.phone_number}</span>
                        ) : null}
                    </div>
                    <button
                        className="my-5 ml-8 hover:bg-black py-2 hover:text-white font-bold border-2 border-black transition-all duration-700 ease-in-out"
                        type="submit"
                    >
                        Actualizar
                    </button>
                </form>
            </div>
        </div>
    )
}

export default FormProfile