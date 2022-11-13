import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app';
import { CookiesProvider } from 'react-cookie';
import { AuthProvider } from '../hooks';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CookiesProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </CookiesProvider>
  );
}

export default MyApp;
