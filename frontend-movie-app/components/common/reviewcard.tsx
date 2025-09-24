import Image from "next/image";
import { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function ReviewCard({ review }: { review: any }) {
  const [expanded, setExpanded] = useState(false);

  // Handle avatar fallback
  const profile = review.author_details?.avatar_path;
  const avatarSrc = profile
    ? profile.startsWith("/https")
      ? profile.slice(1)
      : `https://image.tmdb.org/t/p/w185${profile}`
    : "/assets/default-avatar.jpeg";

  return (
    <div className="bg-gray-800 rounded-3xl p-4 min-h-[200px] flex flex-col justify-start text-white">
      {/* Date top-right */}
      <div className="flex justify-end text-xs text-white/70 mb-2">
        {new Date(review.created_at).toLocaleDateString()}
      </div>

      {/* Profile + Name + Rating */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Image
            src={avatarSrc}
            alt={review.author}
            width={32}
            height={32}
            className="rounded-full object-cover"
          />
          <p className="text-md font-semibold">{review.author}</p>
        </div>

        {review.author_details?.rating && (
          <div className="inline-flex items-center gap-1 bg-gray-700 px-2 py-1 rounded">
            <FaStar className="text-red-400" />
            <span className="text-sm">{review.author_details.rating}</span>
          </div>
        )}
      </div>

      {/* Review Content */}
      <div className="text-md text-white/90 leading-normal">
        <p className={`${expanded ? "" : "line-clamp-3"} transition-all duration-300`}>
          {review.content}
        </p>

        {review.content.length > 300 && (
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="mt-2 text-xs text-red-400 hover:underline"
          >
            {expanded ? "Read less" : "Read more"}
          </button>
        )}
      </div>
    </div>
  );
}
