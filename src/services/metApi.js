const BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1";

// Recherche d'oeuvres par terme (artiste, titre, etc.)
export async function searchArtworks(query, filters = {}) {
  const params = new URLSearchParams({
    q: query,
    hasImages: true,
    isPublicDomain: true,
    ...filters,
  });

  const res = await fetch(`${BASE_URL}/search?${params}`);
  const data = await res.json();
  return data.objectIDs ?? [];
}

// Récupère les détails d'une oeuvre par son ID
export async function getArtwork(id) {
  const res = await fetch(`${BASE_URL}/objects/${id}`);
  return res.json();
}

// Récupère les détails de plusieurs oeuvres (avec limite)
export async function getArtworks(ids, limit = 20) {
  const slice = ids.slice(0, limit);
  const promises = slice.map((id) => getArtwork(id));
  return Promise.all(promises);
}

// Ce que chaque fonction fait :

// searchArtworks("Van Gogh") → retourne une liste d'IDs
// getArtwork(436535) → retourne tous les détails d'une oeuvre
// getArtworks([...ids]) → récupère plusieurs oeuvres en parallèle (Promise.all)
