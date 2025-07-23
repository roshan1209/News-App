export default async function handler(req, res) {
    const { country = 'us' } = req.query;

    try {
        const response = await fetch(
            `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=${process.env.NEWS_API_KEY}`
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
