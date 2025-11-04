// hooks/useSidebarData.js
import { useState, useEffect } from "react";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export function useSidebarData() {
  const [randomPost, setRandomPost] = useState(null);
  const [lastPost, setLastPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSidebar = async () => {
      try {
        const [randomRes, lastRes] = await Promise.all([
          fetch(`${BASE_URL}/posts/random/`), // Backendda bu endpoint bo‘lishi kerak
          fetch(`${BASE_URL}/posts/latest/`)  // yoki /posts/?page=1&limit=1
        ]);

        const randomData = await randomRes.json();
        const lastData = await lastRes.json();

        setRandomPost(randomData);
        setLastPost(Array.isArray(lastData) ? lastData[0] : lastData);
      } catch (err) {
        console.error("Sidebar yuklashda xato:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSidebar();
  }, []); // Faqat bir marta ishlaydi!

  return { randomPost, lastPost, loading };
}