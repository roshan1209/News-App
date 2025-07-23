import '../styles/globals.css';
import { useEffect } from 'react';
import Header from "@/components/Header";
import Footer from "@/components/Footer";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, []);

  return (
      <div className="bg-red-50 text-black flex flex-col gap-4">
          <Header />
          <Component {...pageProps} />
          <Footer/>
      </div>
)
  ;
}

export default MyApp;
