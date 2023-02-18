import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { wrapper } from '../src/store';
import '../src/assets/styles/globals.css';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import 'animate.css';
import * as ga from '../src/libs/ga';
import { datadogRum } from '@datadog/browser-rum'

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { loadDimensionsOfBrowser } from '../src/actions/uiActions';


const MyApp = ({ Component, pageProps }) => {
  
  const router = useRouter();
  datadogRum.init({
    applicationId: '667e147b-7ddd-4c86-adfc-61290b72f9d1',
    clientToken: process.env.NEXT_PUBLIC_DATADOG_CLIENT,
    site: 'datadoghq.com',
    service: 'wec',
    env: process.env.NEXT_PUBLIC_DATADOG_ENV,
    sampleRate: 100,
    sessionReplaySampleRate: 20,
    trackInteractions: true,
    trackResources: true,
    trackLongTasks: true,
    defaultPrivacyLevel: 'mask-user-input'
  });

  datadogRum.startSessionReplayRecording();

  const dispatch = useDispatch();

  const getWindowSizes = () => {
    if (window.innerWidth < 767) return dispatch(loadDimensionsOfBrowser('sm'));
    dispatch(loadDimensionsOfBrowser('lg'));
  }

  useEffect(() => {
    getWindowSizes();
    window.addEventListener('resize', getWindowSizes);
    return () => window.removeEventListener('resize', getWindowSizes);
  }, []);

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
      <Component {...pageProps} />
    </ThemeProvider>
  )

}

export default wrapper.withRedux(MyApp);