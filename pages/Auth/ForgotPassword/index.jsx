
import React, { useContext, useEffect } from 'react';
import { FormControl, Box, TextField } from '@mui/material';

import { Form, Button } from "semantic-ui-react"
import { useFormik } from "formik"
import * as Yup from "yup"

const ForgotPassword = () => {
    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: (formData) => {
            console.log(formData)
        }
    })

    return (
        <div className='bg-imgverification bg-principal-300 min-h-screen bg-cover bg-center bg-no-repeat static'>
            <div className="grid grid-cols-12 peque:grid-cols-1">
                <div className="col-start-7 col-end-13 py-3 peque:col-start-1">
                    <div className='bg-white font-semibold rounded border mr-10 mt-10 shadow-lg max-w peque:ml-10'>
                        <div className='py-5'>
                            <h1 className="text-center text-2xl font-semibold text-black">Recuperación de contraseña</h1>
                            <div className="my-5">
                                <p className='px-8 mb-5'>Ingresa tu correo para continuar</p>
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
                                    <div className='flex justify-end pb-1 pr-1'>
                                        <Button type='submit' className="
                                        bg-principal-100 rounded-full font-bold text-white px-20 py-3 transition duration-300 ease-in-out hover:bg-principal-200
                                         biggr:bg-principal-100 biggr:rounded-full biggr:font-bold biggr:text-white biggr:px-20 biggr:py-3 biggr:transition biggr:duration-300 biggr:ease-in-out biggr:hover:bg-principal-200 biggr:mr-6
                                          peque:bg-principal-100 peque:rounded-full peque:font-bold peque:border peque:text-white peque:px-20 peque:py-3 peque:transition peque:duration-300 peque:ease-in-out peque:hover:bg-principal-200 peque:mr-6
                            ">
                                            Enviar Correo
                                        </Button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
function initialValues() {
    return {
        email: "",
    }
}

function validationSchema() {
    return {
        email: Yup.string().email("El correo no es valido").required("Correo requerido"),
    }
}
export default ForgotPassword;