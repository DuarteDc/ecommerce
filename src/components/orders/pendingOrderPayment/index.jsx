import { IconContext } from "react-icons";
import { MdOutlineFileUpload, MdOutlineCancel } from "react-icons/md";
import { helpers } from "../../../helpers";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from "swiper";
import { OrderProductsList } from "./orderProductsList";
import moment from "moment";
import { AiFillCaretDown } from "react-icons/ai";
import { useToggle } from "../../../hooks/useToggle";
import { Modal } from "../../ui/modal";
import { useDispatch, useSelector } from "react-redux";
import { startGetOrder, startOrderCancel } from "../../../actions/ordersActions";
import { Grid, TextField } from "@mui/material";
import { OrderDetails } from "./orderDetail";
import Swal from "sweetalert2";
import { startInvoidedOrder } from "../../../actions/profileActions";
import OrderStatus from "../OrderStatus";
import TextareaAutosize from '@mui/material/TextareaAutosize';

export const PendingPaymentOrderIndex = ({ order, handleOpenProofOfPayment, status, text_description, text_color }) => {

  const dispatch = useDispatch();
  const { fiscalAddress } = useSelector((state) => state.profile)
  const total = helpers.priceFormat(order.total);
  const totalPayments = helpers.priceFormat(order.total_payments);
  const date = moment(order.createdAt).format('L');
  const [open, toggle] = useToggle();
  const [openOrderDetail, toggleOrderDetail] = useToggle();
  const [openCancelSOrder, toggleCancelOrder] = useToggle();

  const handleClickAddress = () => {
    toggle();
  }

  const handleCancelOrder = () => {
    toggleCancelOrder();
    // dispatch(startOrderCancel(order._id));
  }

  const handleClickOrderDetail = () => {
    toggleOrderDetail();
    dispatch(startGetOrder(order._id));
  }

  const handleClickInvoicedOrder = (order_id) => {
    if (!fiscalAddress) {
      Swal.fire({
        title: 'Ups , accion no permitida',
        text: 'Detectamos que no has agregado tus datos fiscales , agregalos y vuelve a internarlo',
        icon: 'warning'
      });
      return;
    }

    Swal.fire({
      title: "¿Deseas Facturar este pedido?",
      text: "Antes de continuar, válida que la información de tus datos fiscales sea correcta, en caso de presentar algún problema, será necesario que te contactés con nosotros.",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: 'Cancelar!',
      cancelButtonColor: "#b71c1c",
      confirmButtonText: "Continuar",
      confirmButtonColor: "#1976d2",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(startInvoidedOrder(order_id));
      }
    })
  }


  return (
    <div className="mb-6 border border-solid border-[#D5D9D9]  rounded-t-[6px]">
      <Grid container>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <div className="bg-[#eee] flex p-8">
            <div className="w-2/3 font-Poppins">
              <span className="uppercase text-sm leading-6 text-[#333]">
                Pedido realizado
              </span>
              <p className="text-sm text-[#888]">
                {date}
              </p>
            </div>
            <div className="w-1/3 text-center font-Poppins">
              <span className="uppercase text-sm leading-6 text-[#333]">
                Total
              </span>
              <p className="text-sm text-[#888]">
                {total}
              </p>
            </div>
            {
              status === 0 && (
                <div className="w-2/3 text-center font-Poppins">
                  <span className="uppercase text-sm leading-6 text-[#333]">
                    Total liquidado
                  </span>
                  <p className="text-sm text-[#888]">
                    {totalPayments}
                  </p>
                </div>
              )
            }
            <div className="w-full text-center font-Poppins cursor-pointer h-full"
              onClick={() => handleClickAddress()}
            >
              <span className="uppercase text-sm leading-6 text-[#333]">
                Enviar a:
              </span>
              <span className="text-sm text-center text-[#1976d2] cursor-pointer border-b-3 hover:border-solid hover:text-[#880e4f] hover:transition-all flex items-center justify-center"
              >
                {order?.shippment_direction?.name}
                <AiFillCaretDown />
              </span>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <div className="font-Poppins text-center bg-[#eee] p-8 flex flex-wrap justify-center">
            <span className="text-sm text-[#333]">Pedido N.º {order._id}</span>
            <div className="w-full mr-6 text-[#1976d2]">
              {
                order.invoiced && status !== 0 && status !== 1 &&
                <span className="text-sm  cursor-pointer border-b-3 hover:border-solid hover:text-[#880e4f] hover:transition-all mr-5">Pedido ya facturado</span>
              }
              {
                (!order.invoiced) && status !== 0 && status !== 1 &&
                <button className="text-sm  cursor-pointer border-b-3 hover:border-solid hover:text-[#880e4f] hover:transition-all mr-5"
                  onClick={() => handleClickInvoicedOrder(order._id)}
                >
                  Factura CFDI
                </button>
              }
              <button
                className="text-sm cursor-pointer  hover:border-3 hover:border-solid hover:text-[#880e4f] hover:transition-all"
                onClick={() => handleClickOrderDetail()}
              >
                Detalles del pedido
              </button>
            </div>
          </div>
        </Grid>
      </Grid>
      <Grid container spacing={5}>
        <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
          <div className="flex items-center w-full h-full px-10">
            <h3 className={`font-Poppins text-lg leading-6 ${text_color}`}>
              {text_description}
            </h3>
          </div>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4} >
          <div className="flex justify-center  md:justify-start items-center h-3/4 w-full pr-10">
            {
              status === 0 && order.total_payments < order.total &&
              <button className="bg-[#FFD814] font-Poppins text-[#333] py-[10px] px-[15px] uppercase text-sm mt-5 flex items-center justify-center w-full"
                onClick={() => handleOpenProofOfPayment(order._id)}
              >
                <IconContext.Provider value={{ className: "color-[#fff] , text-[20px] , mr-[10px]" }}>
                  <MdOutlineFileUpload />
                </IconContext.Provider>
                <span>Comprobante de pago</span>
              </button>
            }
          </div>
          <div className="flex justify-center md:justify-start items-center w-full pr-10 ">
            {
              status === 0 &&
              <button className="bg-red-500  font-Poppins cursor-pointer text-white py-[10px] px-[15px] uppercase text-sm mt-5 flex items-center justify-center w-full"
                onClick={handleCancelOrder}
              >
                <IconContext.Provider value={{ className: "color-[#fff] , text-[20px] , mr-[10px]" }}>
                  <MdOutlineCancel />
                </IconContext.Provider>
                <span>Cancelar pedido</span>
              </button>
            }
          </div>
        </Grid>
      </Grid>
      <div className="border-x border-b border-solid border-[#D5D9D9] py-3 px-10">
        <div className="w-full flex ">
          <Swiper
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            slidesPerView={1}
            navigation={false}
            loop={false}
            className="mySwiper w-full"
            modules={[Pagination, Autoplay, Navigation]}

          >
            {
              order.products_list.map((product, index) => (
                <SwiperSlide key={product.product_id}>
                  <OrderProductsList
                    product={product}
                    status={status}
                    index={index}
                    handleCancelOrder={handleCancelOrder}
                  />
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>
      </div>
      <Modal
        title="Dirección de envio"
        open={open}
        handleOpenCheckout={handleClickAddress}
        actions={false}
        fullWidth={true}
        maxWidth={'sm'}
      >
        <div className="flex justify-between mb-2 ">
          <p className="font-Poppins font-medium text-base capitalize text-[#333] leading-6">Calle</p>
          <span className="text-base text-[#888] capitalize">{order?.shippment_direction?.street}</span>
        </div>
        <div className="flex justify-between mb-2 ">
          <p className="font-Poppins font-medium text-base capitalize text-[#333] leading-6">Entre Calle y Calle</p>
          <span className="text-base text-[#888] capitalize">{order?.shippment_direction?.between_street}</span>
        </div>
        <div className="flex justify-between mb-2 ">
          <p className="font-Poppins font-medium text-base capitalize text-[#333] leading-6">
            Código
          </p>
          <span className="text-base text-[#888] capitalize">{order?.shippment_direction?.postalcode}</span>
        </div>
        <div className="flex justify-between mb-2 ">
          <p className="font-Poppins font-medium text-base capitalize text-[#333] leading-6">Ciudad</p>
          <span className="text-base text-[#888] capitalize">{order?.shippment_direction?.city}</span>
        </div>
        <div className="flex justify-between mb-2 ">
          <p className="font-Poppins font-medium text-base capitalize text-[#333] leading-6">Referencia</p>
          <span className="text-base text-[#888] capitalize">{order?.shippment_direction?.references}</span>
        </div>
      </Modal>

      <Modal
        title="Detalle del pedido"
        open={openOrderDetail}
        handleOpenCheckout={toggleOrderDetail}
        actions={false}
        fullWidth={true}
        maxWidth={'sm'}
      >
        <OrderDetails status={order.orderStatus} />
      </Modal>
      <Modal
        title="Cancelar Pedido"
        open={openCancelSOrder}
        handleOpenCheckout={toggleCancelOrder}
        actions={false}
        fullWidth={true}
        maxWidth={'sm'}
      >
        <div className="my-2">
          <TextField
            name="legal_name"
            // error={formik.touched.legal_name && formik.errors.legal_name ? true : false}
            // helperText={
            //   formik.touched.legal_name && formik.errors.legal_name ?
            //     formik.errors.legal_name : ""
            // }
            fullWidth={true}
            size="small"
            id="outlined-required"
            label="Asunto"
          // onChange={formik.handleChange}
          // value={formik.values.legal_name}
          />
          <TextareaAutosize
            size="small"
            aria-label="empty textarea"
            placeholder="Motivo"
            style={{ width: '100%', marginTop: 20 }}
          />
        </div>
      </Modal>
    </div>
  )
}