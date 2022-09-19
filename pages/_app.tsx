import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <PayPalScriptProvider options={{ 'client-id': process.env.NEXT_PAYPAL_CLIENT_ID }}>
            <Component {...pageProps} />
        </PayPalScriptProvider>
    )
}

export default MyApp
