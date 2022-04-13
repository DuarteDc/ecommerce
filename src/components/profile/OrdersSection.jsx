
const OrdersSection = ({ handleClickOrder, orders }) => {

    return (
        <>
            {
                orders.map((order, index) => (
                    <div className="p-5 my-2 border-2 border-gray-300 relative" key={index}>
                        <div className="mb-2">
                            <h2 className="text-xl font-bold truncate">Pedido: {order.id}</h2>
                            <h3 className="text-gray-500">Orden: Recibida</h3>
                        </div>
                        <div>
                            <p className="mb-3">Fecha de pedido: 30 de agosto de 2022</p>
                            <p className="font-semibold">Subtotal: $2000</p>
                            <p className="font-semibold">Envío: $2000</p>
                            <p className="font-semibold">Total: $2500</p>
                        </div>
                        <span className="flex flex-row-reverse sm:w-full lg:absolute lg:bottom-5 lg:right-5">
                            <p
                                className="mt-4 lg:mt-0 w-full lg:w-2/12 cursor-pointer bg-black text-white py-2 px-4 hover:bg-white border-2 border-black hover:text-[#222] transition-all duration-700 ease-in-out text-center text-sm"
                                onClick={()=>handleClickOrder(order.id)}
                            >Ver detalles de la orden
                            </p>
                        </span>
                    </div>
                ))
            }

            {/* <div className="p-5 my-2 border-2 border-gray-300 relative">
                <div className="mb-2">
                    <h2 className="text-xl font-bold truncate">Pedido: 622cde80c01e577a18e6bc5e</h2>
                    <h3 className="text-gray-500">Orden: Recibida</h3>
                </div>
                <div>
                    <p className="mb-3">Fecha de pedido: January 12, 2022</p>
                    <p className="font-semibold">Subtotal: $2000</p>
                    <p className="font-semibold">Envío: $2000</p>
                    <p className="font-semibold">Total: $2500</p>
                </div>
                <span className="flex flex-row-reverse sm:w-full lg:absolute lg:bottom-5 lg:right-5">
                    <p
                        className="mt-4 lg:mt-0 w-full lg:w-2/12 cursor-pointer bg-black text-white py-2 px-4 hover:bg-white border-2 border-black hover:text-black transition-all duration-700 ease-in-out text-center text-sm"
                        onClick={() => setOpenProductDetail(true)}
                    >Ver detalles de la orden
                    </p>
                </span>
            </div> */}
        </>
    )
}

export default OrdersSection