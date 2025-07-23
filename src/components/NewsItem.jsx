import {useLocalStorage} from "@/hooks/useLocalStorage";
import {router} from "next/client";

export default function NewsItem({ article }) {
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };
    const { updateStorage } = useLocalStorage();
    return (
        <div
            onClick={() =>  {
                const key = encodeURIComponent(article.url);
                updateStorage(key, article);
                router.push(`/article/${key}`);
            }}
            className="block break-inside-avoid cursor-pointer overflow-hidden rounded-md bg-white shadow hover:shadow-lg transition duration-300"
        >
            {article.urlToImage && (
                <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-full h-40 object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                        e.target.style.display = 'none';
                    }}
                />
            )}
            <div className="p-4">
                <h3 className="text-lg text-gray-900 font-semibold mb-2 line-clamp-2">
                    {article.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                    {article.description}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{article.source?.name}</span>
                    <span>{formatDate(article.publishedAt)}</span>
                </div>
            </div>
        </div>
    );
}
