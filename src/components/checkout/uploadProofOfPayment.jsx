import { useEffect, useRef, useState } from "react";
import {BsFileEarmarkImage} from "react-icons/bs";
import Swal from "sweetalert2";

export const UploadProofOfPayment = ({setIsTransfer , handleOpenProofOfPayment}) =>{
    const dropRef = useRef();
    const fileInput = useRef(null);


    const [ isLoadImage , setIsLoadImage ] = useState(false);
    const [ dragging , setDragging ] = useState(false);
    const [ dragCounter , setDragCounter] = useState(0)
    const [image , setImage] = useState({
        urlPhoto:'',
        imagePayment:''
    });
    const { urlPhoto , imagePayment} = image;

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
        setIsLoadImage(true);
        setTimeout(() => {
            setIsLoadImage(false);
            setImage({
                urlPhoto:URL.createObjectURL(e.target.files[0]),
                imagePayment:e.target.files[0]
            })
        }, 1500);
    }

    const handleCancelMethodPayment = () =>{
        if(localStorage.getItem('bankAccountSelected')){
            localStorage.removeItem('bankAccountSelected');
            setIsTransfer(false);
            handleOpenProofOfPayment();
        }
    }

    const handleClickSendProofOfPayment = () =>{
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
          console.log(result);
          if(result.isConfirmed){

          }else{
            handleOpenProofOfPayment();
          }
      })
    }
    
    return(
        <div>
            <div className="upload-area__header">
                <p className="text-[0.9rem] text-[#c4c3c4d9] mt-0">
                 El archivo debé ser una imagen en formato JPG, JPEG o PNG.
                </p>
            </div>

            <div className="relative h-50 flex justify-center items-center flex-col border-[2px] border-dashed border-[#888] rounded-2xl mt-9 cursor-pointer transition-all hover:border-[#008cdd] py-8 px-3 hover:opacity-[0.7] min-h-[200px] "
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
                 <p className="text-base text-[#c4c3c4d9]  m-0 mt-[0.6rem]">
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
        <div className="flex flex-col my-8">
          <button className="uppercase w-full mb-5 bg-[#f57c00] text-luz py-4 font-Poppins text-base cursor-pointer"
          onClick={handleCancelMethodPayment}
          >
              Cancelar Pago por Transferencia
          </button>
          
              <button 
                className="uppercase w-full bg-[#008cdd] text-luz py-4 font-Poppins text-base cursor-pointer"
                onClick={()=>handleClickSendProofOfPayment()}
            >
                Enviar Comprobante
            </button>
        </div>
        </div>
    )
}