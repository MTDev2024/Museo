import { NavLink } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";

function Navbar() {
  const { favorites } = useFavorites();

  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b">
      <NavLink to="/" className="text-xl font-bold tracking-widest">
        MUSEO
      </NavLink>

      <div className="flex gap-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "font-semibold underline"
              : "text-gray-500 hover:text-black"
          }
        >
          Galerie
        </NavLink>

        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            isActive
              ? "font-semibold underline"
              : "text-gray-500 hover:text-black"
          }
        >
          Favoris {favorites.length > 0 && `(${favorites.length})`}
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
