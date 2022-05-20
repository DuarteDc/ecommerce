import { useEffect, useRef, useState } from "react";

import { useSelector } from "react-redux";

import Cookies from "js-cookie";


import { useDispatch } from 'react-redux';

import { wrapper } from "../../src/store";
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Layout from "../../src/components/Layouts";

import { logout } from "../../src/actions/authActions";

import DirectionsSeccion from "../../src/components/profile/ui/DirectionsSeccion";
import SeguritySection from "../../src/components/profile/ui/SeguritySection";
import ProfileSection from "../../src/components/profile/ui/ProfileSection";

import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';

import { startLoadDataUser, startGetDirections, startUpdateDataUser, startUpdateImageUser } from "../../src/actions/profileActions";
import { startLoadAdministrableLogo } from "../../src/actions/administrableActions";
import { errorNotify, successNotify } from "../../src/helpers/helpers";
import { useRouter } from "next/router";
import LoadingScreen from "../../src/components/LoadingScreen";

import { startLoadFaqsCategories } from '../../src/actions/faqsActions';
import { Grid } from "@mui/material";
import { BannerImage, OptionCardProfile } from "../../src/components/ui";

const Profile = () => {
    const { categories } = useSelector((state) => state.faqs);
    const [ loading, setLoading ] = useState(false);
   
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    }, []);

    return (
        <Layout
            categories={categories}
        >
            <BannerImage
                title="Mi cuenta"
            />
            <section className="container mx-auto mb-16 min-h-screen mt-44">
                <div className="max-w-[1235px] m-auto">
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
                            <OptionCardProfile
                                title="Mis Pedidos"
                                icon={"/assets/icons/entrega-de-pedidos.png"}
                                description="Rastrea tus paquetes, devolver tus pedidos o comprar algo de nuevo"
                                path="/perfil/mis-pedidos"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
                            <OptionCardProfile
                                title="Inicio de Sesión y Seguridad"
                                icon={"/assets/icons/proteger.png"}
                                description="Editar inicio de sesión, nombre y número de teléfono"
                                path="perfil/contrasenas-y-seguridad"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
                            <OptionCardProfile
                                title="Mis direcciones"
                                icon={"/assets/icons/localizacion.png"}
                                description="Editar direcciones para tus pedidos"
                                path="/perfil/direcciones"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
                            <OptionCardProfile
                                title="Mi Dirección Fiscal"
                                icon={"/assets/icons/cuenta.png"}
                                description="Editar direcciones fiscales para generar tus facturas"
                                path="/perfil/direccion-fiscal"
                            />
                        </Grid>
                        {/* <Grid item xs={12} sm={6} md={6} lg={4} xl={4}>
                      <OptionCardProfile
                       title="Servicio al Cliente"
                       icon={"/assets/icons/servicio-al-cliente.png"}
                       description="Rastrea tus paquetes , devolver tus pedidos o comprar algo de nuevo"
                       path="/perfil/soporte"
                      />
                     </Grid> */}
                    </Grid>
                </div>
                {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="w-full flex flex-col items-center p-4 drop-shadow-md">
                        <div className="rounded-full w-64 h-64 border-4 overflow-hidden relative z-10">
                            <div className="absolute bottom-5 right-10 z-20 bg-[#222] rounded-full p-1 cursor-pointer text-white  hover:opacity-75"
                                onClick={onButtonClick}>
                                <form>
                                    <ModeEditOutlineIcon />
                                    <input type="file" ref={inputFile} hidden name="profileImage"
                                        onChange={onFileChange}
                                    />
                                </form>
                            </div>
                            <img
                                src={user?.profileImage}
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
                </div> */}
                {/* <DirectionsSeccion directions={directions} />
                <SeguritySection /> */}
            </section>
        </Layout >
    )
}

export const getServerSideProps = wrapper.getServerSideProps((store) =>
    async (ctx) => {
        await store.dispatch(startLoadDataUser(ctx));
        await store.dispatch(startGetDirections(ctx));
        await store.dispatch(startLoadFaqsCategories());
        await store.dispatch(startLoadAdministrableLogo());
    })
export default Profile
