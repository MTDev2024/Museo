import { useNavigate } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";
import ArtworkCard from "../components/ArtworkCard";

function Favorites() {
  const { favorites } = useFavorites();
  const navigate = useNavigate();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Mes favoris</h1>

      {favorites.length === 0 ? (
        <div className="text-center mt-20">
          <p className="text-gray-500 mb-4">Aucun favori pour l'instant.</p>
          <button onClick={() => navigate("/")} className="underline text-sm">
            Explorer la galerie
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {favorites.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
