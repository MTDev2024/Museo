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

  if (loading) return <p className="p-8">Chargement...</p>;
  if (!artwork) return <p className="p-8">Oeuvre introuvable.</p>;

  const favorited = isFavorite(artwork.id);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <button onClick={() => navigate(-1)} className="mb-6 text-sm underline">
        ← Retour
      </button>

      <div className="flex gap-8">
        <img
          src={getImageUrl(artwork.image_id)}
          alt={artwork.title}
          className="w-full object-contain rounded"
        />

        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-bold">{artwork.title}</h1>
          <p className="text-gray-600">{artwork.artist_display}</p>
          <p className="text-sm">{artwork.date_display}</p>
          <p className="text-sm">{artwork.medium_display}</p>
          <p className="text-sm">{artwork.dimensions}</p>
          <p className="text-sm">{artwork.place_of_origin}</p>

          <button
            onClick={() => toggleFavorite(artwork)}
            className={`mt-4 px-4 py-2 rounded font-semibold w-fit ${
              favorited
                ? "bg-red-500 text-white"
                : "border border-gray-400 text-gray-700"
            }`}
          >
            {favorited ? "♥ Retirer des favoris" : "♡ Ajouter aux favoris"}
          </button>

          {artwork.description && (
            <p
              className="text-sm mt-4 text-gray-700"
              dangerouslySetInnerHTML={{ __html: artwork.description }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ArtworkDetail;
