import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { BsBookmark, BsBookmarkFill, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { FaStar, FaClock, FaCalendarAlt } from "react-icons/fa";
import { ImHeart } from "react-icons/im";
import { Movie, Credits, Review, RelatedMovie } from "@/interfaces";
import ReviewCard from "@/components/common/reviewcard";
import { isInWatchlist, toggleWatchlist } from "@/utils/watchlist";

export default function MovieDetails({ movie, credits, reviews, related }: { movie: Movie; credits: Credits; reviews: Review[]; related: RelatedMovie[] }) {
    const [inWatchlist, setInWatchlist] = useState(false);

    useEffect(() => {
        setInWatchlist(isInWatchlist(movie.id));
    }, [movie.id]);

    const handleWatchlistClick = () => {
        const newState = toggleWatchlist({
            id: movie.id,
            title: movie.title,
            poster: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
            year: movie.release_date?.split("-")[0],
            rating: movie.vote_average.toFixed(1),
        });
        setInWatchlist(newState);
    };

    return (
        <>
            <section className="relative w-full min-h-[60vh] text-white">
                {/* Background poster with gradient overlay */}
                <div className="absolute inset-0 -z-10">
                    <Image
                        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                        alt={movie.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
                </div>

                {/* Content */}
                <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-8 items-end">
                    {/* Poster */}
                    <div className="w-full md:w-64 lg:w-72 flex-shrink-0">
                        <Image
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title}
                            width={300}
                            height={450}
                            className="rounded-lg object-cover w-full h-auto"
                            priority
                        />
                    </div>

                    {/* Metadata */}
                    <div className="flex-1">
                        <h1 className="text-3xl md:text-4xl font-semibold mb-4">{movie.title}</h1>

                        <div className="inline-flex items-center gap-2 bg-gray-800 text-white px-3 py-1 rounded-md mb-4">
                            <FaStar className="text-yellow-400" />
                            <span className="text-sm">{movie.vote_average.toFixed(1)} / 10</span>
                        </div>

                        <div className="flex flex-wrap gap-4 mb-4">
                            <div className="flex items-center gap-2 text-sm text-white/90">
                                <FaClock />
                                <span>{movie.runtime} min</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-white/90">
                                <FaCalendarAlt />
                                <span>{movie.release_date?.split("-")[0]}</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-6">
                            {movie.genres?.map((genre) => (
                                <span
                                    key={genre.id}
                                    className="bg-gray-700 text-sm px-3 py-1 rounded-full"
                                >
                                    {genre.name}
                                </span>
                            ))}
                        </div>

                        <div className="flex items-center gap-4">
                            <a
                                href="/favourites"
                                className="flex items-center gap-2 text-white hover:text-red-500 transition"
                            >
                                <ImHeart />
                            </a>

                            <button
                                onClick={handleWatchlistClick}
                                className="flex items-center gap-2 bg-red-400 hover:bg-gray-700 text-white px-4 py-2 rounded-full transition"
                            >
                                {inWatchlist ? <BsBookmarkFill /> : <BsBookmark />}
                                <span className="text-sm">{inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}</span>
                            </button>

                        </div>
                    </div>
                </div>
            </section>

            {/* Overview */}
            <section className="max-w-7xl mx-auto px-4 py-10 text-gray-700">
                <h2 className="text-3xl font-bold mb-4">Overview</h2>
                <p className="text-gray-500/80 text-xl">{movie.overview}</p>
            </section>

            {/* Cast */}
            <section className="max-w-7xl mx-auto px-4 py-10 text-gray-700">
                <h2 className="text-3xl font-bold mb-6">Cast</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {credits.cast.slice(0, 10).map((person) => (
                        <div key={person.id} className="text-center">
                            <div className="w-24 h-24 mx-auto mb-2 rounded-full overflow-hidden border-2 border-gray-600">
                                <Image
                                    src={
                                        person.profile_path
                                            ? `https://image.tmdb.org/t/p/w185${person.profile_path}`
                                            : "/default-avatar.png"
                                    }
                                    alt={person.name}
                                    width={96}
                                    height={96}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <p className="text-md font-semibold">{person.name}</p>
                            <p className="text-sm text-gray-700/70">{person.character}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Reviews Carousel */}
            <section className="max-w-7xl mx-auto px-4 py-10 text-white relative">
                <h2 className="text-3xl text-gray-700 font-bold mb-6">Reviews</h2>

                <div className="relative">
                    <Swiper
                        modules={[Navigation]}
                        navigation={{
                            nextEl: ".custom-next",
                            prevEl: ".custom-prev",
                        }}
                        spaceBetween={16}
                        slidesPerView="auto"
                        className="pb-10"
                    >
                        {reviews.map((review) => (
                            <SwiperSlide
                                key={review.id}
                                className="!w-[250px] sm:!w-[350px] md:!w-[400px] bg-gray-800 rounded-3xl p-4"
                            >
                                <ReviewCard review={review} />
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Custom navigation buttons */}
                    <div className="custom-prev hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10">
                        <button className="w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition hover:scale-110">
                            <BsChevronLeft className="text-xl" />
                        </button>
                    </div>
                    <div className="custom-next hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10">
                        <button className="w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition hover:scale-110">
                            <BsChevronRight className="text-xl" />
                        </button>
                    </div>
                </div>
            </section>

            {/* Related Movies */}
            {related.length > 0 && (
                <section className="max-w-7xl mx-auto px-4 py-10 text-white relative">
                    <h2 className="text-3xl text-gray-700 font-bold mb-6">Related Movies</h2>

                    <div className="relative">
                        <Swiper
                            modules={[Navigation]}
                            navigation={{
                                nextEl: ".related-next",
                                prevEl: ".related-prev",
                            }}
                            spaceBetween={16}
                            slidesPerView="auto"
                            className="pb-10"
                        >
                            {related.map((movie) => (
                                <SwiperSlide
                                    key={movie.id}
                                    className="!w-[160px] sm:!w-[200px] md:!w-[240px]"
                                >
                                    <div className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                                        <div className="relative w-full h-60 sm:h-72 md:h-84 overflow-hidden">
                                            {/* Poster */}
                                            <a href={`/movies/${movie.id}`} className="block">
                                                <Image
                                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                                    alt={movie.title}
                                                    fill
                                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                                />

                                                {/* Blurred overlay with info */}
                                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/40 opacity-0 group-hover:opacity-100 backdrop-blur-md transition-opacity duration-300 z-10">
                                                    <h3 className="text-lg font-semibold text-white truncate mb-1">
                                                        {movie.title}
                                                    </h3>
                                                    <div className="flex items-center gap-2 justify-between">
                                                        <p className="text-sm text-white/90">
                                                            {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                                                        </p>
                                                        <div className="flex items-center gap-1">
                                                            <span className="text-yellow-400">★</span>
                                                            <span className="text-sm text-white">
                                                                {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                        {/* Navigation buttons */}
                        <div className="related-prev hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10">
                            <button className="w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition hover:scale-110">
                                <BsChevronLeft className="text-xl" />
                            </button>
                        </div>
                        <div className="related-next hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10">
                            <button className="w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition hover:scale-110">
                                <BsChevronRight className="text-xl" />
                            </button>
                        </div>
                    </div>
                </section>
            )}

        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.params!;
    const [movieRes, creditsRes, reviewsRes, similarRes] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`),
        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.TMDB_API_KEY}&language=en-US`),
        fetch(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`),
        fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.TMDB_API_KEY}&language=en-US&page=1`),
    ]);

    const movie = await movieRes.json();
    const credits = await creditsRes.json();
    const reviews = await reviewsRes.json();
    const related = await similarRes.json();

    return {
        props: {
            movie,
            credits,
            reviews: reviews.results || [],
            related: related.results || [],
        },
    };
};