import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { FaRegCopyright, FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useSingleQuoteQuery } from "../../../hooks/useSingleQuoteQuery";
import { useAuth } from "../../../context/AuthContext";
import { saveQuote, unsaveQuote } from "../../../api/authApi";
import SingleQuoteLoading from "./singlequoteloading";

function SingleQuote({ slug: propSlug, initialQuote }) {
    const { slug: paramsSlug } = useParams();
    const slug = propSlug || paramsSlug;

    const { quote: fetchedQuote, loading, error } = useSingleQuoteQuery(initialQuote ? null : slug);
    const quote = initialQuote || fetchedQuote;

    const { user, savedQuoteIds, toggleSavedQuote } = useAuth();
    const [savePending, setSavePending] = useState(false);
    const isSaved = quote && (savedQuoteIds.has(quote.id) || quote.is_saved === true);

    async function handleBookmark() {
        if (!user || savePending) return;
        setSavePending(true);
        const ok = isSaved ? await unsaveQuote(quote.id) : await saveQuote(quote.id);
        if (ok) toggleSavedQuote(quote.id, !isSaved);
        setSavePending(false);
    }

    if (loading && !quote) return <SingleQuoteLoading />;
    if (error && !quote) return <div className="error">Xatolik: {error}</div>;
    if (!quote) return <div className="not-found">Quote topilmadi</div>;

    return (
        <div className="single-quote-page">
            <div className="single-card shadow-elegant">
                {/* Author Photo */}
                <div className="author-img">
                    {quote.author?.photo ? (
                        <img src={quote.author.photo} alt={quote.author.name} />
                    ) : quote.author_photo ? (
                        <img src={quote.author_photo} alt={quote.author_name} />
                    ) : null}
                </div>

                {/* Tags + Bookmark */}
                <div className="single-quote-tags-row">
                    {quote.tags && quote.tags.length > 0 && (
                        <div className="post_tags">
                            {quote.tags.map((tag, index) => (
                                <button key={tag.id || tag || index} className="tag-button">
                                    {tag.name || tag}
                                </button>
                            ))}
                        </div>
                    )}
                    {user && (
                        <button
                            className={`quote-bookmark ${isSaved ? "saved" : ""}`}
                            onClick={handleBookmark}
                            disabled={savePending}
                            title={isSaved ? "Saqlanganlardan o'chirish" : "Saqlash"}
                        >
                            {isSaved ? <FaBookmark /> : <FaRegBookmark />}
                        </button>
                    )}
                </div>

                {/* Quote Text */}
                <div className="quote-content">
                    <q className="quote-text">{quote.text}</q>
                </div>

                {/* Author Info */}
                <div className="author-details">
                    <Link to={`/quotes/author/${quote.author?.slug || quote.author_slug}`} className="author-name">
                        <FaRegCopyright />
                        <span>{quote.author?.name || quote.author_name}</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SingleQuote;
