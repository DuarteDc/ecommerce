import Image from "next/image";
import { useRouter } from "next/router";

export const CategoryArea = () => {
  const router = useRouter();

  const handleClickRedirect = (path) => {
    router.push(`/${path}`);
  }

  return (
    <section className="pb-[20px] my-10 px-2">
      <div className="max-w-[1140px] w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
          <div className="
                    block
                      relative 
                      text-center 
                      overflow-hidden
                      before:absolute 
                      before:top-0 
                      before:left-0 
                      before:w-full
                      before:h-full 
                      before:bg-[#333] 
                      before:opacity-[0.45] 
                      before:z-[2]"
            onClick={() => handleClickRedirect('productos')}
          >
            <Image 
               src="/assets/images/category.jpg" 
               layout="responsive" 
               width={200} 
               height={200} 
            />
            <div className="absolute top-[25%] left-0 right-0 my-0 mx-auto z-[3] translate-y-2/4">
              <h2 className="mb-[40px] text-luz font-bold text-xl leading-tight">Productos</h2>
              <button
                className="bg-transparent text-[#fff] border-[#fff] border-solid border mt-5 py-4 px-10 leading-normal rounded-none uppercase font-normal text-sm cursor-pointer hover:bg-white hover:text-gray-900 transition-all duration-700 ease-in-out"
                onClick={() => handleClickRedirect('productos')}>Ver más</button>
            </div>
          </div>
          <div className="grid grid-rows-2 lg:col-span-2 gap-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className=" 
                cursor-pointer
                   relative 
                   text-center 
                   overflow-hidden
                   before:absolute 
                   before:top-0 
                   before:left-0 
                   before:w-full
                   before:h-full 
                   before:bg-[#333] 
                   before:opacity-[0.45] 
                   before:z-[2]"
                onClick={() => handleClickRedirect('marcas')}
              >
                <Image src="/assets/images/brands.jpg" width={100} height={100} layout="responsive" />
                <div className="absolute top-[25%] left-0 right-0 my-0 mx-auto z-[3] translate-y-2/4">
                  <h2 className="mb-[40px] text-luz font-bold text-xl leading-tight">Marcas</h2>
                </div>
              </div>
              <div className=" 
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
                    before:opacity-[0.45] 
                    before:z-[2]"
                onClick={() => handleClickRedirect('categorias')}
              >
                <Image
                  src="/assets/images/category.jpg"
                  width={100}
                  height={100}
                  layout="responsive"
                />
                <div className="absolute top-[25%] left-0 right-0 my-0 mx-auto z-[3] translate-y-2/4">
                  <h2 className="mb-[40px] text-luz font-bold text-xl leading-tight">Categorias</h2>
                </div>
              </div>
            </div>
            <div className="      
                       block                
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
                      before:opacity-[0.45] 
                      before:z-[2]"
              onClick={() => handleClickRedirect('ofertas')}
            >
              <Image
                src="/assets/images/offer2.jpg"
                width={200}
                height={200}
                layout="responsive"
              />
              <div className="absolute top-[25%] left-0 right-0 my-0 mx-auto z-[3] translate-y-2/4">
                <h2 className="mb-[40px] text-luz font-bold text-xl leading-tight">Ofertas</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
