import { startLoadAdministrableLogo } from "../../src/actions/administrableActions";
import { startLoadFaqsCategories } from "../../src/actions/faqsActions";
import Layout from "../../src/components/Layouts"
import { BannerImage } from "../../src/components/ui"
import { wrapper } from '../../src/store';
import { CardProduct } from '../../src/components/ui';
import { useRouter } from "next/router";

const canvas = [
    {
        "_id": "628fc9af828a4b67eed8346d",
        "name": "Colecciones",
        "status": true,
        "data": [],
        "imageMobile": "https://cdn.wapizima.com/test/categories/mobile/628fc9af828a4b67eed8346d",
        "imageWeb": "https://cdn.wapizima.com/test/categories/web/628fc9af828a4b67eed8346d",
        "createdAt": "2022-05-26T18:40:47.863Z",
        "updatedAt": "2022-06-23T19:29:31.408Z",
        "url": "colecciones-xwp4ulgl5l",
        "totalProducts": 110
    },
    {
        "_id": "628fc9af828a4b67eed8346e",
        "name": "Acrilicos",
        "status": true,
        "data": [],
        "imageMobile": "https://cdn.wapizima.com/test/categories/mobile/628fc9af828a4b67eed8346e",
        "imageWeb": "https://cdn.wapizima.com/test/categories/web/628fc9af828a4b67eed8346e",
        "createdAt": "2022-05-26T18:40:47.849Z",
        "updatedAt": "2022-06-23T19:37:31.466Z",
        "url": "acrilicos-042l7qqsae",
        "totalProducts": 8
    },
    {
        "_id": "62a39bfd5e2c8b2e73c4cc70",
        "name": "Formas",
        "status": true,
        "data": [],
        "imageMobile": "https://cdn.wapizima.com/test/categories/mobile/62a39bfd5e2c8b2e73c4cc70",
        "imageWeb": "https://cdn.wapizima.com/test/categories/web/62a39bfd5e2c8b2e73c4cc70",
        "createdAt": "2022-06-10T19:31:09.822Z",
        "updatedAt": "2022-06-23T19:56:52.551Z",
        "url": "formas-pkkxz8yos",
        "totalProducts": 0
    },
    {
        "_id": "62b3652b77395116b816f976",
        "name": "Colors",
        "status": true,
        "data": [],
        "imageMobile": "https://cdn.wapizima.com/test/categories/mobile/62b3652b77395116b816f976",
        "imageWeb": "https://cdn.wapizima.com/test/categories/web/62b3652b77395116b816f976",
        "createdAt": "2022-06-22T18:53:31.353Z",
        "updatedAt": "2022-06-23T20:03:17.721Z",
        "url": "colors-bjpn-1e6j",
        "totalProducts": 0
    },
    {
        "_id": "628fc9af828a4b67eed83472",
        "name": "Stamping",
        "subcategories": [],
        "status": true,
        "data": [],
        "imageMobile": "https://cdn.wapizima.com/test/categories/mobile/628fc9af828a4b67eed83472",
        "imageWeb": "https://cdn.wapizima.com/test/categories/web/628fc9af828a4b67eed83472",
        "createdAt": "2022-05-26T18:40:47.846Z",
        "updatedAt": "2022-06-23T19:21:44.621Z",
        "url": "stamping-r9ja7utypj",
        "totalProducts": 0
    },
]

const Canvas = () => {

    const history = useRouter();

    const handleClickCard = (url) => {
        history.push(`/canvas/${url}`)
    }

    return (
        <Layout>
            <BannerImage
                title="Canvas"
                banner="bg-banner2"
            />
            <section className="min-h-screen container mx-auto mt-20 font-Poppins">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-16">
                    {canvas?.map((category) => (
                        <CardProduct
                            key={category._id}
                            image="https://cdn.shopify.com/s/files/1/0258/6276/6677/files/Thumbnail_intencion_Bebes_e_hijos_Collage_de_8-pichi.jpg?v=1653603117"
                            name={category?.name}
                            url={category?.url}
                            hasName={true}
                            handleClickCard={handleClickCard}
                            titleButton="Ver más..."
                        />
                    ))}
                </div>
            </section>
        </Layout>
    )
}

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
    await store.dispatch(startLoadAdministrableLogo());
    await store.dispatch(startLoadFaqsCategories());
    return {
        revalidate: 300
    }
});

export default Canvas