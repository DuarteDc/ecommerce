import React, { useContext, useEffect } from 'react';
import Link from 'next/link';
import { OutlinedInput, Select, FormControl, MenuItem, InputLabel, Box, Fab, TextField } from '@mui/material';


// Importacion Para obtner los datos y validarlos
import { Form, Button } from "semantic-ui-react"
import { useFormik } from "formik"
import * as Yup from "yup"


export default function LoginView(props) {

    /*
        useEffect(() => {
            if(autenticado){
              props.history.push('/Main');
            }
            if(localStorage.getItem('token')){
              props.history.push('/Main');
            }
          }, [autenticado, props.history]);
           
    */

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: Yup.object(validationSchema()),
        onSubmit: (formData) => {
            console.log(formData)
            iniciarSesion(formData)

        }
    })




    return (
        <div className='
    biggr:bg-imgcreateaccount biggr:min-h-screen biggr:bg-cover biggr:bg-center biggr:bg-no-repeat biggr:static
    bg-imgcreateaccount min-h-screen bg-cover bg-center bg-no-repeat static
    peque:bg-none peque:bg-principal-100 
    '>
            <div className="
        grid grid-cols-12 peque:grid-cols-1
        ">
                <div className="col-start-7 col-end-13 py-3 peque:col-start-1">
                    <div className='bg-white font-semibold rounded border mx-10 mt-10 shadow-lg max-w'>
                        <div className='py-5'>
                            <h1 className="text-center text-2xl font-semibold text-black">Bienvenido</h1>
                        </div>
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
                    </div>

                </div>
            </div>
            <div className="grid grid-cols-12">
                <div className="col-start-9 col-end-13 py-3">
                    <div className='flex justify-end'>
                        <Link href='/Auth/Sign-Up'>
                            <a className="
                                        bg-principal-100 rounded-full font-bold text-white px-20 py-3 transition duration-300 ease-in-out hover:bg-principal-200
                                         biggr:bg-principal-100 biggr:rounded-full biggr:font-bold biggr:text-white biggr:px-20 biggr:py-3 biggr:transition biggr:duration-300 biggr:ease-in-out biggr:hover:bg-principal-200 biggr:mr-6
                                          peque:bg-principal-100 peque:rounded-full peque:font-bold peque:border peque:text-white peque:px-20 peque:py-3 peque:transition peque:duration-300 peque:ease-in-out peque:hover:bg-principal-200 peque:mr-6
                            ">Registrar</a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    )
}


function initialValues() {
    return {
        email: "",
        password: ""
    }
}

function validationSchema() {
    return {
        email: Yup.string().email(true).required("Correo requerido"),
        password: Yup.string().min(8).required("Contraseña requerida")
    }
}