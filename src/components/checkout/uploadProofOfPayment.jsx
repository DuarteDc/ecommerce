import { Grid } from "@mui/material";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import {BsFileEarmarkImage} from "react-icons/bs";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import * as Yup from 'yup';
import { startUploadProofOfPayment } from "../../actions/ordersActions";

export const UploadProofOfPayment = ({handleOpenProofOfPayment}) =>{
    const dropRef = useRef();
    const fileInput = useRef(null);
    const dispatch = useDispatch();

    const [ isLoadImage , setIsLoadImage ] = useState(false);
    const [ dragging , setDragging ] = useState(false);
    const [ dragCounter , setDragCounter] = useState(0)
    const [image , setImage] = useState({
        urlPhoto:'',
        imagePayment:''
    });
    const { urlPhoto , imagePayment} = image;

    const initialValues = {
        amount: '',
        reference: ''
    }

    const regexAmount = /^\d*\.?\d*$/;
    const regexReference = /^[0-9]+$/;

    const validationSchema = {
        amount: Yup.string().required("El monto es requerido").matches(regexAmount, "La cantidad no es valida"),
        reference: Yup.string().required("La referencia es requerida").matches(regexReference, "La referencia no es valida"),
    }

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object(validationSchema),
        onSubmit: (data) => {
            handleUploadPaymentImage(data);
        }
    });

    const handleUploadPaymentImage = (data) =>{
        data.image = imagePayment;
        if(!imagePayment){
         handleOpenProofOfPayment();
         Swal.fire({
             icon:"error",
             title:"¡Ups , hubo un problema!",
             text:"Al parecer no has subido el comprobante de pago , subelo y vuelve a intentarlo"
         });
        
         return;
       }
           handleOpenProofOfPayment();

        Swal.fire({
          title:"¿Estás seguro?",
          text:"Una vez enviado el comprobante , revisaremos que los datos de pago coincidan con el total del carrito",
          icon:"warning",
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, enviar!'
      }).then((result)=>{
          if(result.isConfirmed){
            const formData = new FormData();
            formData.append("image",data.image);
            formData.append("reference",data.reference);
            formData.append("amount",data.amount);
            dispatch(startUploadProofOfPayment(formData));
            return;
           }else{
            handleOpenProofOfPayment();
          }
      })
    }

    useEffect(() => {
        let div = dropRef.current;
        div.addEventListener('dragenter',handleDragIn)
        div.addEventListener('dragleave',handleDragOut)
        div.addEventListener('dragover',handleDrag)
        div.addEventListener('drop',handleDrop)
        
        return ()=>{
            div.removeEventListener('dragenter',handleDragIn)
            div.removeEventListener('dragleave',handleDragOut)
            div.removeEventListener('dragover',handleDrag)
            div.removeEventListener('drop',handleDrop)
        }
    }, []);

    const handleDragIn = (e)=>{
        e.preventDefault();
        e.stopPropagation();
        setDragCounter(dragCounter++);
        if(e.dataTransfer.items && e.dataTransfer.items.length > 0){
            setDragging(true);
        }
    }

    const handleDragOut = (e) =>{
        e.preventDefault();
        e.stopPropagation();
        setDragCounter(dragCounter--);
        if(dragCounter > 0) return;
        setDragging(false);
    }

    const handleDrag = (e) =>{
        e.preventDefault()
        e.stopPropagation()
    }

    const handleDrop = (e) =>{
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
        if(e.dataTransfer.files && e.dataTransfer.files.length > 0){
             let urlImage = URL.createObjectURL(e.dataTransfer.files[0]);
             let imageFile = e.dataTransfer.files[0]
             setIsLoadImage(true);
             setTimeout(() => {
                 setIsLoadImage(false);
                 setImage({
                     urlPhoto: urlImage,
                     imagePayment: imageFile
                 })
             }, 1500);
            e.dataTransfer.clearData();
            setDragCounter(0);
        }
    }

    const handleClickDropzone = () =>{
       fileInput.current.click();    
    }

    const handleChangeProofOfPayment = (e) =>{

        if(e.target.files.length > 0){
            setIsLoadImage(true);
            setTimeout(() => {
                setIsLoadImage(false);
                setImage({
                    urlPhoto:URL.createObjectURL(e.target.files[0]),
                    imagePayment:e.target.files[0]
                })
            }, 1500);
        }
    }

    const handleCancelMethodPayment = () =>{
            handleOpenProofOfPayment();
    }

    
    return(
        <div>
            <div className="upload-area__header">
                <p className="text-[0.9rem] text-[#888] mt-0">
                 El archivo debé ser una imagen en formato JPG, JPEG o PNG.
                </p>
            </div>

            <div className="relative mb-5 h-50 flex justify-center items-center flex-col border-[2px] border-dashed border-[#888] rounded-2xl mt-9 cursor-pointer transition-all hover:border-[#008cdd] py-8 px-3 hover:opacity-[0.7] min-h-[200px] "
            onClick={()=>handleClickDropzone()}
            ref={dropRef}
            >
                {
                    dragging &&
                    <div className="opacity-[0.7] transition-all">
                    <span  className="relative m-auto text-[#008cdd]">
                     Soltar Aqui
                    </span>
                    </div>
                }
            {
                !isLoadImage &&  !Object.keys(urlPhoto).length && !dragging ? 
                 <>
                 <span className="flex text-6xl text-[#008cdd] transition-opacity ">
                 <BsFileEarmarkImage/>
                 </span>
                 <p className="text-base text-[#888]  m-0 mt-[0.6rem]">
                      Arrastra la imagen aqui o da click sobre el recuadro
                 </p>
                </>
                : null
            }
            {
                isLoadImage && 
                <span  className="relative m-auto text-[#008cdd]">
                    Cargando imagen...
                </span>
            }
            {
                Object.keys(urlPhoto).length > 0 && !isLoadImage ? 
                <img src={urlPhoto} alt="Preview Image" id="previewImage" className="drop-zoon__preview-image" draggable="false"/>
                : null
                
            }
            <input 
              type="file" 
              ref={fileInput} 
              className="hidden" 
              accept="image/png, image/jpg, image/jpeg"
              onChange={handleChangeProofOfPayment}
            />
        </div>
        <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
             <label className="font-Poppins text-sm text-[#888] leading-10">Agrega Monto del ticket:</label>
             <input
               name="amount"
               className="w-full h-12 font-Poppins text-[13px] leading-[1.6] text-[#333] pr-[30px] pl-[30px] outline-0 border-[1px] border-solid border-[#D5D9D9]"
               placeholder="Ej. 280"
               onChange={formik.handleChange}
             />
              {formik.touched.amount && formik.errors.amount ? (
                        <span className="text-red-500">{formik.errors.amount}</span>
                    ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
             <label className="font-Poppins text-sm text-[#888] leading-10">Agrega Referencia del ticket:</label>
             <input
               name="reference"
               className="w-full h-12 font-Poppins text-[13px] leading-[1.6] text-[#333] pr-[30px] pl-[30px] outline-0 border-[1px] border-solid border-[#D5D9D9]"
               placeholder="Ej. 1854673285872"
               onChange={formik.handleChange}
             />
               {formik.touched.reference && formik.errors.reference ? (
                        <span className="text-red-500">{formik.errors.reference}</span>
                ) : null}
            </Grid>
        </Grid>
        <div className="flex flex-col my-8">
          <button 
            type="submit"
            className="uppercase w-full  mb-5 bg-[#008cdd] text-luz py-4 font-Poppins text-base cursor-pointer"
          >
             Enviar Comprobante
          </button>
          
          <button className="uppercase w-full mb-5 bg-[#f57c00] text-luz py-4 font-Poppins text-base cursor-pointer"
          onClick={handleCancelMethodPayment}
          >
              Cancelar Pago por Transferencia
          </button>
        </div>
        </form>
        </div>
    )
}