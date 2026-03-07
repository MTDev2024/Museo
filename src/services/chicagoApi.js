const BASE_URL = "https://api.artic.edu/api/v1";

export function getImageUrl(imageId, size = "843,") {
  return `https://www.artic.edu/iiif/2/${imageId}/full/${size}/0/default.jpg`;
}

export async function searchArtworks(query, limit = 12, page = 1) {
  const params = new URLSearchParams({
    q: query,
    fields: "id,title,artist_display,image_id,date_display",
    limit,
    page,
  });
  const res = await fetch(`${BASE_URL}/artworks/search?${params}`);
  const data = await res.json();
  const artworks = (data.data ?? []).filter(
    (a) =>
      a.id &&
      a.image_id &&
      a.artist_display?.toLowerCase().includes(query.toLowerCase()),
  );

  const hasMore = page < (data.pagination?.total_pages ?? 1);
  return { artworks, hasMore };
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
