export default function Footer() {
    return (
        <footer className="bg-gray-100 dark:bg-gray-800 text-center py-6 mt-auto">
            <div className="max-w-6xl mx-auto px-4 text-sm text-gray-600 dark:text-gray-300">
                <p>&copy; {new Date().getFullYear()} News App. All rights reserved.</p>
                <p className="mt-2">
                    Powered by <a href="https://newsapi.org" className="underline hover:text-blue-500" target="_blank" rel="noopener noreferrer">NewsAPI.org</a>
                </p>
            </div>
        </footer>
    );
}
