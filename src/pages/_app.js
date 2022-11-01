import { Provider as ReduxProvider } from 'react-redux'
import { store, persistor } from '../app/store'
PersistGate
import '../styles/globals.css'
import { Provider } from "next-auth/client"
import { PersistGate } from 'redux-persist/integration/react';


const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider session={pageProps.session}>

    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Component {...pageProps} />

      </PersistGate>
    </ReduxProvider>
    </Provider>


  )
}

export default MyApp
