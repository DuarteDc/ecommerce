import { IconContext } from "react-icons";
import {MdProductionQuantityLimits} from "react-icons/md";

export const NotFoundOrders = ({text}) =>{
    return(
        <div className="flex justify-center items-center font-Poppins mx-5">
            <IconContext.Provider value={{className:"text-5xl mr-5 text-[#880e4f]"}}>
              <MdProductionQuantityLimits/>  
            </IconContext.Provider>
            <p className="text-lg text-[#880e4f]">{text}</p>
        </div>
    )
}