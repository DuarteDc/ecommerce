import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { FormControl, TextField, InputLabel } from "@mui/material";

const FormChangePassword = ({ isOpen, closeModal }) => {
    return (
        <div>
            <Modal
                open={isOpen}
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="overflow-hidden drop-shadow-2xl w-11/12 md:w-5/12 border-2 mx-auto p-8 bg-white mt-5">
                    <h2 className="font-bold text-xl">
                        Cambiar Contraseña
                    </h2>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <TextField
                                label="Contraseña Actual"
                                id="standard-name"
                                name="fullname"
                                type="password"
                                color="warning" />
                        </FormControl>
                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <TextField
                                label="Nueva Contraseña"
                                id="standard-name"
                                name="fullname"
                                type="password"
                                color="warning" />
                        </FormControl>
                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <TextField
                                label="Confirmar Contraseña"
                                id="standard-name"
                                name="fullname"
                                type="password"
                                color="warning" />
                        </FormControl>
                    </Typography>
                    <button className="bg-[#f58d16] w-full py-4 mt-5 font-bold text-white text-lg">
                        Cambiar
                    </button>
                </Box>
            </Modal>
        </div>
    )
}

export default FormChangePassword