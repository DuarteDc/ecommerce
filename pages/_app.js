import '../src/assets/styles/globals.css';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import 'animate.css';
import { wrapper } from '../src/store';

const MyApp = ({ Component, pageProps }) => (
    <Component {...pageProps} />
)

export default wrapper.withRedux(MyApp);

