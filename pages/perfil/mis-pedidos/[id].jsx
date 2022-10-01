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

    const subtotal = helpers.priceFormat(orderDetail.subtotalCurrency);
    const total = helpers.priceFormat(orderDetail.totalCurrency);
    const shippment = helpers.priceFormat(orderDetail.shippmentInCurrency)

    const OrderStatus = ({ status }) => {
        return (
            <div className="ml-2 md:text-sm text-[10px] flex items-center">
                {
                    status === 1 ? (
                        <span className="bg-amber-500 md:px-10 px-3 text-white rounded-lg">Pendiente de aprobación</span>
                    ) : status === 2 ? (
                        <span className="bg-blue-500 md:px-10 px-3 text-white rounded-lg">Aprobada - Prendiente de envío</span>
                    ) : (
                        <span className="bg-green-500 md:px-10 px-3 text-white rounded-lg">Pedido enviado</span>
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
            <section className="min-h-screen mx-auto container my-10 lg:my-20 font-Poppins">
                <div className="my-10 grid grid-col-1 lg:grid-cols-2">
                    <div>
                        <div className="font-semibold mb-2">
                            <span>Pedido N.º </span>
                            {orderDetail.folio}
                        </div>
                        <hr />
                        <div className="flex font-semibold mt-2">
                            <span>Estatus de envío: </span>
                            <OrderStatus status={orderDetail.orderStatus} />
                        </div>
                    </div>
                    <hr className='lg:hidden' />
                    <div className="text-sm">
                        <h2 className="font-semibold lg:mb-3">Dirección de envío:</h2>
                        <hr className='hidden lg:block' />
                        <div className="lg:mt-2">
                            <span className="">{orderDetail.shippment_direction.name}</span>
                        </div>
                        <div>
                            <p className="text-gray-600">{`${orderDetail.shippment_direction.street} #${orderDetail.shippment_direction.no_ext}, ${orderDetail.shippment_direction.municipality.name}, ${orderDetail.shippment_direction.state.name}`}</p>
                        </div>
                    </div>
                </div>
                <div className="overflow-x-hidden">
                    <div className=" overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
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
                                products_list?.map(({ _id, product_id, quantity, discount, total, subtotal, priceCurrency, subtotalInCurrency, totalInCurrency }) => (
                                    <tr className="cursor-pointer bg-white border-b hover:bg-gray-50" key={_id}>
                                        <td scope="row" className="flex items-center py-4 px-6 text-gray-900 whitespace-nowrap">
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
                                            {helpers.priceFormat(priceCurrency)}
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center">
                                                {
                                                    discount > 0 ? ` -${discount}%` : `0%`
                                                }
                                            </div>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="font-semibold text-gray-600 hover:underline">{helpers.priceFormat(subtotalInCurrency)}</span>
                                        </td>
                                        <td className="py-4 px-6">
                                            <span className="font-semibold text-gray-600 hover:underline">{helpers.priceFormat(totalInCurrency)}</span>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    </div>
                </div>
                <div>
                    <div className="flex items-center mt-20">
                        <hr className="w-full h-0.5 bg-gray-200 mr-2" />
                        <p className="text-gray-700 font-semibold">Detalles</p>
                        <hr className="w-full h-0.5 bg-gray-200 ml-2" />
                    </div>
                    <div>
                        <div className="md:w-4/12 px-6 w-full  shadow-md">
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