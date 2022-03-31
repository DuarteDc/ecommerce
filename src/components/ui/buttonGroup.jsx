import { IconContext } from "react-icons"
import {HiMinusCircle , HiPlusCircle} from "react-icons/hi";

export const ButtonGroup = ({quantity = 1 , increaseDecreaseQuantityProduct , handleChangeQuantity}) =>{
    return (
        <div className="max-w-[130px] min-w-[130px] text-center inline-block relative border-[1px] border-solid border-[#eee] pt-[11px] pb-[10px] top-[-1px]">
             <button className="left-0 absolute top-0 bg-transparent cursor-pointer text-[#d0d0d0] w-[40px] h-full leading-[48px] transition-all flex justify-center items-center"
             onClick={()=>increaseDecreaseQuantityProduct(-1)}
             >
                <IconContext.Provider value={{ className: 'text-[25px]' }}>
                    <HiMinusCircle/>
                </IconContext.Provider>
             </button>
             <input 
               type="number" 
               className="absolute w-[50px] h-full outline-none top-0" 
               value={quantity}
               onChange={(e)=>handleChangeQuantity(e)}
             />
             {quantity}
             <button className="right-0 absolute top-0 bg-transparent cursor-pointer text-[#d0d0d0] w-[40px] h-full leading-[48px] transition-all flex justify-center items-center"
              onClick={()=>increaseDecreaseQuantityProduct(+1)}
             >
                <IconContext.Provider value={{ className: 'text-[25px]' }}>
                    <HiPlusCircle/>
                </IconContext.Provider>   
             </button>
           </div>
    )
}