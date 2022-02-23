import React, { useState } from "react";
import Link from "next/link";
import { Select, FormControl, MenuItem, TextField, Box, InputLabel } from '@mui/material';
import { Form, Button } from "semantic-ui-react"
import { useFormik } from "formik"
import * as Yup from "yup"
import FormSignUp from "../../../src/components/auth/FormSignUp";

export default function CreateAccount() {

    const [Estado, SetEstado] = useState(null);
    const [Municipio, SetMunicipio] = useState(null);

    const handleChange = (event) => {
        SetEstado(event.target.value);
    }

    const handleChangeMuni = (event) => {
        SetMunicipio(event.target.value);
    }

    return (
        <div>
            <div className="
                biggr:bg-imgcreateaccount biggr:min-h-screen biggr:bg-cover biggr:bg-center biggr:bg-no-repeat biggr:static
                bg-imgcreateaccountc min-h-screen bg-cover bg-center bg-no-repeat static
                peque:bg-none peque:bg-principal-100">
                <div className="grid grid-cols-12 peque:grid-cols-1">
                    <div className="col-start-8 col-end-13 py-2 mr-5 mt-5  peque:ml-1">
                        <div className="bg-white shadow-md border border-gray-200 rounded-lg p-4">
                            <div className='py-1'>
                                <h1 className="text-center text-2xl font-semibold text-black">Crear Cuenta</h1>
                            </div>
                            <FormSignUp />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

function initialValues() {
    return {
        lastname: "",
        name: "",
        email: "",
        cellphone: "",
        password: "",
        passwordv: ""

    }
}

function validationSchema() {
    return {
        lastname: Yup.string().required("Esté campo es requerido o es incorrecto"),
        name: Yup.string().required("Esté campo es requerido o es incorrecto"),
        email: Yup.string().email(true).required("Esté campo es requerido o es incorrecto"),
        cellphone: Yup.string().min(10).max(13).required("Este campo es requerido o invalido , necesita minimo 10 caracteres o incluyendo lada"),
        passwordv: Yup.string().min(8).required("La contraseña es requerida o es incorrecto , necesita al menos 8 caracteres"),
        password: Yup.string().min(8).required("La contraseña es requerida o es incorrecto , necesita al menos 8 caracteres")
    }
}