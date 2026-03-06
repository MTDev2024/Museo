import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Gallery from "./pages/Gallery";
import ArtworkDetail from "./pages/ArtworkDetail";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import { useTheme } from "./hooks/useTheme";
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

function App() {
  const location = useLocation();

  const { dark, toggleTheme } = useTheme();

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--bg)",
        color: "var(--text)",
      }}
    >
      <Navbar toggleTheme={toggleTheme} dark={dark} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/artwork/:id" element={<ArtworkDetail />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
