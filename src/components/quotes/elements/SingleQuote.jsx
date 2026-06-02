import { Link, useParams } from "react-router-dom";
import { FaRegCopyright } from "react-icons/fa";
import { useSingleQuoteQuery } from "../../../hooks/useSingleQuoteQuery";

import SingleQuoteLoading from "./singlequoteloading";

function SingleQuote({ slug: propSlug, initialQuote }) {
    const { slug: paramsSlug } = useParams();
    const slug = propSlug || paramsSlug;

    const { quote: fetchedQuote, loading, error } = useSingleQuoteQuery(initialQuote ? null : slug);
    const quote = initialQuote || fetchedQuote;

    if (loading && !quote) return <SingleQuoteLoading />;
    if (error && !quote) return <div className="error">Xatolik: {error}</div>;
    if (!quote) return <div className="not-found">Quote topilmadi</div>;

    return (
        <div className="single-quote-page">
            <div className="single-card shadow-elegant">
                {/* Author Photo */}
                <div className="author-img">
                    {quote.author?.photo ? (
                        <img
                            src={quote.author.photo}
                            alt={quote.author.name}
                        />
                    ) : quote.author_photo ? (
                        <img
                            src={quote.author_photo}
                            alt={quote.author_name}
                        />
                    ) : null}
                </div>

                {/* Tags */}
                {quote.tags && quote.tags.length > 0 && (
                    <div className="post_tags">
                        {quote.tags.map((tag, index) => (
                            <button key={tag.id || tag || index} className="tag-button">
                                {tag.name || tag}
                            </button>
                        ))}
                    </div>
                )}

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