import { useEffect, useRef, useState } from "react";

import { useSelector } from "react-redux";

import Cookies from "js-cookie";

import * as Yup from 'yup';
import { useFormik } from 'formik';

import { wrapper } from "../../src/store";

import Layout from "../../src/components/Layouts";

import { logout } from "../../src/actions/authActions";

import DirectionsSeccion from "../../src/components/profile/ui/DirectionsSeccion";
import SeguritySection from "../../src/components/profile/ui/SeguritySection";
import ProfileSection from "../../src/components/profile/ui/ProfileSection";

import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

import { startLoadDataUser, startGetDirections, startUpdateDataUser } from "../../src/actions/profileActions";
import { startLoadAdministrableLogo } from "../../src/actions/administrableActions";
import { errorNotify, successNotify } from "../../src/helpers/helpers";

const Profile = () => {

    const img = useRef();

    const inputFile = useRef(null)

    const [open, setOpen] = useState(true);

    const handleUpdateImageUser = async (event) => {

        const { hasError, message } = await disptach(startUpdateDataUser())
        
        if (hasError) {
            errorNotify(message);
            return;
        }
        successNotify(message);

    }
    const showImage = (newImg) => {
        img.current.src = newImg
    }

    const onButtonClick = () => {
        inputFile.current.click();
        console.log(inputFile.current.value);
    };

    const { user, directions } = useSelector(state => state.profile);

    const logoutSession = () => {
        dispatch(logout);
        Cookies.remove('token')
        router.replace('/')
    }

    const initialValues = {
        imagee: '',
    }
    const validationSchema = {
        image: Yup.string().required('El campo es requerido')
    }

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object(validationSchema),
        onSubmit: (formData) => {
            handleSaveNewAddress(formData);
            closeModal();
        }
    });

    return (
        <Layout>
            <section className="container mx-auto mb-16">
                <h1 className="text-center uppercase text-2xl bg-gray-50 py-3 my-20 font-bold container mx-auto">Perfil</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="w-full flex flex-col items-center p-4 drop-shadow-md">
                        <div className="rounded-full w-64 h-64 bg-red-200 border-4 border-indigo-900 overflow-hidden relative z-10">
                            <div className="absolute bottom-5 right-10 z-20 bg-[#222] rounded-full p-1 cursor-pointer text-white cursor-pointer hover:opacity-75"
                                onClick={onButtonClick}>
                                <form onSubmit={formik.handleSubmit}>
                                    <ModeEditOutlineIcon />
                                    <input type="file" ref={inputFile} hidden
                                        onChange={handleUpdateImageUser}
                                    />
                                </form>
                            </div>
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSSNn8_M7J9iuGc2f-UDI0aSVzB7xkmWI5fSPqyMwZbX0X5o4XOaJM-cKCdcK7jp34aLQ&usqp=CAU"
                                alt={user?.fullname}
                                ref={img}
                                className="w-full h-full object-fill static"
                            />
                        </div>
                        <p className="text-2xl uppercase mt-5 text-center">{user?.fullname}</p>
                        <button className="py-2 px-4 bg-black text-white font-bold my-5 hover:bg-white hover:text-black border-2 border-black transition-all duration-700 ease-in-out"
                            onClick={logoutSession}
                        >
                            Cerrar Sessión
                        </button>
                    </div>
                    <ProfileSection user={user} />
                </div>
                <DirectionsSeccion directions={directions} />
                <SeguritySection />
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
        </Layout >
    )
}

export const getServerSideProps = wrapper.getServerSideProps((store) =>
    async (ctx) => {
        await store.dispatch(startLoadDataUser(ctx));
        await store.dispatch(startGetDirections(ctx));
        await store.dispatch(startLoadAdministrableLogo());
    })
export default Profile