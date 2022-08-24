import { useState } from "react";
import { helpers } from "../../../helpers";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from "swiper";
import { OrderProductsList } from "./orderProductsList";
import moment from "moment";
import { useToggle } from "../../../hooks/useToggle";
import { Modal } from "../../ui/modal";
import { useDispatch, useSelector } from "react-redux";
import { startCancelOrderByID, startGetOrder, startOrderCancel } from "../../../actions/ordersActions";

import { OrderDetails } from "./orderDetail";
import Swal from "sweetalert2";
import { startInvoidedOrder } from "../../../actions/ordersActions";

import { useRouter } from "next/router";
import OrderStatus from "../OrderStatus";
import OrderCancelStatus from "../OrderCancelStatus";

import CircularProgress from '@mui/material/CircularProgress';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import VerticalAlignCenterIcon from '@mui/icons-material/VerticalAlignCenter';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

export const PendingPaymentOrderIndex = ({ order, handleOpenProofOfPayment, status, loading, setLoading, handleOpenProductDetail, handleOpenUploadImages }) => {

  const dispatch = useDispatch();
  const { fiscalAddress } = useSelector((state) => state.profile)
  const total = helpers.priceFormat(order.total);
  const totalPayments = helpers.priceFormat(order.total_payments);
  const date = moment(order.createdAt).format('L');
  const [open, toggle] = useToggle();
  const [openOrderDetail, toggleOrderDetail] = useToggle();
  const [openBankAccountDetail, toggleBankAccountDetail] = useToggle();
  // const [openCancelSOrder, toggleCancelOrder] = useToggle();

  const [loadingDetail, setLoadingDetail] = useState(false);

  const handleClickAddress = () => {
    toggle();
  }

  const handleCancelOrder = (order_id) => {
    Swal.fire({
      title: "¿Deseas cancelar este pedido?",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: 'Cancelar!',
      cancelButtonColor: "#b71c1c",
      confirmButtonText: "Continuar",
      confirmButtonColor: "#1976d2",
      allowOutsideClick: false,
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        await dispatch(startCancelOrderByID(order_id));
        setLoading(false);
      }
    });
  }

  const handleClickOrderDetail = async () => {
    toggleOrderDetail();
    setLoadingDetail(true)
    await dispatch(startGetOrder(order._id));
    setLoadingDetail(false);
  }


  const router = useRouter();

  // const sendCancelOrder = async (formData, resetForm) => {
  //   // toggleCancelOrder();
  //   // Swal.fire({
  //   //   title: "¿Deseas Cancelar este pedido?",
  //   //   text: "El pedido será revisado por nosotros antes de cancelarce por completo.",
  //   //   icon: "question",
  //   //   showCancelButton: true,
  //   //   cancelButtonText: 'Cancelar!',
  //   //   cancelButtonColor: "#b71c1c",
  //   //   confirmButtonText: "Continuar",
  //   //   confirmButtonColor: "#1976d2",
  //   //   reverseButtons: true
  //   // }).then(async (result) => {
  //   //   if (result.isConfirmed) {
  //   //     await dispatch(startOrderCancel(formData, order._id));
  //   //     resetForm({ values: initialValues });
  //   //   }
  //   // })
  // }

  // const initialValues = {
  //   subject: '',
  //   description: '',
  // }

  // const validationSchema = {
  //   subject: Yup.string().min(8, "El nombre debe contener al menos 8 caracteres").required("El nombre es requerido"),
  //   description: Yup.string().required("El correo es requerido"),
  // }

  // const formik = useFormik({
  //   initialValues,
  //   validationSchema: Yup.object(validationSchema),
  //   onSubmit: (formData, { resetForm }) => {
  //     sendCancelOrder(formData, resetForm)
  //     //alert(JSON.stringify(formData));
  //     // resetForm({ values: initialValues })
  //   }
  // });

  const handleClickInvoicedOrder = (order_id, status) => {
    if (Object.keys(fiscalAddress) < 1) {
      Swal.fire({
        title: 'Ups , accion no permitida',
        text: 'Detectamos que no has agregado tus datos fiscales , agregalos y vuelve a internarlo',
        icon: 'warning',
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          router.push('/perfil/direccion-fiscal');
        }
      })
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
      allowOutsideClick: false,
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        await dispatch(startInvoidedOrder(order_id, status));
        setLoading(false);
      }
    })
  }

  return (
    <div>
      <div className="flex w-full bg-[#eee] p-8  rounded-t-[6px]  font-Poppins">
        <div className="grid grid-cols-1 w-full md:grid-cols-3 lg:grid-cols-3">
          <div className="flex justify-between w-full items-center">
            <div className="flex flex-col justify-center items-center">
              <span className="uppercase text-sm text-[#333]">
                Pedido realizado
              </span>
              <p className="text-sm text-[#888]">
                {date}
              </p>
            </div>
            <div className="flex flex-col justify-center items-center">
              <span className="uppercase text-sm text-[#333]">
                Total
              </span>
              <p className="text-sm text-[#888]">
                {total}
              </p>
            </div>
            <div className="flex flex-col justify-center items-center">
              {
                status === 0 && (
                  <>
                    <span className="uppercase text-sm  text-[#333]">
                      Pagado
                    </span>
                    <p className="text-sm text-[#888]">
                      {totalPayments}
                    </p>
                  </>
                )
              }
            </div>
          </div>
          <div>
            <div className="text-center flex flex-col">
              <span className="uppercase text-sm leading-6 text-[#333]">
                Enviar a:
              </span>
              <span className="text-sm text-[#e91e63] cursor-pointer border-b-3 hover:border-solid hover:text-[#e91e63] hover:transition-all flex justify-center items-center" onClick={() => handleClickAddress()}
              >
                {order?.shippment_direction?.name}
                <KeyboardArrowDownIcon />
              </span>
            </div>
          </div>
          <div>
            <div>
              <div className="text-center">
                <span className="text-sm text-[#333]">Pedido N.º {order.folio}</span>
                <div className="w-full mr-6 text-[#1976d2]">
                  {/* {
                      order.invoiced && status !== 0 && status !== 1 && (
                        <button
                          className="text-sm  cursor-pointer border-b-3 text-[#e91e63]  hover:border-solid hover:text-[#880e4f] hover:transition-all mr-5"
                        // onClick={() => handleCancelInvoice()}
                        >
                          Pedido facturado
                        </button>
                      )
                    }
                    {
                      (!order.invoiced) && status !== 0 && status !== 1 &&
                      <button className="text-sm  cursor-pointer border-b-3  text-[#e91e63] hover:border-solid hover:text-[#880e4f] hover:transition-all mr-5"
                        onClick={() => handleClickInvoicedOrder(order._id, status)}
                      >
                        Factura CFDI
                      </button>
                    } */}
                  <button
                    className="pr-1 text-sm cursor-pointer text-[#e91e63] hover:border-3 hover:border-solid hover:text-[#880e4f] hover:transition-all"
                    onClick={handleClickOrderDetail}
                  >
                    Detalles del pedido
                  </button>
                  {
                    status === 0 && (
                      <button
                        className="pl-1 text-sm cursor-pointer text-[#e91e63] hover:border-3 hover:border-solid hover:text-[#880e4f] hover:transition-all"
                        onClick={toggleBankAccountDetail}
                      >
                        Información bancaria
                      </button>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 lg:grid-cols-3  rounded-t-[6px] border-x border-b border-solid border-[#D5D9D9] py-3 px-10 py-10">
        <div className="w-full flex md:col-span-2 justify-center">
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
                <SwiperSlide key={product.product_id._id}>
                  <OrderProductsList
                    product={product}
                    handleOpenProductDetail={handleOpenProductDetail}
                    handleOpenUploadImages={handleOpenUploadImages}
                    status={status}
                    order_id={order._id}
                  />
                </SwiperSlide>
              ))
            }
          </Swiper>
        </div>
        <div className="flex flex-col justify-center  items-center w-full mx-auto">
          {/* <button className="bg-[#FFD814] font-Poppins text-[#333] py-[10px] px-[15px] uppercase text-sm mt-5 flex items-center justify-center w-full mb-6">
            <VerticalAlignCenterIcon
              className="color-[#fff] text-[20px]  mr-[10px]"
            />
            <span>Comprobante de pago</span>
          </button> */}
          {
            status !== 1 && !order.cancelation && (
              <OrderStatus status={order.orderStatus} />
            )
          }
          {
            order.orderStatus === 1 && !order.status && (
              <OrderCancelStatus status={status} />
            )
          }
          {
            status === 0 && order.total_payments < order.total && !order.cancelation &&
            <button className="bg-[#FFD814] font-Poppins text-[#333] py-[10px] px-[15px] uppercase text-sm mt-5 flex items-center justify-center w-full"
              onClick={() => { handleOpenProofOfPayment(order._id, order.total, order.total_payments) }}
            >
              <VerticalAlignCenterIcon
                className="color-[#fff] text-[20px]  mr-[10px]"
              />
              <span>Comprobante de pago</span>
            </button>
          }

          {
            status === 0 && !order.cancelation && order.total_payments < 1 &&
            <button className="bg-red-500  font-Poppins cursor-pointer text-white py-[10px] px-[15px] uppercase text-sm mt-5 flex items-center justify-center w-full"
              onClick={() => { handleCancelOrder(order._id) }}
            >
              <HighlightOffIcon
                className="color-[#fff] text-[20px] mr-[10px]"
              />
              <span>Cancelar pedido</span>
            </button>
          }
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
        title="Detalles del pedido"
        open={openOrderDetail}
        handleOpenCheckout={toggleOrderDetail}
        actions={false}
        fullWidth={true}
        maxWidth={'sm'}
      >
        {
          loadingDetail ?
            <div className="flex justify-center items-center">
              <CircularProgress />
            </div>
            :
            <OrderDetails status={status} />
        }
      </Modal>
      <Modal
        title="Información Bancaria"
        open={openBankAccountDetail}
        handleOpenCheckout={toggleBankAccountDetail}
        actions={false}
        fullWidth={true}
        maxWidth={'sm'}
      >
        <div className="flex justify-between mb-2 ">
          <p className="font-Poppins font-medium text-base capitalize text-[#333] leading-6">Beneficiario:</p>
          <span className="text-base text-[#888] font-medium capitalize">{order?.bank_account_id?.beneficiary}</span>
        </div>
        {
          order?.bank_account_id?.card_number && (
            <div className="flex justify-between mb-2 ">
              <p className="font-Poppins font-medium text-base capitalize text-[#333] leading-6">Número de tarjeta:</p>
              <span className="text-base text-[#888] font-medium capitalize">{order?.bank_account_id?.card_number}</span>
            </div>
          )
        }
        <div className="flex justify-between mb-2 ">
          <p className="font-Poppins font-medium text-base capitalize text-[#333] leading-6">Número de cuenta:</p>
          <span className="text-base text-[#888] font-medium capitalize">{order?.bank_account_id?.account_number}</span>
        </div>
        <div className="flex justify-between mb-2 ">
          <p className="font-Poppins font-medium text-base capitalize text-[#333] leading-6">
            Clave interbancaria:
          </p>
          <span className="text-base text-[#888] font-medium capitalize">{order?.bank_account_id?.interbank}</span>
        </div>
      </Modal>
      {/* <Modal
          title="Cancelar Pedido"
          open={openCancelSOrder}
          handleOpenCheckout={toggleCancelOrder}
          actions={false}
          fullWidth={true}
          maxWidth={'sm'}
          className="font-Poppins"
        >
          <form onSubmit={formik.handleSubmit}>
            <div className="upload-area__header py-5">
              <p className="text-[0.9rem] text-[#888]">
                Escribe el motivo de tu cancelación y sera revisada por nosotros
              </p>
            </div>
            <TextField
              name="subject"
              error={formik.touched.subject && formik.errors.subject ? true : false}
              helperText={
                formik.touched.subject && formik.errors.subject ?
                  formik.errors.subject : ""
              }
              fullWidth={true}
              size="large"
              id="outlined-required"
              label="Asunto"
              onChange={formik.handleChange}
              value={formik.values.subject}
            />
            <TextareaAutosize
              aria-label="empty textarea"
              className="input"
              placeholder="Descripción"
              name="description"
              onChange={formik.handleChange}
              value={formik.values.description}
              onBlur={formik.handleBlur}
              minRows={10}
              error={formik.touched.description && formik.errors.description ? true : false}
              helperText={
                formik.touched.description && formik.errors.description ?
                  formik.errors.description : ""
              }
              style={{ width: '100%', marginTop: 20, marginBottom: 20, padding: 10, resize: "none", border: 'solid 1px', borderColor: "#ccc" }}
            />
            <button className="w-full px-2 py-4 bg-[#222] text-white hover:bg-[#333]" type="submit">
              Enviar
            </button>
          </form>
        </Modal> */}
    </div>
  )
}

