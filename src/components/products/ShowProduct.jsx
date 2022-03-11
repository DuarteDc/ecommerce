import CloseIcon from '@mui/icons-material/Close';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import ProductInfo from "./ProductInfo";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const ShowProduct = ({ isOpen, closeModal }) => {
    const { productSelected } = useSelector((state) => state.products);
    return (
        <section>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={isOpen}
                onClose={closeModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={isOpen}>
                    <Box className="overflow-hidden drop-shadow-2xl w-11/12 md:w-7/12 border-2 mx-auto p-8 bg-white mt-5">
                        <span className="flex flex-row-reverse cursor-pointer" onClick={closeModal}>
                            <CloseIcon />
                        </span>
                        <ProductInfo product={productSelected} closeModal={closeModal} />
                    </Box>
                </Fade>
            </Modal>
        </section >
    )
}

export default ShowProduct;

