import { useNavigate } from "react-router-dom";
import PageTransition from "../components/PageTransition";
import { motion } from "framer-motion";
import ParticlesBackground from "../components/ParticlesBackground";

function Home() {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div style={{ position: "relative", height: "100vh" }}>
        <ParticlesBackground />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.5rem",
          }}
        >
          <motion.p
            className="text-xs tracking-[0.4em] uppercase"
            style={{ color: "var(--accent)" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            COLLECTION
          </motion.p>

          <motion.h1
            className="text-5xl md:text-8xl font-thin tracking-[0.2em] uppercase"
            style={{ color: "var(--text)" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            MUSEO
          </motion.h1>

          <motion.div
            style={{
              width: "4rem",
              height: "1px",
              backgroundColor: "var(--accent)",
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          />

          <motion.p
            className="text-xs tracking-widest uppercase"
            style={{ color: "var(--text-muted)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          >
            Chicago
          </motion.p>

          <motion.button
            className="text-xs tracking-[0.2em] uppercase px-8 py-3 bg-transparent cursor-pointer"
            style={{
              border: "1px solid var(--accent)",
              color: "var(--accent)",
            }}
            onClick={() => navigate("/gallery")}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" }}
            whileHover={{
              backgroundColor: "var(--accent)",
              color: "var(--bg)",
            }}
          >
            VOIR LA COLLECTION
          </motion.button>
        </div>
      </div>
    </PageTransition>
  );
}

export default Home;
