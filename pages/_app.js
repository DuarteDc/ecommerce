import '../src/assets/styles/globals.css';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import 'animate.css';
import { wrapper } from '../src/store';
import Head from "next/head";
import { useEffect } from 'react';

function MyApp({ Component, pageProps }){
    const getLayout = Component.getLayout || ((page) => page)
    return getLayout(<Component {...pageProps} />)

}

export default wrapper.withRedux(MyApp);

