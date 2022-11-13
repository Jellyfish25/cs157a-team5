import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { AppProps } from 'next/app';
import { CookiesProvider } from 'react-cookie';
import { AuthProvider } from '../hooks';
import { Navbar } from '../components';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CookiesProvider>
      <AuthProvider>
        <Navbar />
        <Component {...pageProps} />
      </AuthProvider>
    </CookiesProvider>
  );
}

export default MyApp;
