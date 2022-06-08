import { wrapper } from "../../src/store";
import Layout from "../../src/components/Layouts";
import { startLoadAdministrableLogo } from "../../src/actions/administrableActions";
import { startGetStates, startLoadFiscalAddress, startLoadTaxSystem } from "../../src/actions/profileActions";
import { Breadcrumbs, Container, Grid, Typography } from "@mui/material";
import {FiscalAddressProfile} from "../../src/components/profile/fiscalAddress/fiscalAddressProfile";
import { FormFiscalAddressProfile } from "../../src/components/profile/fiscalAddress/formFiscalAdressProfile";
import Link from "next/link";

const FiscalAddress = () =>{
    return (
     <Layout>
       <Container>
        <Grid container spacing={6} className="my-10">
         <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Breadcrumbs aria-label="breadcrumb">
                <Link href="/">
                    Inicio
                </Link>
                <Link href="/perfil">
                    Mi pefil
                </Link>
                <Typography color="text.primary">Mi dirección Fiscal</Typography>
            </Breadcrumbs>
         </Grid>
         <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
             <div className="flex justify-center">
                <div className="border-solid border-2 min-w-auto lg:min-w-[600px] rounded-lg">
                   <FiscalAddressProfile/>
                </div>
           </div>
         </Grid>
         <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <div className="border-solid border-2 min-w-auto lg:min-w-[600px] rounded-lg">
             <FormFiscalAddressProfile/>
             </div>
         </Grid>
        </Grid>
         </Container>
     </Layout>
    )
}

export const getServerSideProps = wrapper.getServerSideProps((store) =>
    async (ctx) => {
        await store.dispatch(startLoadAdministrableLogo());
        await store.dispatch(startGetStates());
        await store.dispatch(startLoadFiscalAddress(ctx.req.cookies.token));
        await store.dispatch(startLoadTaxSystem(ctx.req.cookies.token));
});

export default FiscalAddress;