// components/MovieCarousel.tsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
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
        slidesPerView="auto"   //  auto mode
        spaceBetween={8}       //  minimal spacing (tweak as needed)
      >
        {movies.map((movie) => (
          <SwiperSlide
            key={movie.id}
            className="!w-40 sm:!w-48 md:!w-56 lg:!w-58" //  fixed card width per breakpoint
          >
            <MovieCard {...movie} />
          </SwiperSlide>
        ))}

        {/* Custom navigation buttons */}
        <div className="custom-prev hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10">
          <button className="w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition hover:scale-110">
            <BsChevronLeft className="text-xl" />
          </button>
        </div>

        <div className="custom-next hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10">
          <button className="w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition hover:scale-110">
            <BsChevronRight className="text-xl" />
          </button>
        </div>
      </Swiper>
    </div>
  );
}
