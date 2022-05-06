import { Grid, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material"
import { useSelector } from "react-redux"
import { helpers } from "../../../helpers";

export const OrderDetails = () =>{
   const {orderDetail} = useSelector((state)=>state.orders);
   const subtotal = helpers.priceFormat(orderDetail.subtotal);
   const shippment = helpers.priceFormat(orderDetail.shippment);
   const total = helpers.priceFormat(orderDetail.subtotal + orderDetail.shippment)
    return (
      <Grid container spacing={3} className="font-Poppins">
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
             <div className="flex justify-between">
               <p>Dirección de envÍo:</p>
               <p className="max-w-[300px] text-[#888] text-sm font-light">{orderDetail?.shippment_direction?.street},{' '} 
               {orderDetail?.shippment_direction?.postalcode}, {' '}
               {orderDetail?.shippment_direction?.city}{' '}
                </p>
             </div>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
             <div className="flex justify-between">
               <p>Dirección de envÍo:</p>
               <p className="max-w-[300px] text-[#888] text-sm font-light">{orderDetail?.shippment_direction?.street},{' '} 
               {orderDetail?.shippment_direction?.postalcode}, {' '}
               {orderDetail?.shippment_direction?.city}{' '}
                </p>
             </div>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <div className="flex justify-between items-center">
               <p>Resumen del pedido</p>
               <Table className="max-w-[300px]">
                 <TableHead>
                   <TableRow>
                     <TableCell className="text-[#888] text-sm font-light">Descripción</TableCell>
                     <TableCell className="text-[#888] text-sm font-light" >Subtotal</TableCell>
                   </TableRow>
                 </TableHead>
                 <TableBody>
                   <TableRow>
                     <TableCell className="text-[#888] text-sm font-light">
                      Productos
                     </TableCell>
                     <TableCell className="text-[#888] text-sm font-light">
                       {subtotal}
                     </TableCell>
                   </TableRow>
                   <TableRow>
                     <TableCell className="text-[#888] text-sm font-light">
                      Gastos de Envío
                     </TableCell>
                     <TableCell className="text-[#888] text-sm font-light">
                       {shippment}
                     </TableCell>
                   </TableRow>
                   <TableRow>
                     <TableCell></TableCell>
                     <TableCell className="text-[#888] text-sm font-light" >{total}</TableCell>
                   </TableRow>
                 </TableBody>
               </Table>
         </div>
        </Grid>
      </Grid>
    )
}