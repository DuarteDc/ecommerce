
const OrdersSection = ({ setOpenProductDetail }) => {

    return (
        <div className="p-5 my-2 border-2 border-gray-300">
            <div className="mb-5">
                <h2 className="text-xl font-bold">Pedido: #622cde80c01e577a18e6bc5e</h2>
                <h3 className="text-gray-500">Orden: Recibida</h3>
            </div>
            <div>
                <p>Fecha de pedido: January 12, 2022</p>
                <p className="font-semibold">Monto: $2000</p>
                <p className="font-semibold">Total: $2500</p>
            </div>
            <span className="flex flex-row-reverse">
                <p className="cursor-pointer" onClick={() => setOpenProductDetail(true)}>Ver detalles...</p>
            </span>
        </div>
    )
}

export default OrdersSection