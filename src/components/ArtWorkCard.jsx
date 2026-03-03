import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../services/chicagoApi";

function ArtworkCard({ artwork }) {
  const navigate = useNavigate();

  return (
    <div
      className="border rounded overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => navigate(`/artwork/${artwork.id}`)}
    >
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
  );
}

export default ArtworkCard;
