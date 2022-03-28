import { useFormik } from 'formik';
import * as Yup from 'yup';
import { startStoreNewsletterSuscription } from '../../actions/newsletterActions';
import { Form } from "semantic-ui-react";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';

export const Newsletter = () => {
  const dispatch = useDispatch();
  const {message} = useSelector((state)=>state.newsletter)
  const initialValues = {
    email:''
  }
  const validationSchema = {
    email: Yup.string().email(true).required("El correo requerido"),
  }

  const notify = (message) =>toast.success(message);

  useEffect(() => {
    if(message){
      notify(message)
    }
  }, [message]);


  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: (formData , {resetForm}) => {
      dispatch(startStoreNewsletterSuscription(formData));
      resetForm({values:initialValues})
    }
  });

    return (
        <div className="border-t-2  border-[#f6f6f6] border-solid py-16">
            <div className="w-full m-auto px-3">
             <div className="flex items-center flex-wrap flex-col lg:flex-row">
                 <div className="w-full p-6 md:w-2/4 lg:w-2/4  md:pr-[90px] lg:pl-[90px]">
                   <h3 className="text-lg uppercase mb-2 font-semibold  font-['Poppins']">Suscribete a Nuestro Newsletter</h3>
                   <p className="text-base text-[#666] font-['Poppins']">Suscribete para recibir nuestras promociones , ofertas y nuevos productos que están por salir.</p>
                 </div>
                 <div className="w-full md:w-2/4 lg:w-2/4 md:pr-[90px] lg:pr-[90px]">
                   <Form className="relative" onSubmit={formik.handleSubmit}>
                    
                      <input name="email" required type="text" placeholder="Ingresa tu correo electronico" value={formik.values.email}
                       onChange={formik.handleChange} className="bg-[#f5f5f5] w-full h-[45px] py-0 px-[15px] text-sm leading-normal text-[#222] border-none rounded-none transition-all outline-none"/>
                       
                      <button type="submit" className="absolute right-0 top-0 h-[45px] border-none bg-[#333] text-[#fff] outline-none text-[16px] transition-all py-0 px-[20px]">Suscribirme</button>                 
                   </Form>
                   <ToastContainer/>
                 </div>
             </div>
            </div>
        </div>
    );
};
