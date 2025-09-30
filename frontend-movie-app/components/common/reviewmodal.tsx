//components/common/reviewmodal.tsx
import Image from "next/image";
import { FaStar, FaTimes } from "react-icons/fa";
import { Review } from "@/interfaces";
import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

interface ReviewModalProps {
  review: Review;
  isOpen: boolean;
  onClose: () => void;
}

export default function ReviewModal({ review, isOpen, onClose }: ReviewModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Prevent body scroll when modal is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  // Handle avatar fallback
  const profile = review.author_details?.avatar_path;
  const avatarSrc = profile
    ? profile.startsWith("/https")
      ? profile.slice(1)
      : `https://image.tmdb.org/t/p/w185${profile}`
    : "/assets/default-avatar.jpeg";

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden transform transition-all duration-300 ease-out scale-100 opacity-100 border border-gray-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src={avatarSrc}
              alt={review.author}
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
            <div>
              <h3 className="text-lg font-semibold text-white">{review.author}</h3>
              <p className="text-sm text-white/70">
                {new Date(review.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {review.author_details?.rating && (
              <div className="inline-flex items-center gap-1 bg-gray-700 px-3 py-1 rounded-full">
                <FaStar className="text-yellow-400 text-sm" />
                <span className="text-sm text-white font-medium">
                  {review.author_details.rating}/10
                </span>
              </div>
            )}
            
            <button
              onClick={onClose}
              className="text-white/70 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors"
            >
              <FaTimes className="text-lg" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed text-base whitespace-pre-wrap">
              {review.content}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
