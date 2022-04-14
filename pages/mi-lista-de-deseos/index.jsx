
import { useSelector } from 'react-redux'
import { startLoadAdministrableLogo } from '../../src/actions/administrableActions'
import { startLoadFaqsCategories } from '../../src/actions/faqsActions'
import Layout from '../../src/components/Layouts'
import { BannerImage } from '../../src/components/ui'
import { wrapper } from '../../src/store'

const Wishlist = () => {

    const { categories } = useSelector((state) => state.faqs);

    return (
        <Layout categories={categories}>
            < BannerImage title="Mi lista de deseos" />
        </Layout >
    )
}


export const getServerSideProps = wrapper.getServerSideProps((store) =>
    async () => {
        await store.dispatch(startLoadAdministrableLogo());
        await store.dispatch(startLoadFaqsCategories());
    })

export default Wishlist