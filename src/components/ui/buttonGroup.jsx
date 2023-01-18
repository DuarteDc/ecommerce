import { memo } from 'react';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

const ButtonGroup = ({ quantity = 0, increaseDecreaseQuantityProduct, handleChangeQuantity, product }) => {

    const handleKeyPress = (e) => {
        let key = window.event ? e.which : e.keyCode;
        if (key < 48 || key > 57) {
            e.preventDefault();
        }
    }
    return (
        <div className="flex border-[1px] border-solid border-[#eee] items-center justify-center max-w-[130px] min-w-[100px] w-[95px] md:w-[130px] dark:border-dark dark:bg-dark">
            {
                product?.product_type === '2' ? (
                    <span className="w-[50px] h-full outline-none md:py-2 py-1 flex justify-center">
                        {quantity}
                    </span>
                ) : (
                    <>
                        <button
                            className="cursor-pointer hover:bg-gray-50 flex mx-auto w-full flex items-center justify-center py-3 dark:hover:bg-hover-dark"
                            onClick={() => increaseDecreaseQuantityProduct(-1)}
                        >
                            <RemoveIcon className="text-base" />
                        </button>
                        <input
                            type="text"
                            className="flex w-full outline-none text-center py-1 md:py-2 dark:bg-dark"
                            onChange={handleChangeQuantity}
                            value={quantity}
                            placeholder={quantity}
                            onKeyPress={handleKeyPress}
                        />
                        <button
                            className="cursor-pointer hover:bg-gray-50 flex mx-auto w-full flex items-center justify-center py-3 dark:hover:bg-hover-dark"
                            onClick={() => increaseDecreaseQuantityProduct(+1)}
                        >
                            <AddIcon className="text-base" />
                        </button>
                    </>
                )
            }
        </div>
    )
};

export default ButtonGroup;


ButtonGroup.displayName = 'ButtonGroup';