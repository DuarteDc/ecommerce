import { useFormik } from 'formik';
import * as Yup from 'yup';
import { startStoreNewsletterSuscription } from '../../actions/newsletterActions';
import { Form } from "semantic-ui-react";
import { useDispatch, useSelector } from 'react-redux';
import { BsFillBookmarkCheckFill } from 'react-icons/bs';
import Alert from '../ui/alert';

export const Newsletter = () => {
  const dispatch = useDispatch();
  const {message} = useSelector((state)=>state.newsletter)
  const initialValues = {
    name:'',
    email:''
  }
  const validationSchema = {
    name: Yup.string().required("El nombre es requerido"),
    email: Yup.string().email(true).required("El correo requerido"),
  }
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
             <div className="flex items-center">
                 <div className="w-2/4  pl-[90px]">
                   <h3 className="text-lg uppercase mb-2 font-semibold  font-['Poppins']">Suscribete a Nuestro Newsletter</h3>
                   <p className="text-base text-[#666] font-['Poppins']">Suscribete para recibir nuestras promociones , ofertas y nuevos productos que están por salir.</p>
                 </div>
                 <div className="w-2/4 pr-[90px]">
                 {
                       message &&
                     <Alert
                       icon={<BsFillBookmarkCheckFill/>}
                       message={message}
                       color={'bg-black'}
                     />
                     }
                   <Form className="flex justify-center flex-wrap" onSubmit={formik.handleSubmit}>
                      <input name="name" required type="text" placeholder="Ingresa tu nombre" value={formik.values.name}
                       onChange={formik.handleChange} className="bg-[#f5f5f5] w-[250px] h-11 py-0 px-4 text-sm leading-normal text-[#222] border-0 font-['Poppins'] mr-2 mb-4 outline-0"/>
                        <input name="email" required type="text" placeholder="Ingresa tu correo electronico" value={formik.values.email}
                       onChange={formik.handleChange} className="bg-[#f5f5f5] w-[250px] h-11 py-0 px-4 text-sm leading-normal text-[#222] border-0 font-['Poppins'] mb-4 outline-0"/>
                      <button type="submit" className="ml-2 h-11 border-none bg-[#222] text-luz outline-0 text-base py-0 px-5 font-['Poppins']">Suscribirme</button>                 
                   </Form>
                 </div>
             </div>
            </div>
        </div>
    );
};
