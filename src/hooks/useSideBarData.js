import { useState, useEffect } from "react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function useSidebarData() {
  const [randomPost, setRandomPost] = useState(null);
  const [latestPost, setLatestPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchSidebar = async () => {
      try {
        const [randomRes, lastRes] = await Promise.all([
          fetch(`${BASE_URL}/posts/random/`),
          fetch(`${BASE_URL}/posts/latest/`)
        ]);

        if (!randomRes.ok) {
          const text = await randomRes.text();
          throw new Error(`Random post: ${randomRes.status} ${randomRes.statusText}`);
        }
        if (!lastRes.ok) {
          const text = await lastRes.text();
          throw new Error(`Latest post: ${lastRes.status} ${lastRes.statusText}`);
        }

        const randomContentType = randomRes.headers.get("content-type");
        const lastContentType = lastRes.headers.get("content-type");

        if (!randomContentType?.includes("application/json")) {
          const text = await randomRes.text();
          throw new Error("Random post: JSON emas, HTML qaytdi");
        }
        if (!lastContentType?.includes("application/json")) {
          const text = await lastRes.text();
          throw new Error("Latest post: JSON emas");
        }

        const randomData = await randomRes.json();
        const lastData = await lastRes.json();

        setRandomPost(randomData);
        
        let processedLatest = null;
        if (lastData) {
          if (lastData.latest_post) {
            processedLatest = lastData.latest_post;
          } else if (Array.isArray(lastData)) {
            processedLatest = lastData[0];
          } else if (lastData.results && Array.isArray(lastData.results)) {
            processedLatest = lastData.results[0];
          } else {
            processedLatest = lastData;
          }
        }

        setLatestPost(processedLatest || null);

      } catch (err) {
        console.error("Sidebar yuklashda xato:", err);
        console.error("Error stack:", err.stack);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSidebar();
  }, []);

  return { randomPost, latestPost, loading, error }; // error qaytaramiz
}