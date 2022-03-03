import { FormControl, TextField, InputLabel } from "@mui/material";
import Typography from '@mui/material/Typography';

//import Countdown from 'react-countdown';
//import Countdown from "../../src/components/cart/Countdown";
import Layout from "../../src/components/Layouts"

const Checkout = () => {
    const products = [1, 1, 1, 1, 1, 1, 1];
    return (
        <Layout>
            <section className="container mx-auto rounded-lg mt-20">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div>
                        <h3>Detalles de Facturación</h3>
                        <div>
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
                                    <TextField
                                        id="standard-name"
                                        name="fullname"
                                        type="password" />
                                </FormControl>
                                <FormControl fullWidth sx={{ mt: 2 }}>
                                    <TextField
                                        id="standard-name"
                                        name="fullname"
                                        type="password" />
                                </FormControl>
                            </Typography>
                        </div>
                    </div>
                    <div className="bg-blue-800">
                        d
                    </div>
                </div>
            </section>
        </Layout >
    )
}

export default Checkout
