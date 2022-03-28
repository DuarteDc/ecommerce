import Image from "next/image";

export const CategoryArea = () => {
  return (
    <section className="pb-[20px] my-10">
      <div className="max-w-[1140px] w-full mx-auto">
        <div className="flex flex-wrap">
          <div className=" flex-grow-0 flex-shrink-0 basis-auto w-[33%]    ">
           <div className="mb-8 
              relative 
              text-center 
              overflow-hidden
              before:absolute 
              before:top-0 
              left-0 
              before:w-full
              before:h-[98.6%] 
             before:bg-[#333] 
              before:opacity-[0.45] 
              before:z-[2]"
              >
           <Image
            src="/assets/images/category.jpg"
            width={390}
            height={450}
           />
           <div className="absolute top-[25%] left-0 right-0 my-0 mx-auto z-[3] translate-y-2/4">
            <h3 className="mb-[40px] text-luz font-bold text-xl leading-tight">Productos</h3>
            <a className="bg-transparent text-[#fff] border-[#fff] border-solid border mt-5 py-4 px-10 leading-normal rounded-none uppercase font-normal text-sm cursor-pointer">Ver más</a>
           </div>
           </div>
          </div>
          <div className="flex-grow-0 flex-shrink-0 basis-auto w-[66.6%]">
            <div className="flex flex-wrap">
              <div className="flex-grow-0 flex-shrink-0 basis-auto w-[50%]">
              <div className="mb-8 
              relative 
              text-center 
              overflow-hidden
              before:absolute 
              before:top-0 
              left-0 
              cursor-pointer
              before:w-[92%]
              before:h-[97%] 
             before:bg-[#333] 
              before:opacity-[0.45] 
              before:z-[2]">
           <Image
            src="/assets/images/brands.jpg"
            width={350}
            height={220}
            className="w-full"
           />
           <div className="absolute top-[25%] left-0 right-0 my-0 mx-auto z-[3] translate-y-2/4">
            <h3 className="mb-[40px] text-luz font-bold text-xl leading-tight">Marcas</h3>
           </div>
           </div>
              </div>
              <div className="flex-grow-0 flex-shrink-0 basis-auto w-[50%]">
              <div className="mb-8 
              relative 
              text-center 
              overflow-hidden
              before:absolute 
              before:top-0 
              left-0 
              cursor-pointer
              before:w-[92%]
              before:h-[97%] 
             before:bg-[#333] 
              before:opacity-[0.45] 
              before:z-[2]">
           <Image
            src="/assets/images/category.jpg"
            width={350}
            height={220}
           />
           <div className="absolute top-[25%] left-0 right-0 my-0 mx-auto z-[3] translate-y-2/4">
            <h3 className="mb-[40px] text-luz font-bold text-xl leading-tight">Colecciones</h3>
           </div>
           </div>
           </div>
           <div className="flex-grow-0 flex-shrink-0 basis-auto w-[100%]">
              <div className="mb-8 
              relative 
              text-center 
              overflow-hidden
              before:absolute 
              before:top-0 
              left-0 
              cursor-pointer
              before:w-[97%]
              before:h-[97%] 
             before:bg-[#333] 
              before:opacity-[0.45] 
              before:z-[2]">
           <Image
            src="/assets/images/offers.jpg"
            width={736}
            height={177}
           />
           <div className="absolute top-[20%] left-0 right-0 my-0 mx-auto z-[3] translate-y-2/4">
            <h3 className="mb-[40px] text-luz font-bold text-xl leading-tight">Ofertas</h3>
           </div>
           </div>
           </div>
           </div>
          </div>
        </div>
      </div>
    </section>
  );
};
