import { useSelector } from 'react-redux';
import Layout from '../Layouts';
import CategoryComponent from './Categories';
import FacilityAreaComponent from './FacilityArea';
import Newsletter from './Newsletter';
import PartnerArea from './PartnerArea';
import ProductsArea from './ProductsArea';
import ProductsOfferAreaComponent from './ProductsOfferArea';
import Slider from './Slider';

const HomeComponents = () => {
    const { offers } = useSelector((state)=>state.offers);
    return (
        <Layout>
           <Slider/>
           <FacilityAreaComponent/>
           <CategoryComponent/>
           { offers.length && <ProductsOfferAreaComponent/> || null} 
           <ProductsArea/>
           <Newsletter/>
           <PartnerArea/>
        </Layout>
    );
};

export default HomeComponents;