import { AppProps } from 'next/app';
import { useEffect } from 'react';

// Custom App component for Next.js
function MyApp({ Component, pageProps }: AppProps) {
  // Effect to handle any global side effects
  useEffect(() => {
    // Example: Initialize any global libraries or settings here
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;