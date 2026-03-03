import { useState, useEffect } from "react";

const STORAGE_KEY = "museo_favorites";

export function useFavorites() {
  // Initialise depuis le localStorage au montage
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  // Synchronise le localStorage à chaque changement des favoris
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  // Vérifie si une oeuvre est déjà en favori
  function isFavorite(id) {
    return favorites.some((a) => a.id === id);
  }

  // Ajoute ou retire selon l'état actuel
  function toggleFavorite(artwork) {
    if (isFavorite(artwork.id)) {
      setFavorites((prev) => prev.filter((a) => a.id !== artwork.id));
    } else {
      setFavorites((prev) => [...prev, artwork]);
    }
  }

  return { favorites, toggleFavorite, isFavorite };
}
