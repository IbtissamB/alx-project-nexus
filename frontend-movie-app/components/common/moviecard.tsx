import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";
import { MovieCardProps } from "@/interfaces";
import { isInWatchlist, toggleWatchlist } from "@/utils/watchlist";


export default function MovieCard({
  id,
  title,
  poster,
  year,
  rating,
}: MovieCardProps) {
  const [inWatchlist, setInWatchlist] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("watchlist");
    if (stored) {
      const list = JSON.parse(stored);
      setInWatchlist(list.some((movie: any) => movie.id === id));
    }
  }, [id]);

  const handleToggleWatchlist = () => {
    const stored = localStorage.getItem("watchlist");
    const list = stored ? JSON.parse(stored) : [];

    let updated;
    if (inWatchlist) {
      updated = list.filter((movie: any) => movie.id !== id);
    } else {
      updated = [...list, { id, title, poster, year, rating }];
    }

    localStorage.setItem("watchlist", JSON.stringify(updated));
    setInWatchlist(!inWatchlist);
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
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/40 opacity-0 group-hover:opacity-100 backdrop-blur-md transition-opacity duration-300 z-10">
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

        {/* Watchlist button */}
        <button
          onClick={handleToggleWatchlist}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/50 flex items-center justify-center hover:bg-black/70 transition text-white z-20"
        >
          {inWatchlist ? <BsBookmarkFill className="text-red-400" /> : <BsBookmark />}
        </button>
      </div>
    </div>
  );
}
