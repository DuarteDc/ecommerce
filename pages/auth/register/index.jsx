import React from 'react'
import FormSignUp from '../../../src/components/auth/FormSignUp'
import Layout from '../../../src/components/Layouts'

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

export default index