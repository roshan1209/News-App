import { useRouter } from 'next/router';
import {useEffect, useRef, useState} from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import Loader from "@/components/Loader";

export default function ArticleDetail() {
    const router = useRouter();
    const { getArticle } = useLocalStorage();
    const [article, setArticle] = useState(null);
    const loaderRef = useRef();

    useEffect(() => {
        if (!router.isReady) return;

        const key = encodeURIComponent(router.query.id);
        const savedArticle = getArticle(key);
        if (savedArticle) {
            setArticle(savedArticle);
        } else {
            console.warn('Article not found in localStorage');
        }
    }, [router.isReady]);

    if (!article) return (
        <div ref={loaderRef} className="text-center py-8">
            <Loader/>
        </div>
    );

    return (
        <div className="max-w-2xl mx-auto p-4 h-screen">
            <h1 className="text-2xl font-bold">{article.title}</h1>
            <p className="text-sm text-gray-500 my-2">{article.author}</p>
            <p className="text-sm text-gray-500">{article.publishedAt}</p>
            {article.urlToImage && <img src={article.urlToImage} alt={article.title} className="my-4 w-full"/>}
            <p>{article.content || article.description}</p>
            <button
                className='my-2 bg-blue-800 px-3 py-1 text-white rounded hover:bg-gray-300 hover:text-gray-800'
                onClick={() => {
                    window.open(article.url, '_blank', 'noopener,noreferrer');
                }}>
                Read more
            </button>
        </div>
    );
}
