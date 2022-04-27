import { useEffect, useState } from "react";
import Image from "next/image"
import { helpers } from "../../../helpers"
import { ButtonGroup } from "../../ui";
import {startRemoveProductShoppingCart, updatedProductQuantityCartNotLogged, removeProductsShoppingCartNotLogged, startUpdatedProductQuantity} from "../../../actions/shoppingCartActions";
import { useDispatch, useSelector } from "react-redux";
import {useDebounce} from "../../../hooks/useDebounce";
import {toast } from "react-toastify";
import { IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { Tr,Td } from 'react-super-responsive-table';


export const CartItems = ({product}) =>{
    const { product_id , quantity } = product;
    const dispatch = useDispatch();
    const {logged} = useSelector((state)=>state.auth)
    const [quantityInput , setQuantityInput] = useState(quantity);
    const [productSelected , setProductSelect] = useState({})

    const price_product = helpers.priceFormat(product_id.price);
    const subtotaProduct = product_id.price * quantity ;
    const {totalWithDiscountApply} = helpers.calculatNewTotalToPay(product_id.discount , subtotaProduct);
    const subtotal = helpers.priceFormat(totalWithDiscountApply || 0 );
    
    const quantityInputadd = useDebounce(quantityInput , 1000);
    const productSelectedUpdated = useDebounce(productSelected , 2000);

    const notify = (message) =>toast(message);


    useEffect(() => {
      if(Object.keys(productSelectedUpdated).length > 0){
        dispatch(startUpdatedProductQuantity(product));
      }
    }, [productSelectedUpdated]);

    useEffect(() => {
      if(Object.keys(quantityInputadd).length > 0){
         if(Number(quantityInputadd) > Number(product.product_id.quantity)){
           notify('No puedes agregar más cantidad de la que se tiene en stock');
           setQuantityInput(product.product_id.quantity)
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

         product.quantity = Number(quantityInputadd);

         if(logged){
           dispatch(startUpdatedProductQuantity(product));
         }else{
            dispatch(updatedProductQuantityCartNotLogged(product));
         }
    }, [quantityInputadd]);


    const increaseDecreaseQuantityProduct = (value) =>{
      if(value === -1){
        if(product.quantity === 1) return;
        product.quantity = (Number(product.quantity) - 1);
        setQuantityInput((Number(product.quantity)));
        if(logged){
          setProductSelect(product);

        }else{
          dispatch(updatedProductQuantityCartNotLogged(product));
        }
         return;
      }
      product.quantity = product.quantity + 1;
      if(product.quantity > product_id.quantity) return;
      setQuantityInput((Number(product.quantity)));
      if(logged){
        setProductSelect(product);
      }else{
        dispatch(updatedProductQuantityCartNotLogged(product));
      }
      return;
    }

    const handleChangeQuantity = (e) =>{
      setQuantityInput(e.target.value)
    }

    const handleRemoveProduct = (_id) =>{

      if(logged){
        dispatch(startRemoveProductShoppingCart(_id));
      }else{
        dispatch(removeProductsShoppingCartNotLogged(_id));
      }
    }

    return(
        <Tr>
        <Td  data-testid="td" className="px-4 py-5 border-b border-gray-200 bg-white text-sm flex items-center text-center">
         <Image
           src={product.product_id.multimedia[0].path}
           alt={product.name}
           width={150}
           height={150}
         />
           <span className="text-gray-900 whitespace-no-wrap px-4 ">
           {product_id.name}
           </span>
         </Td>
         <Td  className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
           <p className="text-gray-900 whitespace-no-wrap ">
           {price_product}
           </p>
         </Td>
         <Td  className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
           <p className="text-gray-900 whitespace-no-wrap ">
           {product_id.quantity}
           </p>
         </Td>
         <Td  className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
           <ButtonGroup
             quantity={quantityInput}
             increaseDecreaseQuantityProduct={increaseDecreaseQuantityProduct}
             handleChangeQuantity={handleChangeQuantity}
           />
         </Td>
         <Td  className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
          <p className="text-gray-900 whitespace-no-wrap ">
           {subtotal}
           </p>
         </Td>
         <Td  className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
           <IconButton onClick={ ()=>handleRemoveProduct(product_id._id)}>
             <DeleteIcon/>
           </IconButton>
         </Td>
    </Tr>
    )
}