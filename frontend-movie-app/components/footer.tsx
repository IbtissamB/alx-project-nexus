import Link from "next/link";
import { BsFacebook, BsTwitter, BsInstagram } from "react-icons/bs";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Branding */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-bold">Movie Club</h2>
          <p className="text-sm text-gray-400">Your gateway to cinematic discovery</p>
        </div>

        {/* Navigation */}
        <div className="flex gap-6 text-sm">
          <Link href="/" className="hover:text-red-400 transition">Home</Link>
          <Link href="/watchlist" className="hover:text-red-400 transition">Watchlist</Link>
          <Link href="/about" className="hover:text-red-400 transition">About</Link>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition">
            <BsFacebook />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition">
            <BsTwitter />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition">
            <BsInstagram />
          </a>
        </div>
      </div>

      {/* Attribution */}
      <div className="mt-6 text-center text-xs text-gray-500">
        Powered by <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer" className="underline hover:text-red-400">TMDB</a>. This product uses the TMDB API but is not endorsed or certified by TMDB.
      </div>
    </footer>
  );
}
