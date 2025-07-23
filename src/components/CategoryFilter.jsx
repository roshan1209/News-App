import { useRouter } from 'next/router';

const categories = {
    'general' : 'General',
    'business' : 'Business',
    'entertainment' : 'Entertainment',
    'health' : 'Health',
    'science' : 'Science',
    'sports' : 'Sports',
    'technology' : 'Technology'
};

export default function CategoryFilter() {
    const router = useRouter();

    const handleClick = category => {
        router.push(`/category?name=${category}`);
    };

    return (
        <div className="flex flex-wrap sm:justify-start justify-center lg:gap-2">
            {Object.entries(categories).map(([key, label]) => (
                <button
                    key={key}
                    onClick={() => handleClick(key)}
                    className="text-blue-400 px-3 py-1 rounded hover:bg-gray-300 hover:text-gray-800"
                >
                    {label}
                </button>
            ))}
        </div>
    );
}
