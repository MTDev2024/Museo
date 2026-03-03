import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../services/chicagoApi";

function ArtworkCard({ artwork }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/artwork/${artwork.id}`)}
      className="cursor-pointer group overflow-hidden"
      style={{
        backgroundColor: "var(--bg-card)",
        border: "1px solid var(--border)",
      }}
    >
      <div className="overflow-hidden aspect-square">
        <img
          src={getImageUrl(artwork.image_id)}
          alt={artwork.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-4">
        <p
          className="text-xs tracking-widest uppercase truncate"
          style={{ color: "var(--text-muted)" }}
        >
          {artwork.artist_display?.split("\n")[0]}
        </p>
        <p
          className="text-sm font-light mt-1 truncate"
          style={{ color: "var(--text)" }}
        >
          {artwork.title}
        </p>
        {artwork.date_display && (
          <p className="text-xs mt-1" style={{ color: "var(--accent)" }}>
            {artwork.date_display}
          </p>
        )}
      </div>
    </div>
  );
}

export default ArtworkCard;
