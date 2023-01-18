import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';

export const NotFoundOrders = ({text}) =>{
    return(
        <div className="flex justify-center items-center font-Poppins mx-5">
            <ProductionQuantityLimitsIcon className="text-[#e91e63]" sx={{fontSize: 40}}/>
            <p className="text-lg text-[#e91e63] ml-5">{text}</p>
        </div>
    )
}