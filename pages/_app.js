import { Provider } from 'react-redux'
import '../src/assets/styles/globals.css'
import { makeStore } from '../src/store'

const MyApp = ({ Component, pageProps } ) => {
  return(
    <Provider store={makeStore}>
      <Component {...pageProps} />
    </Provider>
     
  )
}

export default MyApp

