import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getArtwork, getImageUrl } from "../services/chicagoApi";
import { useFavorites } from "../hooks/useFavorites";

function ArtworkDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    getArtwork(id)
      .then((data) => setArtwork(data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <p
        className="p-12 text-xs tracking-widest uppercase"
        style={{ color: "var(--text-muted)" }}
      >
        Chargement...
      </p>
    );
  if (!artwork)
    return (
      <p
        className="p-12 text-xs tracking-widest uppercase"
        style={{ color: "var(--text-muted)" }}
      >
        Oeuvre introuvable.
      </p>
    );

  const favorited = isFavorite(artwork.id);

  return (
    <div className="px-8 py-12 max-w-screen-xl mx-auto">
      {/* Retour */}
      <button
        onClick={() => navigate(-1)}
        className="text-xs tracking-widest uppercase mb-12 hover:opacity-60 transition-opacity"
        style={{ color: "var(--text-muted)" }}
      >
        ← Retour
      </button>

      <div className="flex flex-col lg:flex-row gap-16">
        {/* Image */}
        <div className="lg:w-1/2">
          <img
            src={getImageUrl(artwork.image_id)}
            alt={artwork.title}
            className="w-full object-contain"
          />
        </div>

        {/* Métadonnées */}
        <div className="lg:w-1/2 flex flex-col gap-6">
          <div>
            <p
              className="text-xs tracking-[0.3em] uppercase mb-3"
              style={{ color: "var(--accent)" }}
            >
              {artwork.artist_display?.split("\n")[0]}
            </p>
            <h1
              className="text-3xl font-light tracking-wide"
              style={{ color: "var(--text)" }}
            >
              {artwork.title}
            </h1>
          </div>

          <div
            className="flex flex-col gap-2"
            style={{
              borderTop: "1px solid var(--border)",
              paddingTop: "1.5rem",
            }}
          >
            {artwork.date_display && (
              <div className="flex gap-4">
                <span
                  className="text-xs tracking-widest uppercase w-24"
                  style={{ color: "var(--text-muted)" }}
                >
                  Date
                </span>
                <span className="text-xs" style={{ color: "var(--text)" }}>
                  {artwork.date_display}
                </span>
              </div>
            )}
            {artwork.medium_display && (
              <div className="flex gap-4">
                <span
                  className="text-xs tracking-widest uppercase w-24"
                  style={{ color: "var(--text-muted)" }}
                >
                  Technique
                </span>
                <span className="text-xs" style={{ color: "var(--text)" }}>
                  {artwork.medium_display}
                </span>
              </div>
            )}
            {artwork.dimensions && (
              <div className="flex gap-4">
                <span
                  className="text-xs tracking-widest uppercase w-24"
                  style={{ color: "var(--text-muted)" }}
                >
                  Dimensions
                </span>
                <span className="text-xs" style={{ color: "var(--text)" }}>
                  {artwork.dimensions}
                </span>
              </div>
            )}
            {artwork.place_of_origin && (
              <div className="flex gap-4">
                <span
                  className="text-xs tracking-widest uppercase w-24"
                  style={{ color: "var(--text-muted)" }}
                >
                  Origine
                </span>
                <span className="text-xs" style={{ color: "var(--text)" }}>
                  {artwork.place_of_origin}
                </span>
              </div>
            )}
          </div>

          {/* Bouton favori */}
          <button
            onClick={() => toggleFavorite(artwork)}
            className="text-xs tracking-widest uppercase py-3 px-6 w-fit transition-opacity hover:opacity-70"
            style={{
              border: "1px solid var(--border)",
              color: favorited ? "var(--accent)" : "var(--text-muted)",
            }}
          >
            {favorited ? "♥ Retirer des favoris" : "♡ Ajouter aux favoris"}
          </button>

          {artwork.description && (
            <p
              className="text-xs leading-relaxed mt-4"
              style={{ color: "var(--text-muted)" }}
              dangerouslySetInnerHTML={{ __html: artwork.description }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ArtworkDetail;
