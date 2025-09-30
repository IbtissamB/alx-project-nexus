import Image from "next/image";
import { useEffect, useState } from "react";
import { BsStarFill, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import Link from "next/link";
import { Movie } from "@/interfaces";

export default function HeroSection() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    async function fetchLatest() {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&page=1`
        );
        if (!res.ok) throw new Error(`API call failed: ${res.status}`);
        const data = await res.json();

        // Fetch full movie details for each item to get genres
        const detailedMovies = await Promise.all(
          data.results.map(async (movie: Movie) => {
            const detailRes = await fetch(
              `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US`
            );
            return await detailRes.json();
          })
        );

        setMovies(detailedMovies);
      } catch (error) {
        console.error("Error fetching now playing movies:", error);
      }
    }
    fetchLatest();
  }, []);

  const movie = movies[index];
  if (!movie) return null;

  const backdrop = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
  const year = movie.release_date?.split("-")[0];
  const rating = movie.vote_average?.toFixed(1);
  const overview = movie.overview;
  const quality = "HD";

  const handlePrev = () => setIndex((prev) => (prev === 0 ? movies.length - 1 : prev - 1));
  const handleNext = () => setIndex((prev) => (prev === movies.length - 1 ? 0 : prev + 1));

  return (
    <section className="relative h-[600px] text-white">
      {/* Backdrop */}
      <div className="absolute inset-0 rounded-4xl overflow-hidden">
        <Image
          src={backdrop}
          alt={movie.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-16 h-full flex items-center justify-center rounded-4xl overflow-hidden">
        <div className="max-w-2xl space-y-6">
          {/* Year + Quality */}
          <div className="flex gap-4">
            <span className="px-3 py-1 bg-red-500 text-white rounded-full text-sm font-medium">{quality}</span>
            <span className="px-3 py-1 bg-gray-800 rounded-full text-sm font-medium">{year}</span>
            <div className="flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-full w-fit">
              <BsStarFill className="text-red-500" />
              <span className="text-sm">{rating}</span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold">{movie.title}</h1>

          {/* Genres */}
          <div className="flex flex-wrap items-center gap-3">
          {movie.genres?.map((genre) => (
              <span
                key={genre.id}
                className="px-3 py-1 bg-gray-700 rounded-full text-sm font-medium"
              >
                {genre.name}
              </span>
            ))}
          </div>

          {/* Overview */}
          <p className="text-white text-md leading-relaxed">{overview}</p>

          {/* View More Button */}
          <Link href={`/movies/${movie.id}`}>
            <button className="mt-2 px-5 py-2 bg-white text-gray-900 font-medium rounded-full hover:bg-red-500 hover:text-white transition">
              View More
            </button>
          </Link>

          {/* Arrows */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition"
            >
              <BsChevronLeft />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition"
            >
              <BsChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
