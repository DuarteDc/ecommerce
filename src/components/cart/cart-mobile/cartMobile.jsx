import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { CartItems } from './cartItems';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { IconContext } from "react-icons";
import {MdOutlineRemoveShoppingCart} from "react-icons/md";

export const CartMobile = () =>{
    const [ shoppingCart , setShoppingCart] = useState([])
    const { cart , cartNotLogged } = useSelector((state) => state.cart);

    useEffect(() => {
      if(cart.length > 0){
        setShoppingCart(cart)
      }else{
        setShoppingCart(cartNotLogged)
      }
    }, [cart , cartNotLogged]);
    return(
        <div className="mx-[25px]">
          <div className="border border-solid border-[#888]">
           <Table className="min-w-full leading-normal">
			<Thead>
				<Tr>
                <Th className="px-5 py-3 border-b-2 border-gray-200 bg-[#333] text-xs font-semibold text-[#fff] uppercase tracking-wider text-center flex i">
                      Producto  
                </Th>
                <Th className="px-5 py-3 border-b-2 border-gray-200 bg-[#333] text-xs font-semibold text-[#fff] uppercase tracking-wider text-center">Precio</Th>
                <Th className="px-5 py-3 border-b-2 border-gray-200 bg-[#333] text-xs font-semibold text-[#fff] uppercase tracking-wider text-center">Existente</Th>
                <Th className="px-5 py-3 border-b-2 border-gray-200 bg-[#333] text-xs font-semibold text-[#fff] uppercase tracking-wider text-center">Cantidad</Th>
                <Th className="px-5 py-3 border-b-2 border-gray-200 bg-[#333] text-xs font-semibold text-[#fff] uppercase tracking-wider text-center">Subtotal</Th>
                <Th className="px-5 py-3 border-b-2 border-gray-200 bg-[#333] text-xs font-semibold text-[#fff] uppercase tracking-wider text-center">
                 Opciones
                </Th>
				</Tr>
						</Thead>
						<Tbody>
              {
                !shoppingCart.length ?
                  <Tr>
                    <Td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center" colSpan={6}>
                      <p className="text-gray-900 whitespace-no-wrap">
                        No has agregado productos al carrito de compras
                      </p>
                    </Td> 
                    </Tr>
                :
                shoppingCart.map(product=>(
                      <CartItems
                       key={product.product_id._id}
                       product={product}
                      />
                    )) 
              }
						</Tbody>
				   </Table>   
         </div>
        </div>
    )
}