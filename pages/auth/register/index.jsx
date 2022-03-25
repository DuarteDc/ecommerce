import React from 'react'
import { startLoadAdministrableLogo } from '../../../src/actions/administrableActions'
import FormSignUp from '../../../src/components/auth/FormSignUp'
import Layout from '../../../src/components/Layouts'
import { wrapper } from '../../../src/store'

const index = () => {
  return (
    <Layout>
      <section className="h-screen container mx-auto">
        <h1 className="py-4 bg-gray-50 text-center uppercase font-bold mt-20">Crear Cuenta</h1>
          <FormSignUp />
      </section>
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


export default index