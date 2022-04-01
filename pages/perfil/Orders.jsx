const Orders = () => {
    return (
        <article className="border-2 border-[#fa4401] p-5 rounded-lg cursor-pointer">
            <p className="text-center font-bold">Pedido #12</p>
            <hr />
            <div className="flex mt-4">
                <p className="font-light">Fecha de pedido:</p>
                <p>31-Marzo-2022</p>
            </div>
            <div className="flex mt-4">
                <p className="font-light">Monto:</p>
                <p>$200</p>
            </div>
            <div className="flex mt-4">
                <p className="font-light">Precio Final:</p>
                <p>$500</p>
            </div>
        </article>
    )
}

export default Orders