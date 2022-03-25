
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { startLoadAdministrableLogo } from '../../../src/actions/administrableActions'
import { FormSignIn } from '../../../src/components/auth/FormSignIn'
import Layout from '../../../src/components/Layouts'
import { wrapper } from '../../../src/store'


const Login = () => {

  const router = useRouter();


  return (
    <Layout>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 h-screen mt-48">
        <div className="px-7">
          <h1 className="py-4 bg-gray-50 text-center uppercase font-bold mt-10">Iniciar Sesión</h1>
          <FormSignIn />
        </div>
        <div className="px-7">
          <h1 className="py-4 bg-gray-50 text-center uppercase font-bold mt-10">Nuevo Cliente</h1>
          <h2 className="font-bold my-3 text-lg">Crear una cuenta</h2>
          <p className="text-left">
            Regístrese para obtener una cuenta gratuita en nuestra tienda. Registrarse es facil y rapido. Le permite poder hacer pedidos en nuestra tienda. Para comenzar a comprar, haga clic en registrarse.
          </p>
          <Link
            href={router.query.p ? `/auth/register?p=${router.query.p}` : '/auth/register'}
          >
            <a type="submit" className="w-5/12 text-black py-4 uppercase hover:bg-black border-2 border-black hover:text-white transition-all duration-700 ease-in-out mt-10 text-center">Crear cuenta</a>
          </Link>
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps = wrapper.getStaticProps((store) =>
  async () => {
    await store.dispatch(startLoadAdministrableLogo());
    return {
      revalidate:120
    }
});



export default Login