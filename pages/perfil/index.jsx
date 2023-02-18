import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { useDispatch } from 'react-redux';

import { wrapper } from "../../src/store";

import Layout from "../../src/components/Layouts";

import { startLoadDataUser, startGetDirections } from "../../src/actions/profileActions";
import { startLoadAdministrableLogo } from "../../src/actions/administrableActions";

import { startLoadFaqsCategories } from '../../src/actions/faqsActions';
import { Grid } from "@mui/material";
import { BannerImage, OptionCardProfile } from "../../src/components/ui";
import { startLoadCurrencies } from "../../src/actions/countryAcctions";

const Profile = () => {
    const { categories } = useSelector((state) => state.faqs);

    return (
        <Layout
            categories={categories}
        >
            <BannerImage
                title="Mi cuenta"
                banner="bg-banner4"
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
                    </Grid>
                </div>
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
        await store.dispatch(startLoadCurrencies());
    })
export default Profile
