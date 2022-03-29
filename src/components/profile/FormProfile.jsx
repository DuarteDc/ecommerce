
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PersonIcon from '@mui/icons-material/Person';

import * as Yup from 'yup';
import { useFormik } from 'formik';



const FormProfile = ({ fullname, email, phone }) => {

    const initialValues = {
        fullname: fullname,
        email: '',
        phone: '',
    }

    const validationSchema = {
        fullname: Yup.string().required("La contraseña es requerida"),
        email: Yup.string().min(8, 'La contraseña debe contener al menos 8 caracteres').required("La contraseña es requerida"),
        phone: Yup.string().oneOf([Yup.ref('new_password'), null], "La contraseña no coincide")
    }

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object(validationSchema),
        onSubmit: (formData) => {
            console.table(formData);
        }
    });
    return (
        <div className="animate__animated animate__fadeIn">
            <p className="p-4 text-center font-bold uppercase">Detalles de perfil</p>
            <div className="mt-10 md:mt-0 px-6">
                <form onSubmit={formik.handleSubmit}>
                    <div className="my-2 flex items-center w-full">
                        <PersonIcon className="mr-2" />
                        <input
                            name="fullname"
                            onChange={formik.handleChange}
                            placeholder="Nombre completo"
                            type="text"
                            className="py-4 focus:outline-none focus:border-black focus:ring-1 focus:ring-gray-900 px-5 w-full my-1"
                        />
                        {formik.touched.fullname && formik.errors.fullname ? (
                            <span className="text-red-500 text-sm">{formik.errors.fullname}</span>
                        ) : null}
                    </div>
                    <div className="my-2 flex items-center w-full">
                        <EmailIcon className="mr-2" />
                        <input
                            name="email"
                            onChange={formik.handleChange}
                            placeholder="Correo electronico"
                            type="email"
                            value={email}
                            className="py-4 focus:outline-none focus:border-black focus:ring-1 focus:ring-gray-900 px-5 w-full my-1"
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <span className="text-red-500 text-sm">{formik.errors.email}</span>
                        ) : null}
                    </div>
                    <div className="my-2 flex items-center w-full">
                        <LocalPhoneIcon className="mr-2" />
                        <input
                            name="phone"
                            onChange={formik.handleChange}
                            placeholder="Nombre completo"
                            type="text"
                            value={phone.phone_number}
                            className="py-4 focus:outline-none focus:border-black focus:ring-1 focus:ring-gray-900 px-5 w-full my-1"
                        />
                        {formik.touched.phone && formik.errors.phone ? (
                            <span className="text-red-500 text-sm">{formik.errors.phone}</span>
                        ) : null}
                    </div>
                    <button className="my-5 ml-8 hover:bg-black py-2 px-4 hover:text-white font-bold border-2 border-black transition-all duration-700 ease-in-out">
                        Actualizar
                    </button>
                </form>
            </div>
        </div>
    )
}

export default FormProfile