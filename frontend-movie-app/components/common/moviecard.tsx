// components/MovieCard.tsx
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BsHeart } from "react-icons/bs";
import { MovieCardProps } from "@/interfaces";

export default function MovieCard({
  id,
  title,
  poster,
  year,
  rating,
  onToggleFavorite,
}: MovieCardProps) {
  const [isFav, setIsFav] = useState(false);

  const handleFavorite = () => {
    setIsFav((prev) => {
      const newFav = !prev;
      if (onToggleFavorite) {
        onToggleFavorite(id, newFav);
      }
      return newFav;
    });
  };

  return (
    <div className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <div className="relative w-40 h-60 sm:w-48 sm:h-72 md:w-60 md:h-84 overflow-hidden">
        {/* Poster */}
        <Link href={`/movies/${id}`}>
          <Image
            src={poster}
            alt={`${title} poster`}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Blurred overlay with info */}
          <div className="absolute bottom-0 left-0 right-0 p-4 hover:backdrop-blur-md">
            <h3 className="text-lg font-semibold text-white truncate mb-1">
              {title}
            </h3>
            <div className="flex items-center gap-2 justify-between">
              <p className="text-sm text-white/90">{year}</p>
              <div className="flex items-center gap-1">
                <span className="text-yellow-400">★</span>
                <span className="text-sm text-white">{rating}</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Favorite button — now inside the poster container */}
        <button
          onClick={handleFavorite}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition text-white"
        >
          <BsHeart className={isFav ? "fill-red-500" : ""} />
        </button>
      </div>
    </div>
  );
}
