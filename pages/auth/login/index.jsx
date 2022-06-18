import { useEffect } from "react";
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { startLoadAdministrableLogo } from '../../../src/actions/administrableActions'
import { FormSignIn } from '../../../src/components/auth/FormSignIn'
import Layout from '../../../src/components/Layouts'
import { wrapper } from '../../../src/store'
import { useSelector, useDispatch } from 'react-redux';

import { shoppingCartNotLoggedfromLocalStorage } from '../../../src/actions/shoppingCartActions'


const Login = () => {

  const router = useRouter();
  const dispatch = useDispatch();

  const { logged } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!logged) {
      let cartNotLogged = localStorage.getItem('cartNotlogged') ? JSON.parse(localStorage.getItem('cartNotlogged')) : [];
      dispatch(shoppingCartNotLoggedfromLocalStorage(cartNotLogged))
    }
  }, [logged]);

  return (
    <Layout>
      <section className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen mt-48 font-Poppins">
          <div className="px-7">
            <h1 className="py-4 bg-gray-50 text-center uppercase font-bold mb-10 md:mt-10">Iniciar Sesión</h1>
            <FormSignIn />
          </div>
          <div className="px-7 mb-44">
            <h1 className="py-4 bg-gray-50 text-center uppercase font-bold my-10">Nuevo Cliente</h1>
            <h2 className="font-bold my-3 text-lg">Crear una cuenta</h2>
            <p className="text-left font-light">
              Regístrese para obtener una cuenta gratuita en nuestra tienda. Registrarse es facil y rapido. Le permite poder hacer pedidos en nuestra tienda. Para comenzar a comprar, haga clic en crear cuenta.
            </p>
            <Link
              href={router.query.p ? `/auth/register?p=${router.query.p}` : '/auth/register'}
            >
              <a type="submit" className="mt-10 cursor-pointer bg-[#222] w-5/12 text-white py-4 uppercase hover:bg-white border-2 border-[#222] transition-all hover:text-[#222] duration-700 ease-in-out text-center">Crear cuenta</a>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export const getStaticProps = wrapper.getStaticProps((store) =>
  async () => {
    await store.dispatch(startLoadAdministrableLogo());
    return{
      revalidate: 3600
    }
  });



export default Login