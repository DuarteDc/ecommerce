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
import { selectedOrderPendding, startLoadPendingOrders } from "../../src/actions/ordersActions";
import {PendingPaymentOrderIndex} from "../../src/components/orders/pendingOrderPayment"

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
    const {penddingOrders} = useSelector((state)=>state.orders)

    const { categories } = useSelector((state) => state.faqs)


    const [valueTab , setValueTab ] = useState(0);
    const [ openProofOfPayment , toggleProofOfPayment] = useToggle();

    const { filterSearch } = helpersProducts;

    const tabsData = [
        { _id: 1, name: 'Pendiente de pago' },
        { _id: 2, name: 'Pedidos cancelados' },
        { _id: 3, name: 'pendiente de aprobacion'},
        { _id: 4, name: 'en proceso de enpaquetado'},
        { _id: 5, name: 'enviados'}
    ]

    const orders = [
        { id: "0329jdm02939uu0ok" },
        { id: "dp9eud09u03ue09u0" },
        { id: "p0932489yfh9j0pok" }
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
        dispatch(selectedOrderPendding(order_id));
    }

    return (
        <Layout
            categories={categories}
        >
            <BannerImage
                title="Mis Pedidos"
            />

            <section className="container max-w-[920px] my-10 mx-auto">
             <Box sx={{width:'100%'}}>
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
                    penddingOrders.map(order=>(
                        <PendingPaymentOrderIndex
                          key={order._id}
                          order={order}
                          handleOpenProofOfPayment={handleOpenProofOfPayment}
                          openProofOfPayment={openProofOfPayment}
                        />
                    ))
                  }
                
              </TabPanel>
              <TabPanel value={valueTab} index={1}>
                   hola a
              </TabPanel>
              <TabPanel value={valueTab} index={2}>
                   hola as
              </TabPanel>
              <TabPanel value={valueTab} index={3}>
                   hola asd
              </TabPanel>
              <TabPanel value={valueTab} index={4}>
                   hola asdf
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
    })

export default MisPedidos