import React,{useState} from "react";
import Link from "next/link";
import {Select,FormControl,MenuItem,TextField,Box ,InputLabel} from '@mui/material';
import {Form,Button} from "semantic-ui-react"
import {useFormik} from "formik"
import * as Yup from "yup"

export default function CreateAccount() {

    const [Estado, SetEstado] = useState(null);
    const [Municipio, SetMunicipio] = useState(null);

        const handleChange = (event) => {
          SetEstado(event.target.value);
        }

        const handleChangeMuni = (event) => {
            SetMunicipio(event.target.value);
          }


        const formik = useFormik({
            initialValues:initialValues(),
            validationSchema:Yup.object(validationSchema()),
            onSubmit: async (formData)=>{
                console.log(formData)
                let url = "/auth/register";
                await MethodPost(url, formData, { headerConfig })
                .then(res => {
                    console.log(res.data.message);
                    props.history.push("/Dashboard");
                })
                .catch(error => {
                    console.log(error)
                });
                    console.log(formData)
                }
            })

    return(
        <div>
            <div className="
                biggr:bg-imgcreateaccount biggr:min-h-screen biggr:bg-cover biggr:bg-center biggr:bg-no-repeat biggr:static
                bg-imgcreateaccountc min-h-screen bg-cover bg-center bg-no-repeat static
                peque:bg-none peque:bg-principal-100
            
            ">
                <div className="
                    grid grid-cols-12 peque:grid-cols-1
                ">
                    <div class="
                        col-start-8 col-end-13 py-2 mr-5 mt-5  peque:ml-1
                        ">
                        <div class="bg-white shadow-md border border-gray-200 rounded-lg p-4">
                        <div className='py-1'>
                        <h1 className="text-center text-2xl font-semibold text-black">Crear Cuenta</h1>
                    </div>
                            <Form onSubmit={formik.handleSubmit}>
                                <div className="
                                grid grid-cols-12 gap-8 
                                 
                                ">
                                    <div class="col-start-1 col-span-6 ">
                                        <Box sx={{ minWidth: 120 }}>
                                            <FormControl fullWidth>
                                                <TextField 
                                                    id="standard-lastname"
                                                    onChange={formik.handleChange} 
                                                    label="Apellidos(s)"
                                                    name="lastname"
                                                    color="warning" 
                                                    error={formik.errors.lastname}
                                                    helperText={formik.errors.lastname} 
                                                    variant="standard" />
                                                </FormControl>
                                        </Box>
                                    </div>
                                    <div class="col-start-7 col-span-6">
                                    <Box sx={{ minWidth: 120 }}>
                                            <FormControl fullWidth>
                                                <TextField 
                                                    id="standard-name"
                                                    onChange={formik.handleChange} 
                                                    label="Nombre(s)"
                                                    name="name"
                                                    color="warning" 
                                                    error={formik.errors.name}
                                                    helperText={formik.errors.name} 
                                                    variant="standard" />
                                                </FormControl>
                                        </Box>
                                    </div>

                                    <div class="col-start-1 col-span-6">
                                        <Box sx={{ minWidth: 120 }}>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label" color='warning'>Estado</InputLabel>
                                                <Select labelId="demo-simple-select-label" id="demo-simple-select" color='warning' value={Estado} label="Estado" onChange={handleChange}>
                                                    <MenuItem value={10}>Ten</MenuItem>
                                                    <MenuItem value={20}>Twenty</MenuItem>
                                                    <MenuItem value={30}>Thirty</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </div>

                                    <div class="col-start-7 col-span-6 ">
                                        <Box sx={{ minWidth: 120 }}>
                                            <FormControl fullWidth>
                                                <InputLabel id="Municipio-label" color='warning'>Municipio</InputLabel>
                                                    <Select labelId="Municipio-label" id="select-municipio" color='warning' value={Municipio} label="Municipio" onChange={handleChangeMuni}>
                                                        <MenuItem value={10}>Ten</MenuItem>
                                                        <MenuItem value={20}>Twenty</MenuItem>
                                                        <MenuItem value={30}>Thirty</MenuItem>
                                                    </Select>
                                            </FormControl>
                                        </Box>
                                    </div>

                                    <div class="col-start-1 col-span-6">
                                        <Box sx={{ minWidth: 120 }}>
                                            <FormControl fullWidth>
                                                <TextField 
                                                    id="standard-cellphone"
                                                    onChange={formik.handleChange} 
                                                    label="Telefono"
                                                    name="cellphone"
                                                    color="warning" 
                                                    error={formik.errors.cellphone}
                                                    helperText={formik.errors.cellphone} 
                                                    variant="standard" />
                                                </FormControl>
                                        </Box>
                                    </div>

                                    <div class="col-start-7 col-span-6">
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



                                    <div class="col-start-1 col-span-6">
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
                                        </Box>                                    </div>

                                    <div class="col-start-7 col-span-6">
                                    <Box sx={{ minWidth: 120 }}>
                                            <FormControl fullWidth>
                                                <TextField 
                                                    id="standard-passwordv"
                                                    onChange={formik.handleChange} 
                                                    label="Confirma la contraseña"
                                                    type="password"
                                                    name="passwordv"
                                                    color="warning" 
                                                    error={formik.errors.passwordv}
                                                    helperText={formik.errors.passwordv} 
                                                    variant="standard" />
                                                </FormControl>
                                        </Box>                                    </div>
                                    <div className="col-start-1 col-span-12">
                                        
                                            <button type='submit'class="
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
    
}

function initialValues() {
    return{
        lastname:"",
        name:"",
        email:"",
        cellphone:"",
        password:"",
        passwordv:""

    }  
}

function validationSchema() {
    return{
        lastname:Yup.string().required("Esté campo es requerido o es incorrecto"), 
        name:Yup.string().required("Esté campo es requerido o es incorrecto"), 
        email:Yup.string().email(true).required("Esté campo es requerido o es incorrecto"), 
        cellphone:Yup.string().min(10).max(13).required("Este campo es requerido o invalido , necesita minimo 10 caracteres o incluyendo lada"), 
        passwordv:Yup.string().min(8).required("La contraseña es requerida o es incorrecto , necesita al menos 8 caracteres"), 
        password:Yup.string().min(8).required("La contraseña es requerida o es incorrecto , necesita al menos 8 caracteres")
    }
}