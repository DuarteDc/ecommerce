
import { useState } from "react"
import { wrapper } from '../../src/store';
import Layout from '../../src/components/Layouts'
import { startLoadAdministrableLogo } from '../../src/actions/administrableActions'
import { BannerImage } from '../../src/components/ui/bannerImage';
import OrdersSection from '../../src/components/profile/OrdersSection';
import OrderDetail from "../../src/components/profile/OrderDetail";
import helpersProducts from "../../src/helpers/helpersProducts";
import { useRouter } from "next/router";
import { startLoadFaqsCategories } from "../../src/actions/faqsActions";
import { useSelector } from "react-redux";

const MisPedidos = ({ tabActive }) => {

    const router = useRouter();

    const { categories } = useSelector((state) => state.faqs)

    const [openProductDetail, setOpenProductDetail] = useState(false);
    const [order, setOrder] = useState(null)
    const { filterSearch } = helpersProducts;

    const tabsData = [
        { _id: 1, name: 'Pendiente de envío' },
        { _id: 1, name: 'Pedidos cancelados' },
    ]

    const orders = [
        { id: "0329jdm02939uu0ok" },
        { id: "dp9eud09u03ue09u0" },
        { id: "p0932489yfh9j0pok" }
    ]

    const filterOrdersByDate = ({ target }) => {
        const date = target.value;
        filterSearch({ router, date });
    }

    const handleClickOrder = (order) => {
        setOpenProductDetail(true);
        setOrder(order)
    }

    return (
        <Layout
            categories={categories}
        >
            <BannerImage
                title="Mis Pedidos"
            />

            <section className="container mx-auto mt-20 px-2 lg:px-0">
                <div className="flex flex-wrap justify-start items-center text-[#888]">
                    <span
                        className={`cursor-pointer border-solid font-Poppins text-medium leading-[1.2] hover:text-[#333] hover:border-[#797979] ${tabActive == null && "text-[#333] border-[#797979]"
                            } border-b-[1px] border-transparent mx-1 mr-8  duration-[0.4s] transition-all`}
                    >
                        Todos
                    </span>
                    {tabsData.map((tabData, index) => (
                        <span
                            className={`cursor-pointer border-solid font-Poppins text-medium leading-[1.9] hover:text-[#333] hover:border-[#797979] ${tabActive == index && "text-[#333] border-[#797979]"
                                } border-b-[1px] border-transparent mx-1 mr-8  duration-[0.4s] transition-all`}
                            key={tabData._id}
                        >
                            {tabData.name}
                        </span>
                    ))}
                </div>
                <div className="flex flex-row-reverse mt-3 ">
                    <select name="" id="" className="w-full md:w-1/4 h-8 font-Poppins text-sm leading-[1.6] text-[#333] pl-[5px] outline-0 bg-gray-200" onChange={filterOrdersByDate}>
                        <option value="last-week">Ultima semana</option>
                        <option value="last-month">Ultimo mes</option>
                        <option value="3-months-ago">3 Meses</option>
                        <option value="last-year-ago">Un año</option>
                    </select>
                </div>
                <div className="mb-44">
                    {
                        openProductDetail ? (
                            <OrderDetail setOpenProductDetail={setOpenProductDetail} order={order} />//recibe la orden
                        ) : (
                            <OrdersSection handleClickOrder={handleClickOrder} orders={orders} />
                        )
                    }
                </div>
            </section>

        </Layout >
    )
}

export const getServerSideProps = wrapper.getServerSideProps((store) =>
    async () => {
        await store.dispatch(startLoadAdministrableLogo());
        await store.dispatch(startLoadFaqsCategories());
    })

export default MisPedidos