import { useState } from "react";

import Router from "next/router";
import { useDispatch, useSelector } from "react-redux";

import Cookies from "js-cookie";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

import { wrapper } from "../../src/store";

import Layout from "../../src/components/Layouts";
import FormAddress from "../../src/components/profile/FormAddress";

import { useModal } from '../../src/hooks/useModal';
import { logout } from "../../src/actions/authActions";
import FormChangePassword from "../../src/components/profile/FormChangePassword";
import FormProfile from "../../src/components/profile/FormProfile";
import { startLoadDataUser, startGetDirections, setDefaultAddress, startDeleteAddress } from "../../src/actions/profileActions";
import { errorNotify, successNotify } from "../../src/helpers/helpers";

import ClearIcon from '@mui/icons-material/Clear';
import { startLoadAdministrableLogo } from "../../src/actions/administrableActions";

const Profile = () => {

    const [open, setOpen] = useState(true);

    const { user, directions } = useSelector(state => state.profile);

    const [isOpen, openModal, closeModal] = useModal();
    const [isOpenAddress, openModalAddress, closeModalAddres] = useModal();

    const dispatch = useDispatch();

    const selectDefaultDirection = async (direction_id) => {

        const { hasError, message } = await dispatch(setDefaultAddress('', direction_id));

        if (hasError) {
            errorNotify(message);
            return;
        }
        successNotify(message);
    }

    const router = Router;

    const handleDeleteAddress = async (address_id) => {

        const { hasError, message } = await dispatch(startDeleteAddress(address_id));

        if (hasError) {
            errorNotify(message);
            return;
        }
        successNotify(message);
    }

    const logoutSession = () => {
        dispatch(logout());
        Cookies.remove('token')
        router.replace('/')
    }


    return (
        <Layout>
            <section className="container mx-auto  mb-16">
                <h1 className="text-center uppercase text-2xl bg-gray-50 py-3 my-20 font-bold container mx-auto">Perfil</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="w-full flex flex-col items-center p-4 drop-shadow-md">
                        <div
                            className="w-full md:w-2/3 rounded-full overflow-hidden">
                            <img
                                src="https://media.istockphoto.com/photos/gingerbread-man-3d-rendering-isolated-on-white-background-picture-id1250677513?k=20&m=1250677513&s=612x612&w=0&h=KVAes7pQUH0XRDhRGqXy0na2tyaTWbCCpZ8U1r1EpNw="
                                alt={user?.fullname}
                            />
                        </div>
                        <p className="text-2xl uppercase mt-5 text-center">{user?.fullname}</p>
                        <button className="py-2 px-4 bg-black text-white font-bold my-5 hover:bg-white hover:text-black border-2 border-black transition-all duration-700 ease-in-out"
                            onClick={logoutSession}
                        >
                            Cerrar Sessión
                        </button>
                    </div>
                    <div className="col-span-1 md:col-span-2 relative  drop-shadow-md overflow-hidden">
                        <FormProfile {...user} />
                    </div>
                </div>
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
                    <div className="inline-flex">
                        {
                            directions?.map(address => (
                                <div
                                    className={`border-2 ${address.default && 'border-gray-900'}  w-60 mr-4 cursor-pointer relative`}
                                    key={address._id}

                                >
                                    <ClearIcon
                                        className="absolute right-0 m-2 hover:text-red-600"
                                        onClick={() => { handleDeleteAddress(address._id) }}
                                    />
                                    <div
                                        onClick={() => selectDefaultDirection(address._id)}
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
                <div className="w-full border-gray-200 border-2 mt-10 p-8">
                    <div className="flex items-center justify-between">
                        <p className="text-xl font-bold">Seguridad:</p>
                        <EditIcon className="text-second-100 cursor-pointer"
                            onClick={openModal}
                        />
                    </div>
                    <div className="flex mt-4 md:ml-20 items-center">
                        <p className="font-light">Contraseña:</p>
                        <p className="ml-2 mt-1">••••••••••••••••</p>
                    </div>
                </div>
                {
                    isOpen && (
                        <FormChangePassword
                            isOpen={isOpen}
                            closeModal={closeModal}
                        />
                    )
                }
                <div className="w-full mt-10 p-8">
                    <p className="text-lg font-bold my-4">Mis Pedidos</p>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div>
                            <article className="border-4 border-second-100 p-5 cursor-pointer mb-3"
                                onClick={() => setOpen(!open)}
                            >
                                <p className="text-center font-bold">Pedido #12</p>
                                <hr />
                                <div className="flex mt-4">
                                    <p className="font-light">Fecha de pedido:</p>
                                    <p>31-Marzo-2022</p>
                                </div>
                                <div className="flex mt-4">
                                    <p className="font-light">Monto:</p>
                                    <p>$200</p>
                                </div>
                                <div className="flex mt-4">
                                    <p className="font-light">Precio Final:</p>
                                    <p>$500</p>
                                </div>
                            </article>
                        </div>
                        {
                            (open) && (
                                <div className="lg:col-span-2 p-3 rounded-lg">
                                    <p className="text-center font-bold">Detalles</p>
                                    <hr />
                                    <div className="grid grid-col-1 lg:grid-cols-2 p-3">
                                        <div>
                                            <p className="font-bold">Dirección de envio:</p>
                                            <p className="font-light">Direccion #213 col. Lorem ipsum</p>
                                        </div>
                                        <div className="justify-self-e4d text-right">
                                            <p className="font-light mt-2">Monto: $200</p>
                                            <p className="font-light mt-2">Descuento: $0</p>
                                            <p className="font-light mt-2">Envio: $300</p>
                                            <p className="font-bold mt-2">Total: $500</p>
                                        </div>
                                    </div>
                                    <div>
                                        <table className="w-full">
                                            <thead className="border-b-2 border-gray-200">
                                                <tr>
                                                    <th>Articulo</th>
                                                    <th>Cantidad</th>
                                                    <th>Precio</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td className="flex items-center">
                                                        <img
                                                            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHw%3D&w=1000&q=80"
                                                            className="object-contain w-32"
                                                            alt="img"
                                                        />
                                                        <div className="ml-2">
                                                            <p className="font-light text-xs md:text-base">Name product</p>
                                                            <p className="text-second-100 font-bold">$200</p>
                                                        </div>
                                                    </td>
                                                    <td className="text-center">1</td>
                                                    <td className="text-center">$200</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export const getServerSideProps = wrapper.getServerSideProps((store) =>
    async (ctx) => {
        await store.dispatch(startLoadDataUser(ctx));
        await store.dispatch(startGetDirections(ctx));
        await store.dispatch(startLoadAdministrableLogo());
    })
export default Profile
