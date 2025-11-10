import { useState, useEffect } from "react";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const useGetOneQuery = (postId) => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!postId) {
      setPost(null);
      setLoading(false);
      setError(null);
      return;
    }

    const fetchPost = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`${BASE_URL}/posts/${postId}/`);
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
  }, [postId]);

  return { post, loading, error };
};