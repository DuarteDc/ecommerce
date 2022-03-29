import { useModal } from "../../../hooks/useModal";
import EditIcon from '@mui/icons-material/Edit';
import FormChangePassword from "../FormChangePassword";

const SeguritySection = () => {

    const [isOpen, openModal, closeModal] = useModal();

    return (
        <div className="w-full border-gray-200 border-2 mt-10 p-8">
            <div className="flex items-center justify-between">
                <p className="text-xl font-bold">Seguridad:</p>
                <p className="text-second-100 cursor-pointer text-lg"
                    onClick={openModal}
                >Editar</p>
            </div>
            <div className="flex mt-4 md:ml-20 items-center">
                <p className="font-light">Contraseña:</p>
                <p className="ml-2 mt-1">••••••••••••••••</p>
            </div>
            {
                isOpen && (
                    <FormChangePassword
                        isOpen={isOpen}
                        closeModal={closeModal}
                    />
                )
            }
        </div>
    )
}

export default SeguritySection