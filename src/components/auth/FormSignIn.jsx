import { Box, FormControl, TextField , Button} from "@mui/material";
import {  useFormik } from "formik";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { Form } from "semantic-ui-react";
import * as Yup from 'yup';
import { startLoginEmailPassword } from "../../actions/authActions";


export const FormSignIn = () => {

    const dispatch = useDispatch();

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
        }
    });
    
    return (
    <Form onSubmit={formik.handleSubmit}>
        <Box sx={{ minWidth: 120 }} className='px-7 pb-3'>
            <FormControl fullWidth>
                <TextField
                    id="outline"
                    color="warning"
                    name='email'
                    onChange={formik.handleChange}
                    error={formik.errors.email}
                    label="Correo Electronico"
                    helperText={formik.errors.email}

                />
            </FormControl>
        </Box>
        <Box sx={{ minWidth: 120 }} className='px-7 pb-3'>
            <FormControl fullWidth>
                <TextField
                    id="outline-pass"
                    name='password'
                    onChange={formik.handleChange}
                    type='password'
                    color="warning"
                    error={formik.errors.password}
                    label="Contraseña"
                    helperText={formik.errors.password}
                />
            </FormControl>
        </Box>

        <div className="text-right text-principal text-sm italic mr-10">
            <Link href='/Auth/PassFV'>
                <a>¿Has olvidado la contraseña?</a>
            </Link>
        </div>
        <div className='ml-2 mb-2 mt-1'>

        </div>
        <div className='flex justify-end pb-1 pr-1'>
            <Button type='submit' className="
                    bg-principal-100 rounded-full font-bold text-white px-20 py-3 transition duration-300 ease-in-out hover:bg-principal-200
                     biggr:bg-principal-100 biggr:rounded-full biggr:font-bold biggr:text-white biggr:px-20 biggr:py-3 biggr:transition biggr:duration-300 biggr:ease-in-out biggr:hover:bg-principal-200 biggr:mr-6
                      peque:bg-principal-100 peque:rounded-full peque:font-bold peque:border peque:text-white peque:px-20 peque:py-3 peque:transition peque:duration-300 peque:ease-in-out peque:hover:bg-principal-200 peque:mr-6
        ">
                Iniciar Sesion
            </Button>
        </div>
    </Form>
    );
}