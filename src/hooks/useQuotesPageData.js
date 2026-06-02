import { useState, useEffect } from "react";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function useQuotesPageData(page = 1, searchQuery = "", selectedTags = [], slug = null){
    const [data, setData] = useState({
        tags: [],
        quotes: [],
        randomPost: null,
        latestPost: null,
    });

    const [quoteData, setQuoteData] = useState(null);
    const [quoteLoading, setQuoteLoading] = useState(false);
    const [quoteError, setQuoteError] = useState(null);

    const [pagination, setPagination] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchQuotesPageData = async () => {
            setLoading(true);
            setError(null);
            try{
                let url = `${BASE_URL}/quotes/quotes-page/?page=${page}`;

                if(searchQuery){
                    url += `&search=${encodeURIComponent(searchQuery)}`;
                }

                if(selectedTags && selectedTags.length > 0){
                    url += `&tag=${encodeURIComponent(selectedTags.join(","))}`;
                }

                const res = await fetch(url);
                if(!res.ok) throw new Error(`Xatolik yuz berdi: ${res.status}`);

                const result = await res.json();

                setData({
                    tags: result.tags || [],
                    quotes: result.quotes?.results || [],
                    randomPost: result.random_post || null,
                    latestPost: result.latest_post || null,
                })

                setPagination({
                    count: result.quotes?.count || 0,
                    next: result.quotes?.next,
                    previous: result.quotes?.previous,
                    totalPages: result.quotes?.count ? Math.ceil(result.quotes.count / 10) : 1,
                })

            }catch(err){
                setError(err.message);
            }finally{
                setLoading(false);
            }
        }

        fetchQuotesPageData();
    }, [page, searchQuery, selectedTags]);

    useEffect(() => {
        if (!slug) {
            setQuoteData(null);
            setQuoteLoading(false);
            setQuoteError(null);
            return;
        }

        const fetchSingleQuote = async () => {
            setQuoteLoading(true);
            setQuoteError(null);
            try {
                const res = await fetch(`${BASE_URL}/quotes/quotes/${slug}/`);
                if (!res.ok) throw new Error("Hikmatli so'z topilmadi");
                const result = await res.json();
                setQuoteData(result);
            } catch (err) {
                setQuoteError(err.message);
            } finally {
                setQuoteLoading(false);
            }
        };

        fetchSingleQuote();
    }, [slug]);

    return {
        tags: data.tags,
        quotes: data.quotes,
        randomPost: data.randomPost,
        latestPost: data.latestPost,
        quoteData,
        quoteLoading,
        quoteError,
        pagination,
        loading,
        error
    };
}
