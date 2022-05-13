import { useState } from 'react'
import ClearIcon from '@mui/icons-material/Clear';
import { clearDirection, selectDirection, setDefaultAddress, startDeleteAddress } from "../../../../src/actions/profileActions"
import { useDispatch, useSelector } from 'react-redux';
import { errorNotify, infoNotify, successNotify } from '../../../helpers/helpers';
import { useModal } from '../../../hooks/useModal';
import FormAddress from '../FormAddress';
import { AiOutlinePlus } from 'react-icons/ai';
import { IconContext } from "react-icons";


const DirectionsSeccion = ({ directions }) => {

    const dispatch = useDispatch();

    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const { direction } = useSelector(state => state.profile);

    const handleEditDirecction = async (direction) => {

        if (!direction) return;
        setIsEditing(true);
        dispatch(selectDirection(direction));
        setShowForm(true);

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
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {
                !showForm ? (
                    <>
                        <div
                            className="border-2 border-gray-400 mt-5 w-11/12 mx-auto h-72 mr-4 cursor-pointer overflow-hidden flex flex-col items-center justify-center border-dashed"
                            onClick={() => { setShowForm(true); dispatch(clearDirection()); setIsEditing(false) }}
                        >
                            <div>
                                <IconContext.Provider
                                    value={{ className: "text-[#888] text-5xl" }}
                                >
                                    <AiOutlinePlus />
                                </IconContext.Provider>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold font-Poppins">Agregar Dirección</h2>
                            </div>
                        </div>
                        {
                            directions?.map(direction => (
                                <div
                                    className="relative border-gray-300 border-2 mt-5 w-11/12 mx-auto h-72 mr-4 cursor-pointer overflow-hidden flex flex-col py-10 px-10"
                                >
                                    <div>
                                        <p className="font-bold mb-2 text-lg">{direction.name}</p>
                                        <p className="uppercase text-sm font-medium">{direction.street} {(direction.no_ext) && `, #${direction.no_ext}`}</p>
                                        <p className="uppercase text-sm font-medium">{direction.municipality.name || direction.municipality}, {direction.state.name || direction.state} , {direction.postalcode}</p>
                                        <p>{direction.city}</p>
                                    </div>
                                    <div className="absolute bottom-8 flex text-sm font-medium">
                                        <p className="hover:text-black transition-all duration-700 ease-in-out mt-10"
                                            onClick={() => handleEditDirecction(direction)}
                                        >
                                            Editar
                                        </p>
                                        <p className="mx-2 transition-all duration-700 ease-in-out mt-10">|</p>
                                        <p className="hover:text-black transition-all duration-700 ease-in-out mt-10"
                                            onClick={() => { handleDeleteAddress(direction._id, direction.default) }}
                                        >
                                            Descartar
                                        </p>
                                    </div>
                                </div>
                            ))
                        }
                    </>
                ) : (
                    <div className="col-span-4">
                        <FormAddress
                            setShowForm={setShowForm}
                            direction={direction}
                            isEditing={isEditing}
                        />
                    </div>
                )
            }
        </div>
    )
}

export default DirectionsSeccion