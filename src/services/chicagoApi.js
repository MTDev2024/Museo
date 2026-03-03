const BASE_URL = "https://api.artic.edu/api/v1";

export function getImageUrl(imageId) {
  return `https://www.artic.edu/iiif/2/${imageId}/full/843,/0/default.jpg`;
}

export async function searchArtworks(query, limit = 50) {
  const params = new URLSearchParams({
    q: query,
    fields: "id,title,artist_display,image_id,date_display",
    limit,
  });
  const res = await fetch(`${BASE_URL}/artworks/search?${params}`);
  const data = await res.json();
  return (data.data ?? []).filter((artwork) => artwork.id && artwork.image_id);
}

export async function getArtwork(id) {
  const params = new URLSearchParams({
    fields:
      "id,title,artist_display,image_id,description,date_display,medium_display,dimensions,place_of_origin",
  });
  const res = await fetch(`${BASE_URL}/artworks/${id}?${params}`);
  const data = await res.json();
  return data.data;
}
