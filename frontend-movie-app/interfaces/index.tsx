import { ReactNode } from "react";

export type LayoutProps = {
  children: ReactNode;
}

export type MovieCardProps = {
  id: string | number;
  title: string;
  poster: string;
  year: string | number;
  rating: string | number;
  onToggleFavorite?: (id: string | number, isFav: boolean) => void;
};

export interface Movie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  runtime: number;
  release_date: string;
  genres: Array<{
    id: number;
    name: string;
  }>;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface Credits {
  cast: CastMember[];
}

export interface Review {
  id: string;
  author: string;
  content: string;
  created_at: string;
  author_details?: {
    rating: number;
  };
}

