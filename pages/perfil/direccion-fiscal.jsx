import { startLoadAdministrableLogo } from "../../src/actions/administrableActions";
import Layout from "../../src/components/Layouts";
import { wrapper } from "../../src/store";
import { Container, Grid } from "@mui/material";
import {FiscalAddressProfile} from "../../src/components/profile/fiscalAddress/fiscalAddressProfile";
import { FormFiscalAddressProfile } from "../../src/components/profile/fiscalAddress/formFiscalAdressProfile";

const FiscalAddress = () =>{
    return (
     <Layout>
       <Container>
        <Grid container spacing={6} className="my-10">
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

export const getStaticProps = wrapper.getStaticProps((store) =>
    async () => {
        await store.dispatch(startLoadAdministrableLogo());
});

export default FiscalAddress;