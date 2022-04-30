import { useState } from 'react'
import ClearIcon from '@mui/icons-material/Clear';
import { setDefaultAddress, startDeleteAddress } from "../../../../src/actions/profileActions"
import { useDispatch } from 'react-redux';
import { errorNotify, infoNotify, successNotify } from '../../../helpers/helpers';
import { useModal } from '../../../hooks/useModal';
import FormAddress from '../FormAddress';
import { AiOutlinePlus } from 'react-icons/ai';
import { IconContext } from "react-icons";


const DirectionsSeccion = ({ directions }) => {

    const dispatch = useDispatch();

    const [showForm, setShowForm] = useState(false);

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
        <div className="w-full mt-10 p-8 flex px-5 lg:px-32 flex flex-col md:flex-row">
            {
                !showForm ? (
                    <>
                        <div
                            className="border-2 mt-5 w-full lg:w-72 h-72 mr-4 cursor-pointer overflow-hidden flex flex-col items-center justify-center border-dashed"
                            onClick={() => setShowForm(true)}
                        >
                            <div>
                                <IconContext.Provider
                                    value={{ className: "text-[#888] text-5xl" }}
                                >
                                    <AiOutlinePlus />
                                </IconContext.Provider>
                            </div>
                            <div>
                                <h2 className="text-lg">Agregar Dirección</h2>
                            </div>
                        </div>
                        <div className="lg:justify-start justify-center items-center animate__animated animate__fadeIn lg:flex">
                            {
                                directions?.map(address => (
                                    <div
                                        className={`border-2 ${address.default && 'border-gray-900'} mt-5 w-full md:w-72 h-72 mr-4 cursor-pointer relative`}
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
                                            <p className="font-semibold">{address.default && ' (Principal) :'}</p>
                                            <p className="font-light">
                                                {`${address?.street}, #${address?.no_int}, ${address?.city}, ${address?.postalcode}, ${address?.municipality?.name}, ${address?.state?.name}`}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </>
                ) : (
                    <FormAddress setShowForm={setShowForm} />
                )
            }
        </div>
    )
}

export default DirectionsSeccion