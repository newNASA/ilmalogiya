import { FaRegCopyright, FaBookmark, FaRegBookmark } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";
import QuotesLoading from "./quotesLoading";
import { useAuth } from "../../../context/AuthContext";
import { saveQuote, unsaveQuote } from "../../../api/authApi";

const QuotesCards = ({ quotes }) => {
    const { user, savedQuoteIds, toggleSavedQuote } = useAuth();
    const [pendingIds, setPendingIds] = useState(new Set());

    if (!quotes || quotes.length === 0) {
        return <QuotesLoading />;
    }

    async function handleBookmark(e, quoteId, isSaved) {
        e.preventDefault();
        e.stopPropagation();
        if (!user) return;
        if (pendingIds.has(quoteId)) return;

        setPendingIds((p) => new Set(p).add(quoteId));
        const ok = isSaved ? await unsaveQuote(quoteId) : await saveQuote(quoteId);
        if (ok) toggleSavedQuote(quoteId, !isSaved);
        setPendingIds((p) => { const n = new Set(p); n.delete(quoteId); return n; });
    }

    return (
        <div className="quotes-list">
            {quotes.map((quote) => {
                const isSaved = savedQuoteIds.has(quote.id) || quote.is_saved === true;

                return (
                    <div key={quote.id} className="quotes-card shadow-elegant">
                        <div className="quotes-left">
                            <img src={quote.author_photo} alt={quote.author_name} />
                        </div>
                        <div className="quotes-right">
                            <div className="post_tags">
                                {quote.tags && quote.tags.map((tag) => (
                                    <button key={tag}>{tag}</button>
                                ))}
                            </div>
                            <Link to={`/quotes/${quote.slug}`}>
                                <q>{quote.text}</q>
                            </Link>
                            <div className="quotes-card-footer">
                                <p>
                                    <FaRegCopyright />
                                    <Link to={`/quotes/author/${quote.author_slug}`} className="author-name">
                                        {quote.author_name}
                                    </Link>
                                </p>
                                {user && (
                                    <button
                                        className={`quote-bookmark ${isSaved ? "saved" : ""}`}
                                        onClick={(e) => handleBookmark(e, quote.id, isSaved)}
                                        disabled={pendingIds.has(quote.id)}
                                        title={isSaved ? "Saqlanganlardan o'chirish" : "Saqlash"}
                                    >
                                        {isSaved ? <FaBookmark /> : <FaRegBookmark />}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default QuotesCards;
