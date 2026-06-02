import { memo } from "react";
import { useParams } from "react-router-dom";

import { useAuthorQuery } from "../../../hooks/useAuthorQuery";
import { useAuthorQuotesQuery } from "../../../hooks/useAuthorQuotesQuery";
import { useSidebarData } from "../../../hooks/useSideBarData";

import { MdOutlineDateRange } from "react-icons/md";
import { FaRegEdit, FaRegEye, FaTelegramPlane, FaFacebookF, FaShareAlt, FaCheck, FaQuoteRight } from "react-icons/fa";

import RightPosts from "../../rightPosts/rightposts"

import "./author.scss";

const MemoizedRightPosts = memo(RightPosts);

const OnLoad = () => (
    <div className="onload rightposts">
        <div className="onload-telegram telegram">
            <div className="h2"></div><p></p><p className="p"></p><div className="link"></div>
        </div>
        {[1, 2].map((i) => (
            <div key={i} className="randompost">
                <div className="h2"></div><div className="img"></div><div className="title"></div><p></p><p></p><p className="p"></p>
            </div>
        ))}
    </div>
);

const AuthorLoading = () => (
    <div className="author-loading">
        <div className="infos-shimmer">
            <div className="avatar-shimmer"></div>
            <div className="details-shimmer">
                <div className="name-shimmer"></div>
                <div className="count-shimmer"></div>
                <div className="dates-shimmer">
                    <div className="date-shimmer"></div>
                    <div className="date-shimmer"></div>
                </div>
            </div>
        </div>
        <div className="bio-shimmer">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
        </div>
        <div className="quotes-shimmer">
            <div className="title-shimmer"></div>
            {[1, 2, 3].map((i) => (
                <div key={i} className="quote-item-shimmer">
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
            ))}
        </div>
    </div>
);

function Author() {
    const { slug } = useParams();

    const { author, loading: authorLoading, error: authorError } = useAuthorQuery(slug);
    const { quotes, loading: quotesLoading, error: quotesError } = useAuthorQuotesQuery(slug);
    const { randomPost, latestPost, loading: homeLoading } = useSidebarData();

    console.log("Author Data:", author);
    console.log("Author Quotes:", quotes);

    const formatDateTime = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleString("uz-UZ", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const isLoading = authorLoading || quotesLoading;
    const hasError = authorError || quotesError;

    return (
        <div className="main-section author-detail">
            <div className="left">
                {isLoading ? (
                    <AuthorLoading />
                ) : hasError ? (
                    <p className="error">Xatolik yuz berdi. Iltimos, keyinroq urinib ko'ring.</p>
                ) : (
                    <div className="author-info">
                        <div className="infos">
                            <div className="info-left">
                                <img src={author?.photo} alt={author?.name} />
                            </div>
                            <div className="info-right">
                                <h1>{author?.name}</h1>
                                <p><span>{author?.quotes_count}</span> <br /> Iqtiboslar</p>
                                <div className="dates">
                                    <p><MdOutlineDateRange /> {formatDateTime(author?.created_date)}</p>
                                    <p><FaRegEdit /> {formatDateTime(author?.modified_date)}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bio post-description">
                            {author?.bio ? (
                                <div dangerouslySetInnerHTML={{ __html: author.bio }} />
                            ) : (
                                <p>Muallif haqida ma'lumot mavjud emas.</p>
                            )}
                        </div>
                        <div className="quotes">
                            <h2>Muallifning iqtiboslari</h2>
                            {quotes.length > 0 ? (
                                <ul>
                                    {quotes.map((quote) => (
                                        <li key={quote.id}>
                                            <blockquote>
                                                "{quote.text}"
                                                <FaQuoteRight className="quote-icon" />
                                            </blockquote>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Muallifning hikmatli so'zlari mavjud emas.</p>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <div className="right">
                {homeLoading ? (
                    <div className="text-center py-8"><OnLoad /></div>
                ) : (
                    <MemoizedRightPosts randomPost={randomPost} lastPost={latestPost} />
                )}
            </div>
        </div>
    )
}

export default Author;