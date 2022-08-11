import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { wrapper } from '../src/store';
import '../src/assets/styles/globals.css';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import 'animate.css';
import * as ga from '../src/libs/ga';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import {
  GoogleReCaptchaProvider,
  GoogleReCaptcha
} from 'react-google-recaptcha-v3';




const MyApp = ({ Component, pageProps }) => {
  const router = useRouter()

    const theme = createTheme({
    palette: {
      primary: {
        light: '#a31545',
        main: '#e91e63',
        dark: '#ed4b82',
        contrastText: '#fff',
      },
    },
  });

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
    <ThemeProvider theme={theme}>
      <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA}>
        <Component {...pageProps} />
      </GoogleReCaptchaProvider>
    </ThemeProvider>
  )

}

export default wrapper.withRedux(MyApp);