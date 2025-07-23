import { useRouter } from 'next/router';
import { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchBar() {
    const [query, setQuery] = useState('');
    const router = useRouter();

    const handleSearch = (e) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query)}`);
        }
    };

    return (
        <form onSubmit={handleSearch} className="flex gap-2">
            <input
                type="text"
                placeholder="Search news..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 border border-gray-800 bg-white rounded px-3 py-2"
            />
            <button
                type="submit"
                className="hidden sm:block bg-cyan-400 text-white px-4 py-2 rounded"
            >
                <Search/>
            </button>
        </form>
    );
}
