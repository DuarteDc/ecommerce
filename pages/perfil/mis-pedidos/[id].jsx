import { useSelector } from 'react-redux';

import { startLoadAdministrableLogo } from '../../../src/actions/administrableActions';
import { startLoadCurrencies } from '../../../src/actions/countryAcctions';
import { startGetOrder } from '../../../src/actions/ordersActions';
import { wrapper } from '../../../src/store';

import { helpers } from '../../../src/helpers';

import Layout from '../../../src/components/Layouts';
import { BannerImage } from '../../../src/components/ui/bannerImage';
const ShowOrder = () => {

    const { orderDetail } = useSelector(state => state.orders);

    const { products_list } = orderDetail;

    const subtotal = helpers.priceFormat(orderDetail.subtotal);
    const total = helpers.priceFormat(orderDetail.total);
    const shippment = helpers.priceFormat(orderDetail.shippment)

    const OrderStatus = ({ status }) => {
        return (
            <div className="ml-2">
                {
                    status === 1 ? (
                        <span className="bg-amber-500 px-10 text-white text-sm rounded-lg">Pendiente de aprobación</span>
                    ) : status === 2 ? (
                        <span className="bg-blue-500 px-10 text-white text-sm rounded-lg">Aprobada - Prendiente de envío</span>
                    ) : (
                        <span className="bg-green-500 px-10 text-white text-sm rounded-lg">Pedido enviado</span>
                    )
                }
            </div>
        )
    }

    return (
        <Layout>
            <BannerImage
                title="Detalle de la orden"
                banner="bg-banner7"
            />
            <section className="min-h-screen mx-auto container my-10 lg:my-20 font-Poppins overflow-hidden">
                <div className="my-10 grid grid-col-1 lg:grid-cols-2">
                    <div>
                        <div className="font-semibold mb-2">
                            <span>Pedido N.º </span>
                            {orderDetail.folio}
                        </div>
                        <hr />
                        <div className="font-semibold mt-2">
                            Estatus de pago: {orderDetail.total_payments === orderDetail.total ? (
                                <span className="bg-green-500 px-10 text-white text-sm rounded-lg">
                                    Pagado
                                </span>
                            ) : (
                                <span className="bg-amber-500 px-10 text-white text-sm rounded-lg">
                                    Pendiente de pago
                                </span>
                            )
                            }
                        </div>
                        <div className="flex font-semibold">
                            <span>Estatus de envío: </span>
                            <OrderStatus status={orderDetail.orderStatus} />
                        </div>
                    </div>
                    <div>
                        <h2 className="font-semibold mb-2">Dirección de envío</h2>
                        <hr />
                        <div className="mt-2">
                            <span className="">{orderDetail.shippment_direction.name}</span>
                        </div>
                        <div>
                            <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea, in!</p>
                        </div>
                    </div>
                </div>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 overflow-auto">
                    <thead className="text-xs text-white uppercase bg-[#333] dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="py-3 px-6">
                                Nombre
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Cantidad
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Precio
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Descuento
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Subtotal
                            </th>
                            <th scope="col" className="py-3 px-6">
                                Total
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products_list?.map(({ _id, product_id, quantity, discount, total, subtotal }) => (
                                <tr className="cursor-pointer bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={_id}>
                                    <td scope="row" className="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap dark:text-white">
                                        <img src={product_id.multimedia[0].path} alt="" className="w-10 h-10 rounded-full" />
                                        <div className="pl-3">
                                            <div className="text-base font-semibold">{product_id?.name}</div>
                                            <div className="font-normal text-gray-500">{product_id.description}</div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        {quantity > 1 ? `${quantity} pzas` : `${quantity} pza`}
                                    </td>
                                    <td className="py-4 px-6">
                                        {helpers.priceFormat(product_id.price)}
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center">
                                            {
                                                discount > 0 ? ` -${discount}%` : `0%`
                                            }
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="font-semibold text-gray-600 hover:underline">{helpers.priceFormat(subtotal)}</span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="font-semibold text-gray-600 hover:underline">{helpers.priceFormat(total)}</span>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <div>
                    <div className="flex items-center mt-20">
                        <hr className="w-full h-0.5 bg-gray-200 mr-2" />
                        <p className="text-gray-700 font-semibold">Detalles</p>
                        <hr className="w-full h-0.5 bg-gray-200 ml-2" />
                    </div>
                    <div className="flex flex-row-reverse mt-5">
                        <div className="w-4/12 px-6  shadow-md">
                            {
                                orderDetail.coupon && (
                                    <span className="flex justify-between border-b-2 border-gray-200 py-2">
                                        <p className="font-bold">Cupon:</p>
                                        <p>NA</p>
                                    </span>
                                )
                            }
                            <span className="flex justify-between border-b-2 border-gray-200 py-2">
                                <p className="font-bold">Subtotal:</p>
                                <p>{subtotal}</p>
                            </span>
                            <span className="flex justify-between border-b-2 border-gray-200 py-2">
                                <p className="font-bold">Envío:</p>
                                <p>{shippment}</p>
                            </span>
                            <span className="flex justify-between py-2">
                                <p className="font-bold">Total:</p>
                                <p>{total}</p>
                            </span>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export const getServerSideProps = wrapper.getServerSideProps((store) =>
    async (ctx) => {
        const isValid = await store.dispatch(startGetOrder(ctx.query.id, ctx.req.cookies.token));
        await store.dispatch(startLoadCurrencies());
        await store.dispatch(startLoadAdministrableLogo());
        if (!isValid) return { notFound: true };
    });

export default ShowOrder;