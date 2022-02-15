import { Box, FormControl, TextField , Button} from "@mui/material";
import {  useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { Form } from "semantic-ui-react";
import * as Yup from 'yup';
import { startRegister } from "../../actions/authActions";

const FormSignUp = () => {

    const dispatch = useDispatch();
    const router = useRouter();


    const initialValues = {
        fullname:'',
        email:'',
        password:''
    }
    const validationSchema = {
        fullname: Yup.string().min(8).required("El nombre es requerido"),
        email: Yup.string().email(true).required("Correo requerido"),
        password: Yup.string().min(8).required("Contraseña requerida")
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object(validationSchema),
        onSubmit: (formData) => {
            dispatch(startRegister(formData));
            router.push('/PassFV');
        }
    });
    

    return (
        <Form onSubmit={formik.handleSubmit}>
            <div className="">
                <div class="">
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <TextField
                                id="standard-name"
                                onChange={formik.handleChange}
                                label="Nombre(s)"
                                name="fullname"
                                color="warning"
                                error={formik.errors.fullname}
                                helperText={formik.errors.fullname}
                                variant="standard" />
                        </FormControl>
                    </Box>
                </div>
                <div class="">
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <TextField
                                id="standard-email"
                                onChange={formik.handleChange}
                                label="Correo electronico"
                                name="email"
                                color="warning"
                                error={formik.errors.email}
                                helperText={formik.errors.email}
                                variant="standard" />
                        </FormControl>
                    </Box>
                </div>
                <div class="">
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <TextField
                                id="standard-password"
                                onChange={formik.handleChange}
                                label="Contraseña"
                                type='password'
                                name="password"
                                color="warning"
                                error={formik.errors.password}
                                helperText={formik.errors.password}
                                variant="standard" />
                        </FormControl>
                    </Box>
                </div>
                <div className="mt-5">
                    <button type='submit' class="
                        bg-principal-100 rounded-full font-bold text-white w-full py-3 transition duration-300 ease-in-out hover:bg-principal-200
                     ">Registrar
                    </button>
                    <div className="text-center text-principal text-sm italic">
                        <Link href='/'>
                            <a>¿Ya tienes Cuenta?</a>
                        </Link>
                    </div>
                </div>
            </div>
        </Form>
    )
}

export default FormSignUp