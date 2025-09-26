import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
        const apiKey = process.env.TMDB_API_KEY;
      
        if (!apiKey) {
          return res.status(500).json({ error: "TMDB API key is missing" });
        }
      
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`
          );
      
          if (!response.ok) {
            const errorData = await response.json();
            console.error("TMDB error:", errorData);
            return res.status(500).json({ error: "TMDB fetch failed", details: errorData });
          }
      
          const data = await response.json();
          res.status(200).json(data);
        } catch (err) {
          console.error("Server error:", err);
          res.status(500).json({ error: "Internal server error" });
        }
}
      