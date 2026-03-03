import { NavLink } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";

function Navbar({ toggleTheme, dark }) {
  const { favorites } = useFavorites();

  return (
    <nav
      style={{
        borderBottom: "1px solid var(--border)",
        backgroundColor: "var(--bg)",
      }}
      className="flex items-center justify-between px-8 py-5 sticky top-0 z-50"
    >
      <NavLink
        to="/"
        className="text-2xl font-light tracking-[0.3em]"
        style={{ color: "var(--text)" }}
      >
        MUSEO
      </NavLink>

      <div className="flex items-center gap-8">
        <NavLink
          to="/"
          className="text-xs tracking-widest uppercase"
          style={({ isActive }) => ({
            color: isActive ? "var(--accent)" : "var(--text-muted)",
          })}
        >
          Galerie
        </NavLink>

        <NavLink
          to="/favorites"
          className="text-xs tracking-widest uppercase"
          style={({ isActive }) => ({
            color: isActive ? "var(--accent)" : "var(--text-muted)",
          })}
        >
          Favoris {favorites.length > 0 && `(${favorites.length})`}
        </NavLink>

        <button
          onClick={toggleTheme}
          className="text-xs tracking-widest uppercase"
          style={{ color: "var(--text-muted)" }}
        >
          {dark ? "◑ Clair" : "◐ Sombre"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
