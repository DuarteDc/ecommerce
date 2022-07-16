import * as Yup from "yup";
import Link from "next/link";
import Image from "next/image";
import { useFormik } from "formik";
import { Grid } from "@mui/material";
import { IconContext } from "react-icons";
import { BsInstagram, BsFacebook } from "react-icons/bs";
import { SiTiktok } from "react-icons/si";
import { startStoreNewsletterSuscription } from "../../actions/newsletterActions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const Footer = ({ categories }) => {
  const { facebook, instagram, tiktok } = useSelector(
    (state) => state.administrable
  );

  const dispatch = useDispatch();
  const initialValues = {
    email: "",
  };
  const validationSchema = {
    email: Yup.string().email(true).required("El correo requerido"),
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: (formData, { resetForm }) => {
      dispatch(startStoreNewsletterSuscription(formData));
      resetForm({ values: initialValues });
    },
  });
  return (
    <footer className="left-0 right-0 bottom-0 min-h-[250px] pt-[60px] pb-[20px] bg-[#333] text-luz mx-auto px-auto font-Poppins text-base font-thin">
      <div className="max-w-[1200px] mx-auto px-3">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={12} md={12} lg={5} xl={5}>
            <div className="flex justify-between flex-wrap">
              <div>
                <h6>Sobre nosotros</h6>
                <ul>
                  <li className="text-[12px]">Acerca de nostros</li>
                </ul>
              </div>
              <div>
                <h6>Ayuda y apoyo</h6>
                <ul>
                  <li className="text-[12px]">
                    <Link href="/preguntas-frecuentes">
                      Preguntas frecuentes
                    </Link>
                  </li>
                  {categories?.map((category) => (
                    <li className="text-[12px]" key={category._id}>
                      <Link
                        href={{
                          pathname: "/preguntas-frecuentes",
                          query: { category_id: category._id },
                        }}
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h6>Enlaces</h6>
                <ul>
                  <li className="text-[12px]">
                    <Link href="/">Inicio</Link>
                  </li>
                  <li className="text-[12px]">
                    <Link href="/marcas">Marcas</Link>
                  </li>
                  <li className="text-[12px]">
                    <Link href="/categorias">Categorias</Link>
                  </li>
                  <li className="text-[12px]">
                    <Link href="/productos">Productos</Link>
                  </li>
                  <li className="text-[12px]">
                    <Link href="/contacto">Contacto</Link>
                  </li>
                  <li className="text-[12px]">
                    <Link href="/acerca-de-nosotros">Acerca de</Link>
                  </li>
                </ul>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={7} xl={7}>
            <div className="w-full flex justify-center flex-wrap">
              <div className="w-full lg:w-[40%] text-center">
                <h3>Encuentranos en:</h3>
                <div className="flex mt-6 justify-center mb-4">
                  <Link href={facebook} className="mx-3 text-sm ">
                    <a target="_blank">
                      <IconContext.Provider
                        value={{
                          size: "1.1rem",
                          className:
                            "cursor-pointer hover:text-[#3b5998]  mr-3",
                        }}
                      >
                        <BsFacebook />
                      </IconContext.Provider>
                    </a>
                  </Link>
                  <Link href={instagram} passHref className="mx-3 text-sm">
                    <a target="_blank">
                      <IconContext.Provider
                        value={{
                          size: "1.1rem",
                          className:
                            "cursor-pointer hover:text-[#E1306C]  mr-3",
                        }}
                      >
                        <BsInstagram />
                      </IconContext.Provider>
                    </a>
                  </Link>
                  <Link href={tiktok} passHref className="mx-3 text-sm">
                    <a target="_blank">
                      <IconContext.Provider
                        value={{
                          size: "1.1rem",
                          className:
                            "cursor-pointer hover:text-[#E1306C]  mr-3",
                        }}
                      >
                        <SiTiktok />
                      </IconContext.Provider>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="w-full lg:w-[60%] mb-5">
                <p className="leading-7 mb-5">
                  Suscríbete para recibir ofertas exclusivas, promociones y más.
                </p>
                <form
                  onSubmit={formik.handleSubmit}
                  className="w-full flex justify-center"
                >
                  <input name="email" type="text" placeholder="Ingresa tu correo electronico" value={formik.values.email}
                    onChange={formik.handleChange} className="bg-[#f5f5f5] w-full py-4 px-10 text-sm leading-normal text-[#222] border-none     rounded-none transition-all outline-none" />
                  <button
                    type="submit"
                    className="ml-2 border-none bg-[#000] text-[#fff] px-2 py-1 md:px-5 text-[16px] transition-all"
                  >
                    Enviar
                  </button>
                  {formik.touched.email && formik.errors.email ? (
                    <span className="text-red-500 text-sm">
                      {formik.errors.email}
                    </span>
                  ) : null}
                </form>
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
            <div className="w-full lg:text-left text-center">
              <span className="leading-10">Aceptamos</span>
              <div className=" w-full lg:w-[50%] flex justify-center lg:justify-between items-center mb-5">
                <Image
                  src="/assets/images/creditCards/card1.png"
                  width={50}
                  height={30}
                  alt="card"
                />
                <Image
                  src="/assets/images/creditCards/card3.png"
                  width={50}
                  height={30}
                  alt="card"
                />
                <Image
                  src="/assets/images/creditCards/card4.png"
                  width={50}
                  height={30}
                  alt="card"
                />
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
            <div className="w-full h-full flex items-end">
              <span className="text-[12px]">
                {" "}
                @Copyright 2022 By Digital Pinneapple
              </span>
            </div>
          </Grid>
        </Grid>
      </div>
    </footer>
  );
};

export default Footer;
