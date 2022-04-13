import { AiOutlineArrowLeft } from "react-icons/ai"
import { IconContext } from "react-icons";

const OrderDetail = ({ setOpenProductDetail, order }) => {
  return (
    <section className="border-2 border-gray-300 p-10 mt-10 animate__animated animate__fadeInLeft">
      <div className="flex items-center">
        <IconContext.Provider
          value={{ className: "text-[25px] text-[#888] mr-3 cursor-pointer hover:text-[#222]" }}
        >
          <AiOutlineArrowLeft onClick={() => setOpenProductDetail(false)} />
        </IconContext.Provider>
        <h2 className="text-3xl">Detalles del pedido</h2>
      </div>
      <p className="my-4">Pedido del 30 de agosto de 2022  |  Pedido {order}</p>
      <div className="grid grid-col-1 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="md:flex mt-4">
            <div className="w-full md:w-60">
            <img
              src="https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt=""
            />
            </div>
            <div className="md:px-5 text-lg">
              <p className="font-bold md:mb-3">Lorem ipsum dolor sit amet consectetur.</p>
              <p>Precio: $1300</p>
              <p>Cantidad: 20</p>
            </div>
          </div>
          <div className="md:flex mt-4">
            <div className="w-full md:w-60">
            <img
              src="https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt=""
            />
            </div>
            <div className="md:px-5 text-lg">
              <p className="font-bold md:mb-3">Lorem ipsum dolor sit amet consectetur.</p>
              <p>Precio: $1300</p>
              <p>Cantidad: 20</p>
            </div>
          </div>
          <div className="md:flex mt-4">
            <div className="w-full md:w-60">
            <img
              src="https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              alt=""
            />
            </div>
            <div className="md:px-5 text-lg">
              <p className="font-bold md:mb-3">Lorem ipsum dolor sit amet consectetur.</p>
              <p>Precio: $1300</p>
              <p>Cantidad: 20</p>
            </div>
          </div>
        </div>
        <div className="mt-10 lg:mt-0">
          <div>
            <div>
              <h4 className="font-bold mb-2">Dirección de envío</h4>
              <p>Lorem ipsum dolor sit amet.</p>
              <p>Lorem, ipsum.</p>
              <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laudantium, temporibus?</p>
              <p>Lorem ipsum dolor sit amet.</p>
            </div>
            <div className="mt-10">
              <h4 className="font-bold mb-2">Método de pago</h4>
              <p>Lorem ipsum dolor sit amet.</p>
            </div>
            <div className="mt-10">
              <h4 className="font-bold mb-2">Resumen del pedido</h4>
              <div className="flex justify-between">
                <p>Productos: </p> <p>$6999.00</p>
              </div>
              <div className="flex justify-between">
                <p>Envío: </p> <p>$30.00</p>
              </div>
              <div className="flex justify-between">
                <p>subtotoal: </p> <p>$6989.00</p>
              </div>
              <div className="flex font-bold justify-between mt-3 text-lg">
                <p>Total:</p> <p>$6999.00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OrderDetail