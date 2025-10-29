import { useState, useEffect } from "react";

export function useTagsQuery() {
    const [tags, setTags] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTags = async () => {
            try{
                const res = await fetch("https://api.ilmalogiya.uz/api/tags/");
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                const data = await res.json();
                setTags(data);
            } catch (err){
                setError(err.message)
            } finally {
                setLoading(false);
            }
        }
        fetchTags();
    }, []);
    return { tags, loading, error }
}