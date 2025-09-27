export function getWatchlist(): any[] {
    const stored = localStorage.getItem("watchlist");
    return stored ? JSON.parse(stored) : [];
  }
  
  export function isInWatchlist(id: number): boolean {
    return getWatchlist().some((movie) => movie.id === id);
  }
  
  export function toggleWatchlist(movie: any): boolean {
    const list = getWatchlist();
    const exists = list.some((m) => m.id === movie.id);
    const updated = exists
      ? list.filter((m) => m.id !== movie.id)
      : [...list, movie];
  
    localStorage.setItem("watchlist", JSON.stringify(updated));
    return !exists; // returns new state
}
  