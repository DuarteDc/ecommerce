import { wrapper } from '../src/store';
import '../src/assets/styles/globals.css';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import 'animate.css';


const  MyApp = ({ Component, pageProps })=>{
    const getLayout = Component.getLayout || ((page) => page);
    return getLayout(<Component {...pageProps} />)

}

export default wrapper.withRedux(MyApp);