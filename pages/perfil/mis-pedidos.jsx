
import { useState } from "react"
import { wrapper } from '../../src/store';
import Layout from '../../src/components/Layouts'
import { startLoadAdministrableLogo } from '../../src/actions/administrableActions'
import { BannerImage } from '../../src/components/ui/bannerImage';
import OrdersSection from '../../src/components/profile/OrdersSection';
import OrderDetail from "../../src/components/profile/OrderDetail";
import helpersProducts from "../../src/helpers/helpersProducts";
import { useRouter } from "next/router";

const MisPedidos = ({ tabActive }) => {

    const router = useRouter();

    const [openProductDetail, setOpenProductDetail] = useState(false);

    const { filterSearch } = helpersProducts;

    const tabsData = [
        { _id: 1, name: 'Pedidos' },
        { _id: 1, name: 'Pendiente de envío' },
        { _id: 1, name: 'Pedidos cancelados' },
    ]

    const filterOrdersByDate = ({ target }) => {
        const date = target.value;
        filterSearch({ router, date });
    }

    return (
        <Layout>
            <BannerImage
                title="Mis Pedidos"
            />

            <section className="container mx-auto mt-20 h-screen">
                <div className="flex flex-wrap justify-start items-center text-[#888]">
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
                <div className="flex flex-row-reverse">
                    <select name="" id="" className="px-2" onChange={filterOrdersByDate}>
                        <option value="last-week">Ultima semana</option>
                        <option value="last-month">Ultimo mes</option>
                        <option value="3-months-ago">3 Meses</option>
                        <option value="last-year-ago">Un año</option>
                    </select>
                </div>
                <div>
                    {
                        openProductDetail ? (
                            <OrderDetail />//recibe la orden
                        ) : (
                            <OrdersSection setOpenProductDetail={setOpenProductDetail} />
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
    })

export default MisPedidos