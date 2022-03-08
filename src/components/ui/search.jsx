import {BsSearch} from "react-icons/bs";

export const Search = ({openSearch}) => {
    return (
        <div className={`w-full py-4 ${openSearch ? 'block' : 'hidden' } animate__animated animate__zoomIn`}> 
            <div className="border-solid rounded-sm flex border-[1px] border-[#e6e6e6] pl-4">
              <button className="w-[38px] h-[60px] text-[#333] flex justify-center items-center text-sm cursor-pointer transition-all	duration-[0.4s] ease-linear delay-0">
                  <BsSearch/>
              </button>
              <input type="text" placeholder="Buscar producto" className="w-full h-[68px] font-Poppins text-medium leading-[1.6] text-[#333] pr-4 border-0 border-transparent outline-0	"/>
            </div>
        </div>
    );
};
