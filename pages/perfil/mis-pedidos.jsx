import { useState } from "react"
import { wrapper } from '../../src/store';
import Layout from '../../src/components/Layouts'
import { startLoadAdministrableLogo } from '../../src/actions/administrableActions'
import { BannerImage } from '../../src/components/ui/bannerImage';
import OrdersSection from '../../src/components/profile/OrdersSection';
import OrderDetail from "../../src/components/profile/OrderDetail";
import helpersProducts from "../../src/helpers/helpersProducts";
import { useRouter } from "next/router";
import { startLoadFaqsCategories } from "../../src/actions/faqsActions";
import { useDispatch, useSelector } from "react-redux";


import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useToggle } from "../../src/hooks/useToggle";
import { Modal } from "../../src/components/ui/modal";
import { UploadProofOfPayment } from "../../src/components/checkout/uploadProofOfPayment";
import { selectedOrderPendding, startLoadOrdersCanceled, startLoadPendingOrders ,startLoadOrdersApproved , startLoadOrdersShipped , shippedOrders} from "../../src/actions/ordersActions";
import {PendingPaymentOrderIndex} from "../../src/components/orders/pendingOrderPayment"
import { NotFoundOrders } from "../../src/components/orders/notFoundOrders";
import { Breadcrumbs, Grid,  Typography } from "@mui/material";
import Link from "next/link";

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
         <div className="pt-10 mt-5 w-full">
             {children}
         </div>
        )}
      </div>
    );
  }
  

  
const MisPedidos = () => {

    const router = useRouter();
    const dispatch = useDispatch();
    const { penddingOrders , canceledOrders , approvedOrders ,  shippedOrders} = useSelector((state)=>state.orders)

    const { categories } = useSelector((state) => state.faqs)


    const [valueTab , setValueTab ] = useState(0);
    const [ openProofOfPayment , toggleProofOfPayment] = useToggle();

    const { filterSearch } = helpersProducts;

    const tabsData = [
        { _id: 1, name: 'Pendiente de aprobación' },
        { _id: 2, name: 'Pedidos cancelados' },
        { _id: 3, name: 'pendiente de envío'},
        { _id: 4, name: 'enviados'}
    ]

    const filterOrdersByDate = ({ target }) => {
        const date = target.value;
        filterSearch({ router, date });
    }

    const handleClickOrder = (order) => {
        setOpenProductDetail(true);
        setOrder(order)
    }

    const handleChangeTab = (event , newValue) =>{
        setValueTab(newValue);
    }

    const handleOpenProofOfPayment = (order_id) =>{
        toggleProofOfPayment();
        if(order_id){
           dispatch(selectedOrderPendding(order_id));
        }
       
    }

    return (
        <Layout
            categories={categories}
        >
            <BannerImage
                title="Mis Pedidos"
            />

            <section className="container max-w-[920px] my-10 mx-auto">
              <Grid container>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Breadcrumbs aria-label="breadcrumb" className="px-6">
                    <Link  underline="hover" color="inherit" href="/">
                      Inicio
                    </Link>
                    <Link underline="hover" color="inherit" href="/perfil" className="">
                      Perfil
                    </Link>
                    <Typography color="text.primary">Mis Pedidos</Typography>
                  </Breadcrumbs>
                </Grid>
              </Grid>
             <Box sx={{width:'100%',marginTop:'20px'}}>
              <Box sx={{borderBottom:1 , borderColor:'divider'}}>
                <Tabs 
                  value={valueTab} 
                  onChange={handleChangeTab}
                  aria-label="basic example"
                  variant="scrollable"
                  scrollButtons="auto"
                >
                 {tabsData.map((tabData, index) => (
                    <Tab 
                     key={tabData._id}
                     label={tabData.name}
                     {...a11yProps(index)}
                     className="font-Poppins text-medium leading-[1.9]"
                    />
                  )
                 )}
                </Tabs>
              </Box>
              <TabPanel value={valueTab} index={0}>
                  {
                    !penddingOrders.length ? 
                      <NotFoundOrders
                         text="No cuentas con ordenes pendientes"
                        
                      />
                    :
                    penddingOrders.map(order=>(
                        <PendingPaymentOrderIndex
                          key={order._id}
                          order={order}
                          handleOpenProofOfPayment={handleOpenProofOfPayment}
                          openProofOfPayment={openProofOfPayment}
                          status={0}
                          text_description=" Pedido Pendiente de Pago"
                          text_color="text-[#333]"
                        />
                    ))
                  }
                
              </TabPanel>
              <TabPanel value={valueTab} index={1}>
                  {
                    !canceledOrders.length ? 
                      <NotFoundOrders
                        text="No cuentas con ordenes canceladas"
                      />
                    :
                    canceledOrders.map(order=>(
                      <PendingPaymentOrderIndex
                        key={order._id}
                        order={order}
                        status={1}
                        text_description="Pedido Cancelado"
                        text_color="text-[#333]"
                      />
                    ))
                  }
              </TabPanel>
              <TabPanel value={valueTab} index={2}>
                   {
                     !approvedOrders.length ?
                      <NotFoundOrders
                        text="No cuentas con ordenes aprobadas"
                      />
                     :
                     approvedOrders.map(order=>(
                      <PendingPaymentOrderIndex
                        key={order._id}
                        order={order}
                        status={2}
                        text_description="Pedido Aprobado"
                        text_color="text-[#333]"
                      />
                     ))

                   }
              </TabPanel>
              <TabPanel value={valueTab} index={3}>
                  {
                    !shippedOrders.length ? 
                    <NotFoundOrders
                    text="No cuentas con ordenes enviadas"
                    />
                     :
                     shippedOrders.map(order=>(
                      <PendingPaymentOrderIndex
                        key={order._id}
                        order={order}
                        status={3}
                        text_description="Pedido Enviado"
                        text_color="text-[#333]"
                      />
                     ))
                  }
              </TabPanel>
             </Box>
               {/* modal comprobante de pago */}
                <Modal
                title="Sube tu comprobante de pago"
                open={openProofOfPayment}
                handleOpenCheckout={handleOpenProofOfPayment}
                actions={false}
                fullWidth={true}
                maxWidth={'xs'}
                >
                <UploadProofOfPayment
                    handleOpenProofOfPayment={handleOpenProofOfPayment}
                />
                </Modal>
            </section>
        </Layout >
    )
}

export const getServerSideProps = wrapper.getServerSideProps((store) =>
    async (ctx) => {
        await store.dispatch(startLoadAdministrableLogo());
        await store.dispatch(startLoadFaqsCategories());
        await store.dispatch(startLoadPendingOrders(ctx.req.cookies.token));
        await store.dispatch(startLoadOrdersCanceled(ctx.req.cookies.token));
        await store.dispatch(startLoadOrdersApproved(ctx.req.cookies.token));
        await store.dispatch(startLoadOrdersShipped(ctx.req.cookies.token));
})

export default MisPedidos