import { IconContext } from "react-icons";
import { BsInstagram, BsTwitter, BsFacebook, BsYoutube } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="h-2/4 py-4 px-11 md:px-32 bg-black md:mb-0 text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-12 mb-12">
        <div className="p-2">
          <p className="text-xl font-bold uppercase">¿Tienes dudas?</p>
          <p>
          Háganos saber en la tienda en el piso 8, 379 Hudson St, New York, NY 10018 o llámenos al (+1) 96 716 6879
          </p>
        </div>
        <div className="p-2">
          <p className="text-xl font-bold uppercase">Ayuda</p>
          <ul>
            <li>Orden</li>
            <li>Devoluciones</li>
            <li>Envíos</li>
            <li>Preguntas Frecuentes</li>
            <li>Facturas</li>
          </ul>
        </div>
        <div className="p-2">
          <p className="text-xl font-bold uppercase">Enlaces</p>
          <ul>
            <li>Inicio</li>
            <li>Marcas</li>
            <li>Categorias</li>
            <li>Productos</li>
            <li>Contacto</li>
            <li>Acerca de</li>
          </ul>
        </div>
        <div className="p-2">
          <p className="text-xl font-bold uppercase">
            Siguenos en nuestras Redes Sociales
          </p>
          <div className="flex mt-6 justify-center">
            <a href="/" className="mx-3 text-sm ">
              <IconContext.Provider
                value={{ size: "1.1rem", className: "hover:text-[#3b5998]" }}
              >
                <BsFacebook />
              </IconContext.Provider>
            </a>
            <a href="/" className="mx-3 text-sm">
              <IconContext.Provider
                value={{ size: "1.1rem", className: "hover:text-[#E1306C]" }}
              >
                <BsInstagram />
              </IconContext.Provider>
            </a>
            <a href="/" className="mx-3 text-sm">
              <IconContext.Provider
                value={{ size: "1.1rem", className: "hover:text-[#00acee]" }}
              >
                <BsTwitter />
              </IconContext.Provider>
            </a>
            <a href="/" className="mx-3 text-sm">
              <IconContext.Provider
                value={{ size: "1.1rem", className: "hover:text-[#c4302b]" }}
              >
                <BsYoutube />
              </IconContext.Provider>
            </a>
          </div>
        </div>
      </div>
      <p className="text-center">@Copyright 2022 By Digital Pinneapple</p>
    </footer>
  );
};

export default Footer;
