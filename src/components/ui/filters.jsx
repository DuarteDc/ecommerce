import React from "react";

export const FiltersArea = ({brands , openFilter}) => {
  return (
    <div className={`w-full py-[30px] ${openFilter ? 'block' : 'hidden' } animate__animated animate__zoomIn`}>
      <div className="grid-col-4 bg-[#f2f2f2] flex flex-wrap w-full px-10 pt-7">
        <div className="w-[25%] pr-2 pb-7">
          <div className="text-[#333] pb-[15px] font-Poppins font-semibold">
            {" "}
            Ordernar Por
          </div>
          <ul>
            <li className="pb-[6px]">
              <a className="font-Poppins text-base leading-[1.2] text-[#aaa] border-b-[1px] border-b-solid border-transparent">
                Default
              </a>
            </li>
            <li className="pb-[6px]">
              <a className="font-Poppins text-base leading-[1.2] text-[#aaa] border-b-[1px] border-b-solid border-transparent">
                {" "}
                Popularidad
              </a>
            </li>
            <li className="pb-[6px]">
              <a className="font-Poppins text-base leading-[1.2] text-[#aaa] border-b-[1px] border-b-solid border-transparent">
                Precio: Bajo a Alto
              </a>
            </li>
            <li className="pb-[6px]">
              <a className="font-Poppins text-base leading-[1.2] text-[#aaa] border-b-[1px] border-b-solid border-transparent">
                Precio: Alto a Bajo
              </a>{" "}
            </li>
          </ul>
        </div>
        <div className="w-[25%] pr-2 pb-7">
          <div className="text-[#333] pb-[15px] font-Poppins font-semibold">
            Precio
          </div>
          <ul>
            <li className="pb-[6px]">
              <a className="font-Poppins text-base leading-[1.2] text-[#aaa] border-b-[1px] border-b-solid border-transparent">
                $0.00 - $50.00
              </a>
            </li>
            <li className="pb-[6px]">
              <a className="font-Poppins text-base leading-[1.2] text-[#aaa] border-b-[1px] border-b-solid border-transparent">
                $50.00 - $100.00
              </a>
            </li>
            <li className="pb-[6px]">
              <a className="font-Poppins text-base leading-[1.2] text-[#aaa] border-b-[1px] border-b-solid border-transparent">
                $100.00 - $500.00
              </a>
            </li>
            <li className="pb-[6px]">
              <a className="font-Poppins text-base leading-[1.2] text-[#aaa] border-b-[1px] border-b-solid border-transparent">
                $500.00 - $1,000.00
              </a>
            </li>
            <li className="pb-[6px]">
              <a className="font-Poppins text-base leading-[1.2] text-[#aaa] border-b-[1px] border-b-solid border-transparent">
                $1,000.00+
              </a>
            </li>
          </ul>
        </div>
        <div className="w-[25%] pr-2 pb-7">
          <div className="text-[#333] mb-[15px] font-Poppins font-semibold">
            {" "}
            Marca
          </div>
          <ul>
              {
                brands.map(brand=>(
                    <li className="pb-[6px]" key={brand._id}>
                    <a className="font-Poppins text-base leading-[1.2] text-[#aaa] border-b-[1px] border-b-solid border-transparent">
                      {brand.name}
                    </a>
                  </li> 
                ))
              }
          </ul>
        </div>
        <div className="w-[25%] pr-2 pb-7">
          <span className="text-[#333] pb-[15px] font-Poppins font-semibold">
            {" "}
            Tag
          </span>
        </div>
      </div>
    </div>
  );
};
