import { useState } from "react";
import { useArtworks } from "../hooks/useArtworks";
import ArtworkCard from "../components/ArtworkCard";

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
  // const [query, setQuery] = useState("Van Gogh")

  // Artiste aléatoire choisi une seule fois au montage du composant
  const [query, setQuery] = useState(
    () => ARTISTS[Math.floor(Math.random() * ARTISTS.length)],
  );

  const { artworks, loading, error } = useArtworks(query);

  return (
    <div className="px-8 py-12 max-w-screen-xl mx-auto">
      {/* En-tête */}
      <div className="mb-10">
        <p
          className="text-xs tracking-[0.3em] uppercase mb-2"
          style={{ color: "var(--accent)" }}
        >
          Collection
        </p>
        <h1
          className="text-4xl font-light tracking-widest uppercase"
          style={{ color: "var(--text)" }}
        >
          {query}
        </h1>
      </div>

      {/* Barre de recherche */}
      <input
        type="text"
        placeholder="RECHERCHER UN ARTISTE..."
        className="w-full max-w-md text-xs tracking-widest uppercase bg-transparent outline-none pb-2 mb-12"
        style={{
          borderBottom: "1px solid var(--border)",
          color: "var(--text)",
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") setQuery(e.target.value);
        }}
      />

      {loading && (
        <p
          className="text-xs tracking-widest uppercase"
          style={{ color: "var(--text-muted)" }}
        >
          Chargement...
        </p>
      )}
      {error && (
        <p
          className="text-xs tracking-widest"
          style={{ color: "var(--accent)" }}
        >
          {error}
        </p>
      )}

      {/* Grille */}
      <div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px"
        style={{ backgroundColor: "var(--border)" }}
      >
        {artworks.map((artwork) => (
          <ArtworkCard key={artwork.id} artwork={artwork} />
        ))}
      </div>
    </div>
  );
}

export default Gallery;
