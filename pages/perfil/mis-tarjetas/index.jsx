import { wrapper } from '../../../src/store'
import Layout from '../../../src/components/Layouts'
import { startLoadAdministrableLogo } from '../../../src/actions/administrableActions'
import { useSelector } from 'react-redux'

const MisTarjetas = () => {

    const { user } = useSelector((state) => state.auth);
    
    return (
        <Layout>
            <section className="bg-red-200">
                <div className="grid grid-cols-1 lg:grid-cols-2 pt-20 container mx-auto">
                    <div className="px-4">
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore, pariatur illum odit aut natus eos possimus voluptatum et? Doloremque id magni eveniet recusandae impedit eum quae illum nobis at voluptas.
                    </div>
                    <div className="flex justify-center">
                        <div className="w-9/12 lg:7/12 h-60 rounded-md border-gray-200 border-2 py-4 px-10">
                            <div className="flex justify-between">
                                <p className="uppercase font-bold">City</p>
                                <p>Wapizima</p>
                            </div>
                            <div className="flex justify-between">
                                <p>1234</p>
                                <p>5678</p>
                                <p>9102</p>
                                <p>3456</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export const getServerSideProps = wrapper.getServerSideProps((store) =>
    async () => {
        await store.dispatch(startLoadAdministrableLogo());
    })


export default MisTarjetas;