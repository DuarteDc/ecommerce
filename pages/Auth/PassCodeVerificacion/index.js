import React from "react";
import {TextField} from '@mui/material';
import Link from "next/link";
import {useFormik} from "formik"
import * as Yup from "yup"


export default function PassCodeVeri() {
    return(
        <div className='bg-imgverification bg-principal-300 min-h-screen bg-cover bg-center bg-no-repeat static'>
            <div className="grid grid-cols-12 peque:grid-cols-1">
                <div className="col-start-8 col-end-13 py-3 peque:col-start-1">
                    <div className='bg-white font-semibold rounded border mr-10 mt-10 shadow-lg max-w peque:ml-10'>
                        <div className='py-5'>
                            <h1 className="text-center text-2xl font-semibold text-black">Verificacion de Telefono</h1>
                            <div className="mt-10">
                                <div className="text-center text-principal text-sm ">
                                    <p>Te hemos enviado un mensaje de</p>
                                    <p>texto con un código, al número de</p>
                                    <p>teléfono que has registrado, por favor</p>
                                    <p>ingrésalo a continuación para verificar</p>
                                    <p>tu identidad</p>
                                </div>
                           </div>
                           <div className="mx-1 my-1 px-10">
                               <form>
                                   <div className="grid grid-cols-6 gap-x-4 peque:grid-cols-6">
                                        <div className="col-start-1  py-3 peque:col-start-1">
                                            <TextField
                                            required 
                                                label="0-9"
                                                type="text"
                                                inputProps={{ maxLength: 1 }}
                                                variant="standard"
                                                alignCenter
                                            />
                                        </div>
                                        <div className="col-start-2  py-3 peque:col-start-2">
                                            <TextField
                                            required
                                                label="0-9"
                                                type="text"
                                                inputProps={{ maxLength: 1 }}
                                                variant="standard"
                                                alignCenter
                                            />
                                        </div>
                                        <div className="col-start-3  py-3 peque:col-start-3">
                                            <TextField 
                                            required
                                                label="0-9"
                                                type="text"
                                                inputProps={{ maxLength: 1 }}
                                                variant="standard"
                                            />
                                        </div>
                                        <div className="col-start-4  py-3 peque:col-start-4">
                                            <TextField
                                                label="0-9"
                                                type="text"
                                                inputProps={{ maxLength: 1 }}
                                                variant="standard"
                                            />
                                        </div>
                                        <div className="col-start-5  py-3 peque:col-start-5">
                                            <TextField 
                                                label="0-9"
                                                type="text"
                                                inputProps={{ maxLength: 1 }}
                                                variant="standard"
                                            />
                                        </div>
                                        <div className="col-start-6  py-3 peque:col-start-6">
                                            <TextField
                                                label="0-9"
                                                type="text"
                                                inputProps={{ maxLength: 1 }}
                                                variant="standard"
                                            />
                                        </div>
                                        <div className="col-start-1 col-span-6 py-3 peque:col-start-1">
                                            <button type='submit'class="        
                                                                bg-principal-100 rounded-full font-bold text-white w-full py-3 transition duration-300 ease-in-out hover:bg-principal-200
                                            ">Verificar Codigo</button>
                                        </div>
                                    </div>    
                                </form>
                                <div className="text-center text-principal-300 text-sm italic">
                                    <Link href=''>
                                        <a>¿No recibiste ningún código?</a>
                                    </Link>
                            </div>
                            <div className="ml-15 pl-15">
                                <button className="
                                        bg-principal-100 rounded-full font-bold text-white px-20 py-3 transition duration-300 ease-in-out hover:bg-principal-200
                                        biggr:bg-principal-100 biggr:rounded-full biggr:font-bold biggr:text-white biggr:px-20 biggr:py-3 biggr:transition biggr:duration-300 biggr:ease-in-out biggr:hover:bg-principal-200 biggr:mr-6
                                        peque:bg-principal-100 peque:rounded-full peque:font-bold peque:border peque:text-white peque:px-20 peque:py-3 peque:transition peque:duration-300 peque:ease-in-out peque:hover:bg-principal-200 peque:mr-6
                                    ">Solicitar Nuevo Cupon
                                </button>
                            </div>
                           </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                            
    )   
}

