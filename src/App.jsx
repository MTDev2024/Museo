import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Gallery from "./pages/Gallery";
import ArtworkDetail from "./pages/ArtworkDetail";
import Favorites from "./pages/Favorites";
import { useTheme } from "./hooks/useTheme";

function App() {
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
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/artwork/:id" element={<ArtworkDetail />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
}

export default App;
