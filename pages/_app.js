import '../src/assets/styles/globals.css';
import { wrapper } from '../src/store';
import Head from "next/head";

const MyApp = ({ Component, pageProps }) => (
    <>
        <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Love Nails</title>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" CrossOrigin />
            <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;700&family=Poppins:wght@200;300;700&display=swap" rel="stylesheet" />
        </Head>
        <Component {...pageProps} />
    </>
)

export default wrapper.withRedux(MyApp);

