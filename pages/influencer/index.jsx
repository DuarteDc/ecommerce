import Layout from "../../src/components/Layouts"
import { wrapper } from "../../src/store";
import { startLoadAdministrableLogo } from "../../src/actions/administrableActions";
import { BannerImage } from "../../src/components/ui/bannerImage";
import FormInfluencer from "../../src/components/influencer/FormInfluencer";

const Influencer = () => {

    return (
        <Layout
            title="Wapizima - Influencer"
        >
            <BannerImage
                title="Convierte en nuestro socio"
            />
            <section className=" max-w-[1490px] mx-auto my-20 h-4/5 mb-80 mt-40">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="text-justify">
                        <h2 className="font-Poppins text-[25px] uppercase font-lg  text-[#222] font-semibold mb-10">¿Quieres formar parte de la comunidad influencer?</h2>
                        <p className="text-lg mb-5">
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Earum, laudantium, eaque facere totam odit officia ex iusto enim sed aut hic quidem provident, autem natus corporis. Odio accusantium facere iste, mollitia quod animi, ex quidem quam minus, eius corporis. Dolorum fugiat aperiam cupiditate accusantium quod eos reprehenderit ut dolorem. Odit nemo
                        </p>
                        <p className="text-lg ">
                            enim sed quisquam unde nostrum dolorum debitis cupiditate provident optio sunt natus reiciendis voluptatem, illum eos vero esse doloribus! Voluptas eveniet maiores beatae sapiente, ratione fugiat veniam voluptatum placeat quasi dolorem necessitatibus molestias, officiis ipsa optio amet vero voluptatem? Molestias praesentium rerum sapiente voluptatum repellendus dolorem reprehenderit ut aliquam?
                        </p>
                    </div>
                    <div className="lg:col-span-2 lg:pl-20">
                        <FormInfluencer />
                    </div>
                </div>
            </section>
        </Layout>
    )
}


export const getStaticProps = wrapper.getStaticProps((store) => async () => {
    await store.dispatch(startLoadAdministrableLogo());
    return {
        revalidate: 3600
    }
});

export default Influencer