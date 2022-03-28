import React from 'react'
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

    const router = useRouter();

    const handleDeleteAddress = async (address_id) => {

        const { hasError, message } = await dispatch(startDeleteAddress(address_id));

        if (hasError) {
            errorNotify(message);
            return;
        }
        successNotify(message);
    }

    return (
        <div className="w-full mt-10 p-8 border-gray-200 border-2">
            <div className="flex items-center justify-between">
                <p className="text-xl font-bold">Direcciones:</p>
                <button
                    className="border-2 border-[#222]  
                            hover:text-white hover:bg-[#222] font-semibold 
                            transition-all duration-700 ease-in-out px-2"
                    onClick={openModalAddress}
                >
                    Añadir Dirección
                </button>
            </div>
            <div className="flex flex-col lg:flex-row lg:justify-start justify-center items-center">
                {
                    directions?.map(address => (
                        <div
                            className={`border-2 ${address.default && 'border-gray-900'} w-60 h-60 mr-4 cursor-pointer relative overflow-hidden `}
                            key={address._id}
                        >
                            <ClearIcon
                                className="absolute right-0 m-2 hover:text-red-600"
                                onClick={() => { handleDeleteAddress(address._id) }}
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
                        </div>
                    ))
                }
            </div>
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