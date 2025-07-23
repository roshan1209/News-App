import NewsItem from './NewsItem';

export default function NewsList({ articles }) {
    if (!articles || articles.length === 0) {
        return (
            <div className="text-center text-gray-800 py-8">
                No articles found.
            </div>
        );
    }

    return (
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {articles.map((article, index) => (
                <NewsItem key={index} article={article} />
            ))}
        </div>
    );
}
