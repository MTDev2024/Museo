import { useState, useEffect, useRef } from "react";
import { searchArtists } from "../services/chicagoApi";

export default function ArtistSearch({ onSelect }) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const timerRef = useRef(null);

  useEffect(() => {
    if (input.length < 2) return;

    let stale = false;

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(async () => {
      const results = await searchArtists(input);
      if (!stale) setSuggestions(results);
    }, 300);

    return () => {
      clearTimeout(timerRef.current);
      stale = true;
    };
  }, [input]);

  function handleSelect(name) {
    setInput(name);
    setSuggestions([]);
    onSelect(name);
  }

  return (
    <div className="relative w-full max-w-md">
      <input
        type="text"
        value={input}
        onChange={(e) => {
          const value = e.target.value;
          setInput(value);
          if (value.length < 2) setSuggestions([]);
        }}
        placeholder="Rechercher un artiste..."
        className="w-full px-4 py-2 bg-(--bg-card) border border-(--border) text-(--text) rounded"
      />
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full mt-1 bg-(--bg-card) border border-(--border) rounded">
          {suggestions.map((name) => (
            <li
              key={name}
              onClick={() => handleSelect(name)}
              className="px-4 py-2 cursor-pointer hover:bg-(--accent) hover:text-(--bg) transition-colors"
            >
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
