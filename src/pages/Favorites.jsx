import { useNavigate } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";
import ArtworkCard from "../components/ArtworkCard";

function Favorites() {
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  return (
    <div className="px-8 py-12 max-w-7xl mx-auto">
      {/* En-tête */}
      <div className="mb-10">
        <p
          className="text-xs tracking-[0.3em] uppercase mb-2"
          style={{ color: "var(--accent)" }}
        >
          Ma collection
        </p>
        <h1
          className="text-4xl font-light tracking-widest uppercase"
          style={{ color: "var(--text)" }}
        >
          Favoris
        </h1>
      </div>

      {favorites.length === 0 ? (
        <div className="mt-24 flex flex-col items-center gap-6">
          <p
            className="text-xs tracking-widest uppercase"
            style={{ color: "var(--text-muted)" }}
          >
            Aucune oeuvre sauvegardée
          </p>
          <button
            onClick={() => navigate("/")}
            className="text-xs tracking-widest uppercase py-3 px-6 hover:opacity-70 transition-opacity"
            style={{
              border: "1px solid var(--border)",
              color: "var(--text-muted)",
            }}
          >
            Explorer la galerie
          </button>
        </div>
      ) : (
        <div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px"
          style={{ backgroundColor: "var(--border)" }}
        >
          {favorites.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
