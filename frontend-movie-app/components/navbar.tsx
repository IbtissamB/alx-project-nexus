import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BiSearch } from "react-icons/bi";
import { ImHeart } from "react-icons/im"; 


export default function Navbar() {
	return (
		<nav className="w-full bg-gray-800 text-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					{/* Left: Logo + Title */}
					<div className="flex items-center gap-3">
						<Link href="/" className="flex items-center gap-3">
							<Image
								src="/assets/logo.png"
								alt="Movie Club logo"
								width={36}
								height={36}
								className="object-contain"
							/>
							<span className="font-poppins font-semibold text-lg sm:text-lg">
								Movie Club
							</span>
						</Link>
					</div>

					{/* Middle: Search */}
					<div className="flex-1 px-4">
						<form className="max-w-md mx-auto">
							<label htmlFor="search" className="sr-only">
								Search movies
							</label>
							<div className="relative">
								<input
									id="search"
									name="search"
									type="search"
									placeholder="Search movies"
									className="w-full bg-white text-black rounded-full pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-brand-accent"
								/>
								<div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
									{/* Search icon */}
									<BiSearch/>
								</div>
							</div>
						</form>
					</div>

					{/* Right: Favorites + Sign in */}
					<div className="flex items-center gap-4">
						<Link href="/favourites" className="inline-flex items-center">
							<div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition">
								{/* Heart icon */}
								<ImHeart />
							</div>
						</Link>

						<button className="bg-red-700 text-white px-4 py-2 rounded-full font-medium hover:brightness-95 transition">
							Sign in
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
}
