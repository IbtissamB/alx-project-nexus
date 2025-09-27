import { useEffect, useState } from "react";
import MovieCard from "@/components/common/moviecard";

export default function WatchlistPage() {
  const [watchlist, setWatchlist] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("watchlist");
    if (stored) {
      setWatchlist(JSON.parse(stored));
    }
  }, []);

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Your Watchlist</h1>

      {watchlist.length === 0 ? (
        <p className="text-gray-600">You haven’t added any movies yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {watchlist.map((movie) => (
            <MovieCard key={movie.id} {...movie} />
          ))}
        </div>
      )}
    </main>
  );
}
