import { useSelector } from "react-redux";
import { CartItems } from "./cartItems";


export const Cart = () => {
    const { cart } = useSelector((state) => state.cart);

    return (
        <div className=" mx-[25px] ">
                      <div className=" border-x border-x-solid border-x-[#e6e6e6]">
                      <table className="min-w-full leading-normal">
						<thead>
							<tr>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-[#333] text-xs font-semibold text-[#fff] uppercase tracking-wider text-center">Producto</th>
                                     <th className="px-5 py-3 border-b-2 border-gray-200 bg-[#333] text-xs font-semibold text-[#fff] uppercase tracking-wider text-center">Precio</th>
                                     <th className="px-5 py-3 border-b-2 border-gray-200 bg-[#333] text-xs font-semibold text-[#fff] uppercase tracking-wider text-center">Descuento</th>
                                     <th className="px-5 py-3 border-b-2 border-gray-200 bg-[#333] text-xs font-semibold text-[#fff] uppercase tracking-wider text-center">Existente</th>
                                     <th className="px-5 py-3 border-b-2 border-gray-200 bg-[#333] text-xs font-semibold text-[#fff] uppercase tracking-wider text-center">Cantidad</th>
                                     <th className="px-5 py-3 border-b-2 border-gray-200 bg-[#333] text-xs font-semibold text-[#fff] uppercase tracking-wider text-center">Subtotal</th>
								
							</tr>
						</thead>
						<tbody>
                            {
                               !cart.length ?
                                 <tr>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center" colSpan={5}>
                                        <p className="text-gray-900 whitespace-no-wrap">
                                          No has agregado productos al carrito de compras
                                         </p>
                                     </td> 
                                 </tr>

                               :
                               cart.map(product=>(
                                <CartItems
                                    key={product.product_id}
                                    product={product}
                                />
                               )) 
                            }
						</tbody>
				     </table>   
                      </div>
                    </div>
       
    )
}

export default Cart