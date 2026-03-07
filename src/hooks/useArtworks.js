import { useReducer, useEffect } from "react";
import { searchArtworks } from "../services/chicagoApi";

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return {
        artworks: [],
        loading: true,
        error: null,
        page: 1,
        hasMore: false,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        artworks: action.payload,
        loading: false,
        hasMore: action.hasMore,
      };
    case "FETCH_MORE_SUCCESS":
      return {
        ...state,
        artworks: [...state.artworks, ...action.payload],
        loading: false,
        page: state.page + 1,
        hasMore: action.hasMore,
      };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export function useArtworks(query) {
  const [state, dispatch] = useReducer(reducer, {
    artworks: [],
    loading: false,
    error: null,
    page: 1,
    hasMore: false,
  });

  useEffect(() => {
    if (!query) return;

    dispatch({ type: "FETCH_START" });

    searchArtworks(query)
      .then(({ artworks, hasMore }) =>
        dispatch({ type: "FETCH_SUCCESS", payload: artworks, hasMore }),
      )
      .catch((err) => dispatch({ type: "FETCH_ERROR", payload: err.message }));
  }, [query]);

  function loadMore() {
    searchArtworks(query, 12, state.page + 1)
      .then(({ artworks, hasMore }) =>
        dispatch({ type: "FETCH_MORE_SUCCESS", payload: artworks, hasMore }),
      )
      .catch((err) => dispatch({ type: "FETCH_ERROR", payload: err.message }));
  }

  return { ...state, loadMore };
}
