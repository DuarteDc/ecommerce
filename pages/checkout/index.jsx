import { FormControl, TextField } from "@mui/material";
import Typography from '@mui/material/Typography';

//import Countdown from 'react-countdown';
//import Countdown from "../../src/components/cart/Countdown";
import Layout from "../../src/components/Layouts"

const Checkout = () => {
    const products = [1, 1, 1, 1, 1, 1, 1];
    return (
        <Layout>
            <section className="container mx-auto rounded-lg mt-20">
                <h1 className="text-center uppercase text-2xl bg-gray-50 py-3 mt-10 font-bold container mx-auto">Detalles de facturación</h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 drop-shadow-2xl md:my-10">
                    <div className="p-5">
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <FormControl fullWidth sx={{ mt: 2 }}>
                                <p>Nombre Completo</p>
                                <TextField
                                    id="name"
                                    name="fullname"
                                    value="Lorem ipsum dolor sit amet consectetur adipisicing"
                                    type="text" />
                            </FormControl>
                            <FormControl fullWidth sx={{ mt: 2 }}>
                                <p>Dirección</p>
                                <TextField
                                    id="standard-name"
                                    value="Lorem ipsum dolor sit amet consectetur adipisicing"
                                    name="fullname"
                                    type="text" />
                            </FormControl>
                            <FormControl fullWidth sx={{ mt: 2 }}>
                                <p>Correo Electronico</p>
                                <TextField
                                    id="standard-name"
                                    value="Lorem ipsumamet@adipisicing.com"
                                    name="fullname"
                                    type="email" />
                            </FormControl>
                            <FormControl fullWidth sx={{ mt: 2 }}>
                                <p>Telefono</p>
                                <TextField
                                    id="standard-name"
                                    name="fullname"
                                    value="7282918390"
                                    type="text" />
                            </FormControl>
                        </Typography>
                    </div>
                    <div className="p-5">
                        <p className="p-5 uppercase font-bold">Mi orden</p>
                        <table className="w-full">
                            <thead>
                                <tr className="text-left bg-gray-900 text-white uppercase text-sm">
                                    <th className="py-5">Producto</th>
                                    <th className="py-5">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b-2 border-gray-900 text-gray-500">
                                    <td className="py-4">Malcolm Lockyer</td>
                                    <td className="py-4">$1961</td>
                                </tr>
                                <tr className="border-b-2 border-gray-900 text-gray-500">
                                    <td className="py-4">Malcolm Lockyer</td>
                                    <td className="py-4">$1961</td>
                                </tr>
                                <tr className="border-b-2 border-gray-900 text-gray-500">
                                    <td className="py-4">Malcolm Lockyer</td>
                                    <td className="py-4">$1961</td>
                                </tr>
                                <tr className="border-b-2 border-gray-900 text-gray-500">
                                    <td className="py-4">Malcolm Lockyer</td>
                                    <td className="py-4">$1961</td>
                                </tr>
                                <tr className="border-b-2 border-gray-900 text-gray-500">
                                    <td className="py-4">Malcolm Lockyer</td>
                                    <td className="py-4">$1961</td>
                                </tr>
                                <tr className="border-b-2 border-gray-900 font-semibold">
                                    <td className="py-4">Subtotal</td>
                                    <td className="py-4">$1961</td>
                                </tr>
                                <tr className="border-b-2 border-gray-900 font-semibold">
                                    <td className="py-4">Envio</td>
                                    <td className="py-4">$1961</td>
                                </tr>
                                <tr className="border-b-2 border-gray-900 font-semibold">
                                    <td className="py-4">Total</td>
                                    <td className="py-4">$1961</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </Layout >
    )
}

export default Checkout
