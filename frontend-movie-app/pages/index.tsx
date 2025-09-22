// pages/index.js
import React from "react";
import MovieCard from "../components/common/moviecard";
import MovieCarousel from "@/components/common/moviecarousel";


export default function Home({ movies }: { movies: any[] }) {
  const handleToggleFavorite = (id: number, isFav: boolean) => {
    console.log(`Movie ${id} is ${isFav ? "added" : "removed"} from favorites`);
  };

  return (
    <MovieCarousel
      movies={movies.map((movie) => ({
        ...movie,
        id: movie.id,
        title: movie.title,
        poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        year: movie.release_date?.split("-")[0],
        rating: movie.vote_average.toFixed(1),
        onToggleFavorite: handleToggleFavorite,
      }))}
    />
  );
}

export async function getServerSideProps() {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`
  );
  const data = await res.json();

  return {
    props: {
      movies: data.results || [],
    },
  };
}
