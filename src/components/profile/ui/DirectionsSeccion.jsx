import { useState } from 'react'
import ClearIcon from '@mui/icons-material/Clear';
import { setDefaultAddress, startDeleteAddress } from "../../../../src/actions/profileActions"
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { errorNotify, infoNotify, successNotify } from '../../../helpers/helpers';
import { useModal } from '../../../hooks/useModal';
import FormAddress from '../FormAddress';


const DirectionsSeccion = ({ directions }) => {

    const dispatch = useDispatch();

    const [isOpenAddress, openModalAddress, closeModalAddres] = useModal();

    const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);

    const selectDefaultDirection = async (direction_id, address_defaul) => {

        if (address_defaul) {
            infoNotify("La dirección ya esta establecida como principal");
            return;
        }

        const { hasError, message } = await dispatch(setDefaultAddress('', direction_id));

        if (hasError) {
            errorNotify(message);
            return;
        }
        successNotify(message);
    }

    const handleDeleteAddress = async (address_id, address_default) => {

        if (address_default) {
            return infoNotify("No se puede eliminar la dirección porque esta establecida como principal");
        }

        const { hasError, message } = await dispatch(startDeleteAddress(address_id));

        if (hasError) {
            errorNotify(message);
            return;
        }
        successNotify(message);
    }

    return (
        <div className={`w-full mt-10 p-8 border-gray-200 border-2 `}>
            <div className="flex items-center justify-between">
                <p className="text-xl font-bold">Direcciones:</p>
                {
                    isAddingNewAddress ? (
                        <button
                            className="border-2 border-[#222]  
                            hover:text-white hover:bg-[#222]
                            transition-all duration-700 ease-in-out px-4 py-1"
                            onClick={() => setIsAddingNewAddress(false)}
                        >
                            Cancelar
                        </button>
                    ) : (
                        <button
                            className="border-2 border-[#222]  
                            hover:text-white hover:bg-[#222]
                            transition-all duration-700 ease-in-out px-4 py-1"
                            onClick={() => setIsAddingNewAddress(true)}
                        >
                            Añadir Dirección
                        </button>
                    )
                }

            </div>
            {
                isAddingNewAddress ? (
                    <FormAddress setIsAddingNewAddress={setIsAddingNewAddress} />
                ) : (
                    <div className="flex flex-col md:flex-row lg:justify-start justify-center items-center animate__animated animate__fadeIn">
                        {
                            directions?.map(address => (
                                <div
                                    className={`border-2 ${address.default && 'border-gray-900'} mt-5 w-11/12 md:w-60 h-60 mr-4 cursor-pointer relative overflow-hidden `}
                                    key={address._id}
                                    disabled="disabled"
                                >
                                    <ClearIcon
                                        className="absolute right-0 m-2 hover:text-red-600"
                                        onClick={() => { handleDeleteAddress(address._id, address.default) }}
                                    />
                                    <div
                                        onClick={() => selectDefaultDirection(address._id, address.default)}
                                        className="p-10"
                                    >
                                        <p className="font-semibold">{address.default && ' (Por defecto) :'}</p>
                                        <p className="font-light">
                                            {`${address?.street}, #${address?.no_int}, ${address?.city}, ${address?.postalcode}, ${address?.municipality?.name}, ${address?.state?.name}`}
                                        </p>
                                    </div>
                                    <p className="absolute bottom-2 right-4 cursor-pointer">Editar</p>
                                </div>
                            ))
                        }
                    </div>
                )
            }

            {
                isOpenAddress && (
                    <FormAddress
                        isOpen={isOpenAddress}
                        closeModal={closeModalAddres}
                    />
                )
            }
        </div>
    )
}

export default DirectionsSeccion