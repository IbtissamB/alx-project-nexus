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
