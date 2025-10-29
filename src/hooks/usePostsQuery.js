import { useEffect, useState } from "react";

export function usePostsQuery() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () =>{
            try{
                const res = await fetch("https://api.ilmalogiya.uz/api/posts/");
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                const data = await res.json();
                setPosts(data);
            }catch (err){
                setError(err.message)
            } finally {
                setLoading(false);
            }
        }
        fetchPosts();
    }, []);
    
    return { posts, loading, error }
}