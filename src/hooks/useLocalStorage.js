import { useState, useEffect } from 'react';

export const useLocalStorage = (storageKey = 'articles') => {
    const [data, setData] = useState({});

    // Load from localStorage on mount
    useEffect(() => {
        if (typeof window === 'undefined') return;
        try {
            const stored = localStorage.getItem(storageKey);
            setData(stored ? JSON.parse(stored) : {});
        } catch {
            setData({});
        }
    }, [storageKey]);

    // Save an article by encoded key
    const updateStorage = (encodedKey, article) => {
        try {
            const updated = { ...data, [encodedKey]: article };
            setData(updated);
            localStorage.setItem(storageKey, JSON.stringify(updated));
        } catch (err) {
            console.error('Error saving to localStorage:', err);
        }
    };

    // Read from localStorage directly (ensures persistence after refresh)
    const getArticle = (encodedKey) => {
        if (typeof window === 'undefined') return null;

        try {
            const stored = localStorage.getItem(storageKey);
            if (!stored) return null;

            const parsed = JSON.parse(stored);
            return parsed[encodedKey] || null;
        } catch (err) {
            console.error('Error reading from localStorage:', err);
            return null;
        }
    };

    return { data, updateStorage, getArticle };
};
