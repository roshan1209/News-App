import { useRef } from 'react';
import NewsList from '../components/NewsList';
import Loader from "@/components/Loader";
import {useInfiniteArticles} from "@/hooks/useInfinateArticles";

export default function Home() {
  const loaderRef = useRef();
  const { articles, loading, hasMore } = useInfiniteArticles({
    endpoint: '/api/news/headlines',
    loaderRef
  });

  return (
      <div className='bg-cray-200 h-screen'>
          {!loading && <NewsList articles={articles} /> }
        <div ref={loaderRef} className="text-center py-8">
          {loading && <Loader/>}
        </div>
      </div>
  );
}
