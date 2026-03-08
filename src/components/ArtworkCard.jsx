import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../services/chicagoApi";
import { useRef } from "react";
import { motion } from "framer-motion";

function ArtworkCard({ artwork, index }) {
  const navigate = useNavigate();
  const cardRef = useRef();

  function handleMouseMove(e) {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (y - 0.5) * -16;
    const rotateY = (x - 0.5) * 16;

    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;

    // Position du curseur en % pour le gradient
    card.style.setProperty("--mouse-x", `${x * 100}%`);
    card.style.setProperty("--mouse-y", `${y * 100}%`);
    card.style.setProperty("--shimmer-opacity", "1");
  }

  function handleMouseLeave() {
    const card = cardRef.current;
    card.style.transform =
      "perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)";
    card.style.setProperty("--shimmer-opacity", "0");
  }

  return (
    // motion.div gère l'animation d'entrée (stagger)
    // initial = état de départ, animate = état final
    // delay = index * 0.05 → chaque carte attend 50ms de plus que la précédente
    // Math.min(..., 0.5) → plafond à 500ms pour ne pas attendre indéfiniment
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: Math.min(index * 0.05, 0.2),
        ease: "easeOut",
      }}
    >
      {/* div intérieur séparé pour le tilt 3D via cardRef
          → on ne mélange pas les transforms de Framer Motion avec ceux du tilt */}
      <div
        ref={cardRef}
        onClick={() => navigate(`/artwork/${artwork.id}`)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="overflow-hidden"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter") navigate(`/artwork/${artwork.id}`);
        }}
        style={{
          position: "relative",
          backgroundColor: "var(--bg-card)",
          border: "1px solid var(--border)",
          transition: "transform 0.15s ease",
          willChange: "transform",
          "--mouse-x": "50%",
          "--mouse-y": "50%",
          "--shimmer-opacity": "0",
        }}
      >
        {/* Overlay doré qui suit la souris */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(201,168,76,0.18) 0%, transparent 55%)",
            opacity: "var(--shimmer-opacity)",
            transition: "opacity 0.3s ease",
            pointerEvents: "none",
            zIndex: 2,
          }}
        />

        {/* Liseré doré sur les bords */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(201,168,76,0.6) 0%, transparent 40%)",
            opacity: "var(--shimmer-opacity)",
            transition: "opacity 0.3s ease",
            pointerEvents: "none",
            zIndex: 2,
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: "1px",
          }}
        />

        <div
          className="overflow-hidden aspect-square"
          style={{ position: "relative", zIndex: 1 }}
        >
          <img
            src={getImageUrl(artwork.image_id)}
            alt={artwork.title}
            className="w-full h-full object-cover transition-transform duration-500"
          />
        </div>

        <div className="p-4" style={{ position: "relative", zIndex: 1 }}>
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
    </motion.div>
  );
}

export default ArtworkCard;
