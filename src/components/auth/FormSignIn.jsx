import { Box, FormControl, TextField , Button} from "@mui/material";
import {  useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { Form } from "semantic-ui-react";
import * as Yup from 'yup';
import { startLoginEmailPassword } from "../../actions/authActions";


export const FormSignIn = () => {

    const dispatch = useDispatch();
    const router = useRouter();
    const initialValues = {
        email:'',
        password:''
    }
    const validationSchema = {
        email: Yup.string().email(true).required("Correo requerido"),
        password: Yup.string().min(8).required("Contraseña requerida")
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object(validationSchema),
        onSubmit: (formData) => {
            dispatch(startLoginEmailPassword(formData));
            router.replace('/')
        }
    });
    
    return (
    <Form onSubmit={formik.handleSubmit}>
        <Box sx={{ minWidth: 120 }} className='px-7 pb-3'>
            <FormControl fullWidth>
                <p className="uppercase my-2">Correo electronico</p>
                <input
                    name='email'
                    onChange={formik.handleChange}
                    placeholder="Correo electronico"
                    error={formik.errors.email}
                    label="Correo Electronico"
                    helperText={formik.errors.email}
                />
            </FormControl>
        </Box>
        <Box sx={{ minWidth: 120 }} className='px-7 pb-3'>
            <FormControl fullWidth>
            <p className="uppercase my-2">Contraseña</p>
                <input
                    name='password'
                    onChange={formik.handleChange}
                    placeholder="Contraseña"
                    type='password'
                    error={formik.errors.password}                    
                    className="py-4 bg-gray-50  focus:outline-none focus:border-black focus:ring-1 focus:ring-gray-900 px-5"
                />
            </FormControl>
        </Box>

        <div className="text-right text-gray-500 text-sm font-semibold px-7 my-3">
            <Link href='/Auth/PassFV'>
                <a className="hover:text-black transition-all duration-700 ease-out">¿Has olvidado la contraseña?</a>
            </Link>
        </div>
        <div className="px-7">
            <button className="bg-black w-full text-white py-4 uppercase hover:bg-white border-2 border-black hover:text-black transition-all duration-700 ease-in-out">
                Iniciar Sesion
            </button>
        </div>
    </Form>
    );
}