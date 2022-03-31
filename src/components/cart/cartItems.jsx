import { useEffect, useState } from "react";
import Image from "next/image"
import { helpers } from "../../helpers"
import { ButtonGroup } from "../ui";
import { startCalculateTotalSale, updatedProductQuantity } from "../../actions/shoppingCartActions";
import { useDispatch } from "react-redux";
import {useDebounce} from "../../hooks/useDebounce";
import {toast } from "react-toastify";

export const CartItems = ({product}) =>{
    const dispatch = useDispatch();
    const price_product = helpers.priceFormat(product.price);
    const subtotal = helpers.priceFormat(product.price * product.quantity );
    const [quantityInput , setQuantityInput] = useState(product.quantity);
    const quantityInputadd = useDebounce(quantityInput , 1000);
    const notify = (message) =>toast(message);

    useEffect(() => {
      if(Object.keys(quantityInputadd).length > 0){
         if(Number(quantityInputadd) > Number(product.stock)){
           notify('No puedes agregar más cantidad de la que se tiene en stock');
           setQuantityInput(product.quantity)
           return;
         }

         if(Number(quantityInputadd) === 0){
          notify('La cantidad del producto no puede ser igual a 0');
          setQuantityInput(product.quantity);
          return;
         }
        }

        if(!quantityInput){
          notify('Ups , la cantidad del producto es requerida , no puede estar vacia');
          setQuantityInput(product.quantity)
          return;
         }

         product.quantity = Number(quantityInputadd)

         dispatch(updatedProductQuantity(product))
    }, [quantityInputadd]);


    const increaseDecreaseQuantityProduct = (value) =>{
      if(value === -1){
        if(product.quantity === 1) return;
        product.quantity = (Number(product.quantity) - 1);
        setQuantityInput((Number(product.quantity)));
         dispatch(updatedProductQuantity(product));
         return;
      }
      product.quantity = product.quantity + 1;
      if(product.quantity > product.stock) return;
      setQuantityInput((Number(product.quantity)));
      dispatch(updatedProductQuantity(product));
      return;
    }

    const handleChangeQuantity = (e) =>{
      setQuantityInput(e.target.value)
    }

    return(
        <tr>
        <td className="px-4 py-5 border-b border-gray-200 bg-white text-sm flex items-center text-center">
         <Image
           src={product.image}
           alt={product.name}
           width={150}
           height={150}
         />
           <span className="text-gray-900 whitespace-no-wrap px-4">
           {product.name}
           </span>
         </td>
         <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
           <p className="text-gray-900 whitespace-no-wrap">
           {price_product}
           </p>
         </td>
         <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
           <p className="text-gray-900 whitespace-no-wrap">
           {product.stock}
           </p>
         </td>
         <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
           <ButtonGroup
             quantity={quantityInput}
             increaseDecreaseQuantityProduct={increaseDecreaseQuantityProduct}
             handleChangeQuantity={handleChangeQuantity}
           />
         </td>
         <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
         <p className="text-gray-900 whitespace-no-wrap">
           {subtotal}
           </p>
         </td>
    </tr>
    )
}