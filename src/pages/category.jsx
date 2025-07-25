import { useRef } from 'react';
import { useRouter } from 'next/router';
import NewsList from '../components/NewsList';
import Loader from "@/components/Loader";
import {useInfiniteArticles} from "@/hooks/useInfinateArticles";

export default function CategoryPage() {
    const { query } = useRouter();

    const loaderRef = useRef();
    const { articles, loading, hasMore } = useInfiniteArticles({
        endpoint: '/api/news/category',
        query: { category: query.name },
        loaderRef
    });

    return (
        <div className="mx-auto p-4 bg-red-50 text-gray-800 min-h-screen">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold capitalize">Category: {query.name}</h1>
            </div>
            {!loading && <NewsList articles={articles} /> }
            <div ref={loaderRef} className="text-center py-8">
                {loading && <Loader />}
            </div>
        </div>
    );
}
