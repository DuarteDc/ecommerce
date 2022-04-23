import { useSelector } from "react-redux";
import { startLoadAdministrableLogo } from "../../../src/actions/administrableActions";
import { startLoadFaqsCategories } from "../../../src/actions/faqsActions";
import Layout from "../../../src/components/Layouts";
import { wrapper } from "../../../src/store";
import { MdOutlineMailOutline } from "react-icons/md";
import { IconContext } from "react-icons";
import { forgotPassword } from "../../../src/actions/authActions";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useState } from "react";
import { errorNotify, successNotify } from "../../../src/helpers/helpers";
import Link from "next/link";

const ForgotPassword = () => {

  const { categories } = useSelector((state) => state.faqs);
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (email) => {
    setLoading(true);
    const { hasError, message } = await forgotPassword(email);
    if (hasError) {
      errorNotify(message);
      setLoading(false);
      return;
    }
    setLoading(false);
    successNotify(message);
  }

  const initialValues = {
    email: '',
  }

  const validationSchema = {
    email: Yup.string().email("El correo electronico no es valido").required("El correo electronico es requerido"),
  }

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: (email) => {
      handleForgotPassword(email);
    }
  });

  return (
    <Layout
      categories={categories}
    >
      <section className="bg-testimonial bg-center bg-cover bg-no-repeat px-3 md:px-0 pb-20">
        <div className="container mx-auto min-h-screen relative">
          <div className="w-full md:w-8/12 lg:w-7/12 right-0 top-1/4 absolute bg-white p-10 lg:p-20">
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-10">
                <h1 className="text-2xl font-Poppins font-bold mb-5">Olvide mi contraseña</h1>
                <p className="text-lg my-1">Ingresa tu correo electronico asociado con tu cuenta.</p>
                <p>Te enviaremos un correo con las instrucciones a seguir.</p>
              </div>
              <div className="border-[1px] border-solid border-[#e6e6e6] rounded-sm flex items-center">
                <IconContext.Provider
                  value={{ className: "text-[25px] text-[#888] w-[20%]" }}
                >
                  <MdOutlineMailOutline />
                </IconContext.Provider>
                <input
                  type="text"
                  name="email"
                  placeholder="Ingresa tu correo electronico"
                  className="w-full h-12 font-Poppins text-[13px] leading-[1.6] text-[#333] pr-[30px] pl-[5px] outline-0"
                  onChange={formik.handleChange}
                  autoComplete="off"
                />
              </div>
              {formik.touched.email && formik.errors.email ? (
                <span className="text-red-500 text-sm">{formik.errors.email}</span>
              ) : null}
              <button
                className="w-full cursor-pointer text-center bg-[#222] text-white py-4 hover:bg-[#444] transition-all duration-700 ease-in-out mt-10"
                type="submit"
                disabled={loading && true}
              >
                Enviar
              </button>
            </form>
            <div className="text-gray-500 mt-5 underline hover:text-gray-900 text-sm">
              <Link href="/auth/login">
                <a>Iniciar Sesión</a>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout >
  )
}


export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  await store.dispatch(startLoadAdministrableLogo());
  await store.dispatch(startLoadFaqsCategories())
  return {
    revalidate: 86400
  }
});

export default ForgotPassword;