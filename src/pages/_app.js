import { Provider as ReduxProvider } from 'react-redux'
import { store } from '../app/store'
import '../styles/globals.css'
import { Provider } from "next-auth/client"
const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider session={pageProps.session}>
    <ReduxProvider store={store}>
      <Component {...pageProps} />
    </ReduxProvider>
    </Provider>


  )
}

export default MyApp
