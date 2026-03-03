import { useEffect, useState } from "react";

export function useTheme() {
  const [dark, setDark] = useState(() => {
    return localStorage.getItem("museo_theme") === "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("museo_theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("museo_theme", "light");
    }
  }, [dark]);

  return { dark, toggleTheme: () => setDark((d) => !d) };
}
