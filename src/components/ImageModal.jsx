import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";

function ImageModal({ src, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return createPortal(
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClose}
    >
      <motion.div onClick={(e) => e.stopPropagation()}>
        <img src={src} className="max-h-[90vh] max-w-[90vw] object-contain" />
      </motion.div>
    </motion.div>,
    document.body,
  );
}

export default ImageModal;
