import React from "react";
import { GetServerSideProps } from "next";
import MovieCarousel from "@/components/common/moviecarousel";
import { Movie } from "@/interfaces";


export default function Home({
  trending,
  recommended,
}: {
  trending: Movie[];
  recommended: Movie[];
}) {
  const handleToggleFavorite = (id: number, isFav: boolean) => {
    console.log(`Movie ${id} is ${isFav ? "added" : "removed"} from favorites`);
  };

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

export const getServerSideProps: GetServerSideProps = async () => {
  const [trendingRes, recommendedRes] = await Promise.all([
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`
    ),
    fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`
    ),
  ]);

  const trendingData = await trendingRes.json();
  const recommendedData = await recommendedRes.json();

  return {
    props: {
      trending: trendingData.results || [],
      recommended: recommendedData.results || [],
    },
  };
}
