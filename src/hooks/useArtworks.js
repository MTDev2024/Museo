import { useReducer, useEffect } from "react";
import { searchArtworks } from "../services/chicagoApi";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return { artworks: [], loading: true, error: null };
    case "FETCH_SUCCESS":
      return { artworks: action.payload, loading: false, error: null };
    case "FETCH_ERROR":
      return { artworks: [], loading: false, error: action.payload };
    default:
      return state;
  }
}

export function useArtworks(query) {
  const [state, dispatch] = useReducer(reducer, {
    artworks: [],
    loading: false,
    error: null,
  });

  useEffect(() => {
    if (!query) return;

    dispatch({ type: "FETCH_START" });

    searchArtworks(query)
      .then((data) => dispatch({ type: "FETCH_SUCCESS", payload: data }))
      .catch((err) => dispatch({ type: "FETCH_ERROR", payload: err.message }));
  }, [query]);

  return state;
}
