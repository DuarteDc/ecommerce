import NavBar from "./NavBar";
import Slider from "./Slider";
import Categories from "./Categories";
import Card from "./Card";
import Footer from "./Footer";

const Content = () => {
    const cards = [1,2,3,4,5,6,7,8,9,10,11,12,13];
    return(
    <>
        <NavBar />
        <Slider />
        <Categories />
        <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {
                cards.map(card =>(  
                    <Card />
                ))
            }
        </section>
        <Footer />
    </>
    )
}

export default Content;
