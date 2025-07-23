import '../styles/globals.css';
import { useEffect } from 'react';
import Header from "@/components/Header";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, []);

  return (
      <div className="bg-red-50 text-black flex flex-col gap-4 h-auto">
          <Header />
          <div className="px-4 pb-4 ">
              <Component {...pageProps} />  
          </div>
      </div>
)
  ;
}

export default MyApp;
