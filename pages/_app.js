import '../src/assets/styles/globals.css';
import {wrapper} from '../src/store';

const MyApp = ({ Component, pageProps } ) => (
  <Component {...pageProps} />
)
 
export default wrapper.withRedux(MyApp);

