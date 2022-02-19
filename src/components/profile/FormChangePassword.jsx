import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FormControl, TextField } from "@mui/material";

const FormChangePassword = ({ isOpen, closeModal }) => {
    return (
        <div>
            <Modal
                open={isOpen}
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="overflow-hidden w-11/12 md:w-5/12  mx-auto p-8 bg-white mt-5">
                    <h2 className="font-bold text-xl">
                        Cambiar Contraseña
                    </h2>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <TextField
                                label="Contraseña Actual"
                                id="standard-name"
                                name="fullname"
                                type="password"/>
                        </FormControl>
                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <TextField
                                label="Nueva Contraseña"
                                id="standard-name"
                                name="fullname"
                                type="password"/>
                        </FormControl>
                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <TextField
                                label="Confirmar Contraseña"
                                id="standard-name"
                                name="fullname"
                                type="password"/>
                        </FormControl>
                    </Typography>
                    <button className="bg-black w-full py-4 mt-5 font-bold text-white text-lg hover:bg-white border-2 border-black hover:text-black
                    transition-all duration-700 ease-in-out border-4">
                        Cambiar
                    </button>
                </Box>
            </Modal>
        </div>
    )
}

export default FormChangePassword