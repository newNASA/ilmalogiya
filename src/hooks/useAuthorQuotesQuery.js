import { useState, useEffect } from "react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useAuthorQuotesQuery = (authorSlug, page = 1) => {
  const [quotes, setQuotes] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!authorSlug) {
      setQuotes([]);
      setPagination({});
      setLoading(false);
      setError(null);
      return;
    }

    const fetchAuthorQuotes = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `${BASE_URL}/quotes/authors/${authorSlug}/quotes/?page=${page}`
        );
        if (!res.ok) throw new Error("Muallif hikmatli so'zlari topilmadi");

        const data = await res.json();
        setQuotes(data.results || []);
        setPagination({
          count: data.count || 0,
          next: data.next,
          previous: data.previous,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorQuotes();
  }, [authorSlug, page]);

  return { quotes, pagination, loading, error };
};
