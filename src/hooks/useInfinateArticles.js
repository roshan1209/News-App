import { useState, useEffect, useRef, useCallback } from 'react';

export const useInfiniteArticles = ({ endpoint, query = {}, loaderRef }) => {
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const seenUrls = useRef(new Set());

    const buildUrl = () => {
        const url = new URL(endpoint, window.location.origin);
        url.searchParams.set('page', page);
        url.searchParams.set('pageSize', 10);
        Object.entries(query).forEach(([key, val]) => {
            if (val) url.searchParams.set(key, val);
        });
        return url.toString();
    };

    const fetchArticles = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(buildUrl());
            const data = await res.json();

            if (data.articles?.length) {
                const newArticles = data.articles.filter(article => !seenUrls.current.has(article.url));
                newArticles.forEach(article => seenUrls.current.add(article.url));
                setArticles(prev => [...prev, ...newArticles]);

                if (newArticles.length < 10) setHasMore(false);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error fetching articles:", error);
            setHasMore(false);
        }
        setLoading(false);
    }, [page, endpoint, JSON.stringify(query)]); // use JSON.stringify(query) to ensure correct deps

    useEffect(() => {
        if (query.category || query.q || endpoint.includes('headlines')) {
            fetchArticles();
        }
    }, [page, fetchArticles]);

    useEffect(() => {
        // reset state on query change
        seenUrls.current.clear();
        setArticles([]);
        setPage(1);
        setHasMore(true);
    }, [JSON.stringify(query), endpoint]);

    useEffect(() => {
        if (!loaderRef?.current) return;

        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && hasMore && !loading) {
                    setPage(prev => prev + 1);
                }
            },
            { threshold: 1.0 }
        );

        observer.observe(loaderRef.current);
        return () => observer.disconnect();
    }, [loaderRef, hasMore, loading]);

    return { articles, loading, hasMore };
};
