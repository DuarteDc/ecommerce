import React from "react";

export default function PasswordWebValidation() {
    return (
        <div className='bg-imgverification bg-principal-300 min-h-screen bg-cover bg-center bg-no-repeat static'>
            <div className="grid grid-cols-12 peque:grid-cols-1">
                <div className="col-start-7 col-end-13 py-3 peque:col-start-1">
                    <div className='bg-white font-semibold rounded border mr-10 mt-10 shadow-lg max-w peque:ml-10'>
                        <div className='py-5'>
                            <h1 className="text-center text-2xl font-semibold text-black">Verificacion de Correo</h1>
                            <div className="mt-10">
                                <div className="text-center text-principal text-sm ">
                                    <p>Antes de continuar por favor verifica tu correo</p>
                                    <p>electronico con el enlace que te</p>
                                    <p>hemos enviado mediante al correo que</p>
                                    <p>hayas proporcionado para la plataforma, puedes</p>
                                    <p>revisar la badeja de entrada o en SPAM</p>
                                </div>
                            </div>
                            <div className="mt-5">
                                <div className="text-center text-principal text-principal-300 text-sm ">
                                    <p>¿No has recibido ningun correo?</p>
                                </div>
                            </div>
                            <div className="mt-5">
                                <div className="text-center text-principal text-black text-sm ">
                                    <p>Da click en el siguiente botón para que</p>
                                    <p>te enviemos un nuevo enlace</p>
                                </div>
                            </div>
                            <div className="mt-5">
                                <div className="col-start-1 col-span-12 px-24">

                                    <button type='submit' class="
                                            bg-principal-100  rounded-full font-bold text-white w-full py-3 transition duration-300 ease-in-out hover:bg-principal-200
                                         ">Enviar Nuevo Enlace
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