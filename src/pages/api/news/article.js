export default async function handler(req, res) {
    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ message: "Missing article URL" });
    }

    try {
        const response = await fetch(
            `https://newsapi.org/v2/top-headlines?country=in&pageSize=100&apiKey=${process.env.NEWS_API_KEY}`
        );

        const data = await response.json();

        const article = data.articles.find((a) => a.url === url);

        if (!article) {
            return res.status(404).json({ message: "Article not found" });
        }

        return res.status(200).json({ article });
    } catch (error) {
        console.error("Error fetching article:", error);
        return res.status(500).json({ message: "Server error" });
    }
}
