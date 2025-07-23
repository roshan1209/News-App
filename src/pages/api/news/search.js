export default async function handler(req, res) {
    const { q, pageSize = 10, page = 1 } = req.query;

    if (!q) {
        return res.status(400).json({ error: 'Search query "q" is required' });
    }

    try {
        const response = await fetch(
            `https://newsapi.org/v2/everything?q=${encodeURIComponent(q)}&pageSize=${pageSize}&page=${page}&apiKey=${process.env.NEWS_API_KEY}`
        );

        const data = await response.json();

        if (response.ok) {
            res.status(200).json(data);
        } else {
            res.status(response.status).json({ error: data.message });
        }
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong.' });
    }
}
