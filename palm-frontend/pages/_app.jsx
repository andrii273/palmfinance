import { authorizationAtom } from '@/helpers/authorize';
import '@/styles/globals.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import Cookies from 'js-cookie';
import { CookiesProvider } from 'react-cookie';
import Layout from '@/components/layout';
import PageOverlay from '@/components/layout/overlay';

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useAtom(authorizationAtom);
  const [layout, setLayout] = useState(false);

  useEffect(() => {
    if (!authorized && !router.pathname.includes('auth')) {
      router.push('/auth/login');
    }
  }, [authorized]);

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) setAuthorized(false); else setAuthorized(true);
    if (!token && !router.pathname.includes('auth')) {
      router.push('/auth/login');
    }

    setLayout(router.pathname.includes('auth'));
  }, [router]);

  return (
    <CookiesProvider>
      <PageOverlay />
      {
        layout ? <Component {...pageProps} /> :
          <Layout>
            <Component {...pageProps} />
          </Layout>
      }
    </CookiesProvider>
  );
}
