import { useState } from "react";
import { useArtworks } from "../hooks/useArtworks";
import ArtworkCard from "../components/ArtworkCard";

// Liste des artistes affichés aléatoirement au chargement
const ARTISTS = [
  "Van Gogh",
  "Monet",
  "Rembrandt",
  "Seurat",
  "Picasso",
  "Cézanne",
  "Caravaggio",
  "Renoir",
];

function Gallery() {
  // Valeur par défaut fixe (désactivée)
  // const [query, setQuery] = useState("Van Gogh");

  // Artiste aléatoire choisi une seule fois au montage du composant
  const [query, setQuery] = useState(
    () => ARTISTS[Math.floor(Math.random() * ARTISTS.length)],
  );

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
          <ArtworkCard key={artwork.id} artwork={artwork} />
        ))}
      </div>
    </div>
  );
}

export default Gallery;
