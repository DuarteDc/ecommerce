import Link from "next/link";
import { IconContext } from "react-icons";
import { BsInstagram, BsTwitter, BsFacebook, BsYoutube } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="h-2/4 py-4 px-11 md:px-32 bg-black md:mb-0 text-white mt-60">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-12 mb-12">
        <div className="p-2">
          <p className="text-xl font-bold uppercase">¿Tienes dudas?</p>
          <p>
          Háganos saber en la tienda en el piso 8, 379 Hudson St, New York, NY 10018 o llámenos al (+1) 96 716 6879
          </p>
        </div>
        <div className="p-2 flex flex-col">
          <p className="text-xl font-bold uppercase">Ayuda</p>
            <Link href="/orden">Orden</Link>
            <Link href="/devoluciones">Devoluciones</Link>
            <Link href="/envios">Envíos</Link>
            <Link href="/preguntass">Preguntas Frecuentes</Link>
            <Link href="/orden">Facturas</Link>
        </div>
        <div className="p-2 flex flex-col">
          <p className="text-xl font-bold uppercase">Enlaces</p>
            <Link href="/">Inicio</Link>
            <Link href="/marcas">Marcas</Link>
            <Link href="/categorias">Categorias</Link>
            <Link href="/products">Productos</Link>
            <Link href="/contacto">Contacto</Link>
            <Link href="/acerca-de-nosotros">Acerca de</Link>
        </div>
        <div className="p-2">
          <p className="text-xl font-bold uppercase">
            Siguenos en nuestras Redes Sociales
          </p>
          <div className="flex mt-6 justify-start">
            <Link href="/" className="mx-3 text-sm ">
              <IconContext.Provider
                value={{ size: "1.1rem", className: "hover:text-[#3b5998]  mr-3" }}
              >
                <BsFacebook />
              </IconContext.Provider>
            </Link>
            <Link href="/" className="mx-3 text-sm">
              <IconContext.Provider
                value={{ size: "1.1rem", className: "hover:text-[#E1306C]  mr-3" }}
              >
                <BsInstagram />
              </IconContext.Provider>
            </Link>
            <Link href="/" className="mx-3 text-sm">
              <IconContext.Provider
                value={{ size: "1.1rem", className: "hover:text-[#00acee]  mr-3" }}
              >
                <BsTwitter />
              </IconContext.Provider>
            </Link>
            <Link href="/" className="mx-3 text-sm">
              <IconContext.Provider
                value={{ size: "1.1rem", className: "hover:text-[#c4302b]  mr-3" }}
              >
                <BsYoutube />
              </IconContext.Provider>
            </Link>
          </div>
        </div>
      </div>
      <p className="text-center">@Copyright 2022 By Digital Pinneapple</p>
    </footer>
  );
};

export default Footer;
