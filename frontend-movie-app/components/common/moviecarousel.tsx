// components/MovieCarousel.tsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import MovieCard from "./moviecard";

export default function MovieCarousel({ movies }: { movies: any[] }) {
  return (
    <div className="px-2 md:px-4 lg:px-6">
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        slidesPerView="auto"   // 👈 auto mode
        spaceBetween={8}       // 👈 minimal spacing (tweak as needed)
      >
        {movies.map((movie) => (
          <SwiperSlide
            key={movie.id}
            className="!w-40 sm:!w-48 md:!w-56 lg:!w-58" // 👈 fixed card width per breakpoint
          >
            <MovieCard {...movie} />
          </SwiperSlide>
        ))}

        {/* Custom navigation buttons */}
        <div className="custom-prev absolute left-2 top-1/2 -translate-y-1/2 z-10 cursor-pointer text-gray-300 hover:text-red-700 transition text-4xl">
          ‹
        </div>
        <div className="custom-next absolute right-2 top-1/2 -translate-y-1/2 z-10 cursor-pointer text-gray-300 hover:text-red-700 transition text-4xl">
          ›
        </div>
      </Swiper>
    </div>
  );
}
