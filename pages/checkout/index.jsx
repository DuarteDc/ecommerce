
//import Countdown from 'react-countdown';
import Countdown from "../../src/components/cart/Countdown";
import Layout from "../../src/components/Layouts"

const Checkout = () => {
    const products = [1, 1, 1, 1, 1, 1, 1];
    return (
        <Layout>
            <section className="container mx-auto rounded-lg mt-20">
                <div className="mt-12 grid grid-cols-1 lg:grid-cols-3">
                    <div className="lg:col-span-2 p-10">
                        <h2 className="uppercase font-bold text-2xl">Shooping Cart</h2>
                        <table className="w-full">
                            <thead className="border-b-2 border-gray-200 font-bold text-gray-400 text-center">
                                <tr>
                                    <td>Articulo</td>
                                    <td>Cantidad</td>
                                    <td>Precio</td>
                                    <td>Total</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products.map((product, index) => (
                                        <tr key={index}>
                                            <td className="flex items-center">
                                                <img src="http://animation.com.mx/img/productos/P%C3%B3steres.png" className="object-contain" width="100px" />
                                                <div>
                                                    <p className="font-light text-xs md:text-base">Name product</p>
                                                    <p className="font-light text-xs md:text-base">some description</p>
                                                </div>
                                            </td>
                                            <td className="text-center">
                                                <button className=" my-b bg-[#f58d16] font-bold py-2 mx-2 px-4 text-white rounded-full">-</button>
                                                <input type="number" className="text-center py-2 w-10 md:w-20 border-2 border-[#fa4401] rounded-lg" value="1" />
                                                <button className=" my-b bg-[#f58d16] font-bold py-2 px-4 mx-2 text-white rounded-full">+</button>
                                            </td>
                                            <td className="text-center">$200</td>
                                            <td className="text-center font-bold">$500</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="p-10">
                        <h2 className="uppercase font-bold text-2xl mb-6">Order Summary</h2>
                        <hr />
                        <p className="text-xl font-bold text-[#fa440a] mt-5">
                            Items 4
                        </p>
                        <Countdown />
                        <p className="mt-10">PROMO CODE</p>
                        <input type="text" className="px-4 py-2 w-2/3 mr-2 md:mr-2 rounded-lg border-[#fa440a] ring-[#fa440a] ring-2 focus:outline-none" />
                        <button className="my-5 bg-[#fa440a] py-2 px-4 rounded-lg text-white font-bold">
                            APPLY
                        </button>
                        <hr />
                        <div className="">
                            <span>
                                Pagar
                            </span>
                        </div>
                        <div className="flex justify-between font-bold mt-10">
                            <p>TOTAL COST</p>
                            <p>$1300.00</p>
                        </div>
                    </div>
                </div>
            </section>
        </Layout >
    )
}

export default Checkout