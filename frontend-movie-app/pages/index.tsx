import React, { useEffect, useState } from "react";
import MovieCarousel from "@/components/common/moviecarousel";
import { Movie } from "@/interfaces";
import HeroSection from "@/components/herosection";

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

  return (
    <main className="max-w-7xl mx-auto px-8 sm:px-10 md:px-12 lg:px-16 py-8">
      <HeroSection />
      
      {/* Trending Movies */}
      <section className="my-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Trending Movies</h2>
        {loading ? (
          <div className="text-center py-10">
            <p className="text-xl font-medium text-gray-600">Loading trending movies...</p>
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-xl font-medium text-red-500">Error: {error}</p>
          </div>
        ) : (
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
        )}
      </section>

      {/* Recommended Movies */}
      <section>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Recommended Movies</h2>
        {loading ? (
          <div className="text-center py-10">
            <p className="text-xl font-medium text-gray-600">Loading recommended movies...</p>
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-xl font-medium text-red-500">Error: {error}</p>
          </div>
        ) : (
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
        )}
      </section>
    </main>
  );
}
