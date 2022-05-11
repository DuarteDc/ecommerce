import { useFormik } from 'formik';
import * as Yup from 'yup';
import { startStoreNewsletterSuscription } from '../../actions/newsletterActions';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';

export const Newsletter = () => {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.newsletter)
  const initialValues = {
    email: ''
  }
  const validationSchema = {
    email: Yup.string().email(true).required("El correo requerido"),
  }

  const notify = (message) => toast.success(message);

  useEffect(() => {
    if (message) {
      notify(message)
    }
  }, [message]);


  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: (formData, { resetForm }) => {
      dispatch(startStoreNewsletterSuscription(formData));
      resetForm({ values: initialValues })
    }
  });

  return (
    <section className="border-t-2  border-[#f6f6f6] border-solid py-16">
      <div className="w-full m-auto px-3">
        <div className="grid grid-cols-1 lg:grid-cols-2 px-5 md:px-10 lg:px-20  items-center">
          <div className="w-full mb-10 md:px-2">
            <h2 className="text-lg uppercase font-semibold  font-['Poppins']">Suscribete a Nuestro Newsletter</h2>
            <p className="text-base text-[#666] font-['Poppins']">Suscribete para recibir nuestras promociones , ofertas y nuevos productos que están por salir.</p>
          </div>
          <div className="flex">
            <form onSubmit={formik.handleSubmit} className="w-full flex">
              <input name="email" type="text" placeholder="Ingresa tu correo electronico" value={formik.values.email}
                onChange={formik.handleChange} className="bg-[#f5f5f5] w-full py-4 px-10 text-sm leading-normal text-[#222] border-none rounded-none transition-all outline-none" />

              <button type="submit" className="border-none bg-[#333] ml-2 lg:ml-5 text-[#fff] px-2 md:px-5 text-[16px] transition-all">Suscribirme</button>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
    </section>
  );
};
