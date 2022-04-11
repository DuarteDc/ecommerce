import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { wrapper } from '../src/store';
import '../src/assets/styles/globals.css';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import 'animate.css';
import * as ga from '../src/libs/ga';
import { CookiesProvider } from "react-cookie"




const  MyApp = ({ Component, pageProps })=>{
    const router = useRouter()

    useEffect(() => {
        const handleRouteChange = (url) => {
          ga.pageview(url)
        }
        //When the component is mounted, subscribe to router changes
        //and log those page views
        router.events.on('routeChangeComplete', handleRouteChange)
    
        // If the component is unmounted, unsubscribe
        // from the event with the `off` method
        return () => {
          router.events.off('routeChangeComplete', handleRouteChange)
        }
      }, [router.events])

    const getLayout = Component.getLayout || ((page) => page);
    return getLayout(
      <CookiesProvider>
        <Component {...pageProps} />
      </CookiesProvider>
    )

}

export default wrapper.withRedux(MyApp);