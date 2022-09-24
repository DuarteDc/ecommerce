import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

export const ButtonGroup = ({ quantity = 1, increaseDecreaseQuantityProduct, handleChangeQuantity, product }) => {

    const handleKeyPress = (e) => {
        let key = window.event ? e.which : e.keyCode;
        if (key < 48 || key > 57) {
            e.preventDefault();
        }
    }
    return (
        <div className="max-w-[130px] min-w-[100px] w-[100px] md:w-[130px] text-center inline-block relative border-[1px] border-solid border-[#eee] pt-[11px] pb-[10px] top-[-1px]">
            {
                product?.product_type === '2' ? (
                    <span className="w-[50px] h-full outline-none top-0">
                        {quantity}
                    </span>
                ) : (
                    <>
                        <button className="left-0 absolute top-0 bg-transparent cursor-pointer text-[#d0d0d0] w-[40px] h-full leading-[48px] transition-all flex justify-center items-center"
                            onClick={() => increaseDecreaseQuantityProduct(-1)}
                        >
                            <RemoveIcon className="text-[25px]" />
                        </button>
                        <input
                            type="number"
                            className="absolute w-[50px] h-full outline-none top-0"
                            value={quantity}
                            onChange={handleChangeQuantity}
                            onKeyPress={handleKeyPress}
                        />
                        {quantity}
                        <button className="right-0 absolute top-0 bg-transparent cursor-pointer text-[#d0d0d0] w-[40px] h-full leading-[48px] transition-all flex justify-center items-center"
                            onClick={() => increaseDecreaseQuantityProduct(+1)}
                        >
                            <AddIcon className="text-[25px]" />
                        </button>
                    </>
                )
            }
        </div>
    )
}