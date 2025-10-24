import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoSearchSharp } from "react-icons/io5";

import './searchbar.scss';

function SearchBar({ posts }) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        if (value.trim() === '') {
            setResults([]);
            return;
        }
        const filtered = posts.filter(post =>
            post.title.toLowerCase().includes(value.toLowerCase())
        );
        setResults(filtered);
    };

    return (
        <form className="search" onSubmit={e => e.preventDefault()}>
            <input
                type="search"
                placeholder='Qidirish...'
                value={query}
                onChange={handleInputChange}
            />
            <button type='submit'>
                <IoSearchSharp />
            </button>
            {results.length > 0 && (
                <ul className="search-results">
                    {results.map((post, idx) => (
                        <li key={post.id}>
                            <Link to={`/posts/${post.id}`}>
                                <p>{idx + 1}. {post.title}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </form>
    );
}

export default SearchBar;