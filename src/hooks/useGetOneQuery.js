import { useState, useEffect } from "react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetOneQuery = (slug) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) {
      setPost(null);
      setLoading(false);
      setError(null);
      return;
    }

    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem("access_token");
        let res = await fetch(`${BASE_URL}/posts/${slug}/`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        // Token muddati o'tgan bo'lsa — headersiz (anonim) qayta urinish
        if (res.status === 401 && token) {
          res = await fetch(`${BASE_URL}/posts/${slug}/`);
        }
        if (!res.ok) throw new Error("Post topilmadi");

        const data = await res.json();
        setPost(data);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  return { post, loading, error };
};