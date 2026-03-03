import { useState } from "react";
import { useArtworks } from "../hooks/useArtworks";
import { getImageUrl } from "../services/chicagoApi";

function Gallery() {
  const [query, setQuery] = useState("Van Gogh");
  const { artworks, loading, error } = useArtworks(query);

  return (
    <div className="p-8">
      <input
        type="text"
        placeholder="Rechercher un artiste..."
        className="border p-2 rounded w-full max-w-md"
        onKeyDown={(e) => {
          if (e.key === "Enter") setQuery(e.target.value);
        }}
      />

      {loading && <p className="mt-4">Chargement...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      <div className="grid grid-cols-4 gap-4 mt-8">
        {artworks.map((artwork) => (
          <div key={artwork.id} className="border rounded overflow-hidden">
            <img
              src={getImageUrl(artwork.image_id)}
              alt={artwork.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-2">
              <p className="font-bold text-sm">{artwork.title}</p>
              <p className="text-xs text-gray-500">{artwork.artist_display}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
