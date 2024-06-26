// Assuming your global CSS is located at src/styles/globals.css
import { UserProvider } from '@auth0/nextjs-auth0/client';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}

export default MyApp;
