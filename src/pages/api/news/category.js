export default async function handler(req, res) {
    const { category } = req.query;

    if (!category) {
        return res.status(400).json({ error: 'Category is required' });
    }

    try {
        const url = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${process.env.NEWS_API_KEY}`;

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({ error: data.message });
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch category news' });
    }
}
