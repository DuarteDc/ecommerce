import Image from "next/image";
import { useRouter } from "next/router";

export const CategoryArea = () => {
  const router = useRouter();

  const handleClickRedirect = (path) => {
    router.push(`/${path}`);
  }

  return (
    <section className="pb-[20px] my-10 px-2 font-Poppins">
      <div className="max-w-[1140px] w-full mx-auto overflow-hidden">
        <div className="grid grid-cols-2 overflow-hidden">
          <div className="
            overflow-hidden
            z-20
            relative 
            text-center 
            overflow-hidden
            before:absolute 
            before:top-0 
            before:left-0 
            before:w-full
            before:h-full 
            before:bg-[#333] 
            before:overflow-hidden
            before:opacity-[0.60] 
            before:z-[2]
            hover:scale-105
            transition-all duration-700 ease-in-out"
            onClick={() => handleClickRedirect('productos')}
          >
            <Image src="/assets/images/productos.png" layout="fill" />
            <div className="absolute top-[25%] left-0 right-0 my-0 mx-auto z-[3] translate-y-2/4">
              <h2 className="mb-[40px] text-luz font-bold text-2xl leading-tight uppercase">Productos</h2>
              <button
                className="bg-transparent text-[#fff] border-[#fff] border-solid border mt-5 py-4 px-10 leading-normal rounded-none uppercase font-normal text-sm cursor-pointer hover:bg-white hover:text-gray-900 transition-all duration-700 ease-in-out"
                onClick={() => handleClickRedirect('productos')}>Ver más</button>
            </div>
          </div>
          <div className="bg-red-300 grid grid-row-2">
            <div className=" 
                z-10
                h-[300px]
                cursor-pointer
                relative 
                text-center 
                before:absolute 
                before:top-0 
                before:left-0 
                before:w-full
                before:overflow-hidden
                before:h-[300px]
                before:bg-[#333] 
                before:opacity-[0.60] 
                before:z-[2]
                hover:scale-105
                transition-all duration-700 ease-in-out"
              onClick={() => handleClickRedirect('marcas')}
            >
              <Image src="/assets/images/marca.png" width={300} height={300} layout="fill"  />
              <div className="absolute top-[25%] left-0 right-0 my-0 mx-auto z-[3] translate-y-2/4">
                <h2 className="mb-[40px] text-luz font-bold text-2xl leading-tight uppercase">Marcas</h2>
              </div>
            </div>
            <div className=" 
            h-[300px]
          relative 
          cursor-pointer
          text-center 
          overflow-hidden
          before:absolute 
          before:top-0 
          before:left-0 
          before:w-full
          before:h-full 
          before:bg-[#333] 
          before:opacity-[0.60] 
          before:z-[2]
          hover:scale-105
          transition-all duration-700 ease-in-out"
              onClick={() => handleClickRedirect('categorias')}
            >
              <Image
                src="/assets/images/categoria.png"
                width={300}
                height={300}
                layout="fill"
              />
              <div className="absolute top-[25%] left-0 right-0 my-0 mx-auto z-[3] translate-y-2/4">
                <h2 className="mb-[40px] text-luz font-bold text-2xl leading-tight uppercase">Categorías</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
