import React from 'react';
import Link from 'next/link';
import { FormSignUp } from '../../../src/components/auth/formSignUp';


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
                        <FormSignUp/>
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
