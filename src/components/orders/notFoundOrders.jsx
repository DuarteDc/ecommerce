import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';

export const NotFoundOrders = ({text}) =>{
    return(
        <div className="flex justify-center items-center font-Poppins mx-5">
            <ProductionQuantityLimitsIcon className = "text-5xl mr-5 text-[#880e4f]" />
            <p className="text-lg text-[#880e4f]">{text}</p>
        </div>
    )
}