import { useState, useEffect } from "react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function useHomeData(page = 1, searchQuery = "", selectedTags = [], excludeSlug = "") {
  // Barcha turdagi ma'lumotlar uchun state
  const [data, setData] = useState({
    tags: [],
    posts: [],
    randomPost: null,
    latestPost: null,
  });

  const [seed, setSeed] = useState(() => Math.random().toString());
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      setLoading(true);
      setError(null);
      try {
        let url = `${BASE_URL}/home/?page=${page}&seed=${seed}`;

        if (searchQuery) {
          url += `&search=${encodeURIComponent(searchQuery)}`;
        }

        if (selectedTags && selectedTags.length > 0) {
          url += `&tag=${encodeURIComponent(selectedTags.join(","))}`;
        }

        const res = await fetch(url);
        if (!res.ok) throw new Error(`Xatolik yuz berdi: ${res.status}`);

        const result = await res.json();

        // Sidebar uchun: agar excludeSlug berilgan bo'lsa, random/latest ni alohida olamiz
        let randomPost = result.random_post || null;
        let latestPost = result.latest_post || null;

        if (excludeSlug) {
          // Random post hozirgi post bo'lsa — yangi random so'rov
          const sidebarPromises = [];

          const needNewRandom = randomPost?.slug === excludeSlug;
          const needNewLatest = latestPost?.slug === excludeSlug;

          if (needNewRandom) {
            sidebarPromises.push(
              fetch(`${BASE_URL}/posts/random/?exclude=${excludeSlug}`)
                .then((r) => (r.ok ? r.json() : null))
                .then((d) => { randomPost = d; })
            );
          }
          if (needNewLatest) {
            sidebarPromises.push(
              fetch(`${BASE_URL}/posts/latest/?exclude=${excludeSlug}`)
                .then((r) => (r.ok ? r.json() : null))
                .then((d) => { latestPost = d; })
            );
          }

          if (sidebarPromises.length > 0) {
            await Promise.all(sidebarPromises);
          }
        }

        // Ma'lumotlarni state'ga joylaymiz
        setData({
          tags: result.tags || [],
          posts: result.posts?.results || [],
          randomPost,
          latestPost,
        });

        // Pagination ma'lumotlari
        setPagination({
          count: result.posts?.count || 0,
          next: result.posts?.next,
          previous: result.posts?.previous,
          // Agar har bir sahifada 10 ta post bo'lsa:
          totalPages: result.posts?.count ? Math.ceil(result.posts.count / 10) : 1,
        });

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, [page, seed, searchQuery, selectedTags, excludeSlug]); // Parametrlar o'zgarganda qayta chaqiriladi

  return {
    tags: data.tags,
    posts: data.posts,
    randomPost: data.randomPost,
    latestPost: data.latestPost,
    pagination,
    loading,
    error
  };
}