import React, { useEffect, useState } from "react";
import MovieCarousel from "@/components/common/moviecarousel";
import { Movie } from "@/interfaces";

export default function Home() {
  const [trending, setTrending] = useState<Movie[]>([]);
  const [recommended, setRecommended] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleToggleFavorite = (id: string | number, isFav: boolean) => {
    console.log(`Movie ${id} is ${isFav ? "added" : "removed"} from favorites`);
  };

  useEffect(() => {
    async function fetchMovies() {
      try {
        const [trendingRes, recommendedRes] = await Promise.all([
          fetch(`../api/trending`),
          fetch(`../api/recommended`),
        ]);

        if (!trendingRes.ok || !recommendedRes.ok) {
          throw new Error("Failed to fetch movie data");
        }

        const trendingData = await trendingRes.json();
        const recommendedData = await recommendedRes.json();

        /* // ✅ Add these logs here
        console.log("Trending data:", trendingData);
        console.log("Recommended data:", recommendedData); */

        setTrending(trendingData.results || []);
        setRecommended(recommendedData.results || []);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 text-center text-gray-800">
        <p className="text-xl font-medium"></p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 text-center text-red-500">
        <p className="text-xl font-medium">Error: {error}</p>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      {/* Trending Movies */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Trending Movies</h2>
        <MovieCarousel
          movies={trending.map((movie) => ({
            ...movie,
            id: movie.id,
            title: movie.title,
            poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            year: movie.release_date?.split("-")[0],
            rating: movie.vote_average.toFixed(1),
            onToggleFavorite: handleToggleFavorite,
          }))}
        />
      </section>

      {/* Recommended Movies */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Recommended Movies</h2>
        <MovieCarousel
          movies={recommended.map((movie) => ({
            ...movie,
            id: movie.id,
            title: movie.title,
            poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            year: movie.release_date?.split("-")[0],
            rating: movie.vote_average.toFixed(1),
            onToggleFavorite: handleToggleFavorite,
          }))}
        />
      </section>
    </main>
  );
}
