import { useState } from "react";
import ParticlesBackground from "../components/ParticlesBackground";
import { useArtworks } from "../hooks/useArtworks";
import ArtworkCard from "../components/ArtworkCard";
import PageTransition from "../components/PageTransition";

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

  const { artworks, loading, error, hasMore, loadMore } = useArtworks(query);

  return (
    <PageTransition>
      <div style={{ position: "relative" }}>
        <ParticlesBackground />
        <div
          className="px-8 py-12 max-w-7xl mx-auto"
          style={{ position: "relative", zIndex: 1 }}
        >
          <div>
            {/* En-tête */}
            <div className="mb-10">
              <p
                className="text-xs tracking-[0.3em] uppercase mb-2"
                style={{ color: "var(--accent)" }}
              >
                Collection
              </p>
              <h1
                className="font-display text-4xl font-light tracking-widest uppercase"
                style={{ color: "var(--text)" }}
              >
                {query}
              </h1>
            </div>

            {/* Barre de recherche */}
            <input
              type="text"
              placeholder="RECHERCHER UN ARTISTE..."
              aria-label="Rechercher un artiste"
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
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px cursor-brush"
              style={{ backgroundColor: "var(--border)" }}
            >
              {artworks.map((artwork, index) => (
                <ArtworkCard key={artwork.id} artwork={artwork} index={index} />
              ))}
            </div>
            {hasMore && (
              <button
                className="text-xs tracking-widest uppercase mt-4 py-3 px-6 transition-colors text-(--accent) hover:bg-(--accent) hover:text-(--bg)"
                style={{ border: "1px solid var(--accent)" }}
                onClick={loadMore}
              >
                AFFICHER PLUS
              </button>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default Gallery;
