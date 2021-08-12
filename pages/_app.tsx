import type { AppProps } from 'next/app';
import Nav from '../components/Nav';
import 'tailwindcss/tailwind.css';
import '../styles/fonts.css';
import '../styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Nav />
      <div className='max-w-7xl mx-auto px-4 sm:px-6'>
        <Component {...pageProps} />
      </div>
    </>
  );
};

export default App;
