import { useState } from "react";
import ParticlesBackground from "../components/ParticlesBackground";
import { useArtworks } from "../hooks/useArtworks";
import ArtworkCard from "../components/ArtworkCard";
import ArtistSearch from "../components/ArtistSearch";
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
  "Delacroix",
  "Manet",
];

function Gallery() {
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
            <ArtistSearch onSelect={(name) => setQuery(name)} />

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
