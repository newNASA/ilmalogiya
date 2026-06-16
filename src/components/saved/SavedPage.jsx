import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRightLong, FaRegCopyright, FaBookmark } from "react-icons/fa6";
import { MdOutlineArticle } from "react-icons/md";
import { FaQuoteRight } from "react-icons/fa";
import { getSavedItems, unsavePost, unsaveQuote } from "../../api/authApi";
import { useAuth } from "../../context/AuthContext";
import { stripHTML } from "../../utils/stripHTML.jsx";
import "./saved.scss";

const TABS = [
  { key: "posts", label: "Maqolalar", icon: <MdOutlineArticle /> },
  { key: "quotes", label: "Iqtiboslar", icon: <FaQuoteRight /> },
];

function SavedPage() {
  const { user, toggleSavedPost, toggleSavedQuote } = useAuth();
  const [tab, setTab] = useState("posts");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const url = import.meta.env.VITE_API_MEDIA_URL;

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    setLoading(true);
    getSavedItems().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, [user]);

  async function handleUnsavePost(postId) {
    const ok = await unsavePost(postId);
    if (ok) {
      toggleSavedPost(postId, false);
      setData((prev) => ({
        ...prev,
        saved_posts: {
          ...prev.saved_posts,
          results: prev.saved_posts.results.filter((p) => p.id !== postId),
          count: prev.saved_posts.count - 1,
        },
      }));
    }
  }

  async function handleUnsaveQuote(quoteId) {
    const ok = await unsaveQuote(quoteId);
    if (ok) {
      toggleSavedQuote(quoteId, false);
      setData((prev) => ({
        ...prev,
        saved_quotes: {
          ...prev.saved_quotes,
          results: prev.saved_quotes.results.filter((q) => q.id !== quoteId),
          count: prev.saved_quotes.count - 1,
        },
      }));
    }
  }

  if (!user) {
    return (
      <div className="saved-page">
        <div className="saved-empty">
          <FaBookmark className="saved-empty-icon" />
          <h2>Login qilish kerak</h2>
          <p>Saqlangan postlarni ko'rish uchun avval Google orqali kiring.</p>
        </div>
      </div>
    );
  }

  const posts = data?.saved_posts?.results || [];
  const quotes = data?.saved_quotes?.results || [];

  return (
    <div className="saved-page">
      <div className="saved-header">
        <h1>Saqlangan</h1>
        <p>{user.full_name || user.email}</p>
      </div>

      <div className="saved-tabs">
        {TABS.map((t) => (
          <button
            key={t.key}
            className={`saved-tab ${tab === t.key ? "active" : ""}`}
            onClick={() => setTab(t.key)}
          >
            {t.icon}
            {t.label}
            <span className="saved-tab-count">
              {t.key === "posts" ? (data?.saved_posts?.count ?? 0) : (data?.saved_quotes?.count ?? 0)}
            </span>
          </button>
        ))}
      </div>

      {loading ? (
        <div className="saved-loading">
          {[1, 2, 3].map((i) => <div key={i} className="saved-skeleton" />)}
        </div>
      ) : tab === "posts" ? (
        posts.length === 0 ? (
          <div className="saved-empty">
            <MdOutlineArticle className="saved-empty-icon" />
            <h2>Saqlangan maqolalar yo'q</h2>
            <p>Maqolalarni saqlash uchun maqola ichida bookmark tugmasini bosing.</p>
            <Link to="/" className="saved-go-btn">Maqolalarga o'tish</Link>
          </div>
        ) : (
          <div className="saved-list">
            {posts.map((post) => {
              const cleanDesc = stripHTML(post.description || "");
              const postLink = post.slug ? `/posts/${post.slug}` : `/posts/${post.id}`;
              return (
                <div key={post.id} className="saved-item shadow-elegant">
                  {post.file && (
                    <div className="saved-item-img">
                      <Link to={postLink}>
                        <img src={url + post.file} alt={post.title} loading="lazy" />
                      </Link>
                    </div>
                  )}
                  <div className="saved-item-body">
                    <div className="post_tags">
                      {post.tags?.map((tag) => <button key={tag}>{tag}</button>)}
                    </div>
                    <Link to={postLink}><h3>{post.title}</h3></Link>
                    <p>{cleanDesc.length > 200 ? cleanDesc.slice(0, 200) + "..." : cleanDesc}</p>
                    <div className="saved-item-actions">
                      <Link to={postLink} className="saved-read-btn">
                        O'qish <FaArrowRightLong />
                      </Link>
                      <button
                        className="saved-remove-btn"
                        onClick={() => handleUnsavePost(post.id)}
                        title="Saqlanganlardan o'chirish"
                      >
                        <FaBookmark /> O'chirish
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )
      ) : (
        quotes.length === 0 ? (
          <div className="saved-empty">
            <FaQuoteRight className="saved-empty-icon" />
            <h2>Saqlangan iqtiboslar yo'q</h2>
            <p>Iqtiboslarni saqlash uchun iqtibos yonidagi bookmark tugmasini bosing.</p>
            <Link to="/quotes" className="saved-go-btn">Iqtiboslarga o'tish</Link>
          </div>
        ) : (
          <div className="saved-list saved-quotes-list">
            {quotes.map((quote) => (
              <div key={quote.id} className="saved-quote-item shadow-elegant">
                <div className="saved-quote-left">
                  {(quote.author?.photo || quote.author_photo) && (
                    <img
                      src={quote.author?.photo || quote.author_photo}
                      alt={quote.author?.name || quote.author_name}
                    />
                  )}
                </div>
                <div className="saved-quote-right">
                  <Link to={`/quotes/${quote.slug}`}>
                    <q>{quote.text}</q>
                  </Link>
                  <div className="saved-quote-footer">
                    <Link to={`/quotes/author/${quote.author?.slug || quote.author_slug}`} className="author-name">
                      <FaRegCopyright />
                      {quote.author?.name || quote.author_name}
                    </Link>
                    <button
                      className="saved-remove-btn"
                      onClick={() => handleUnsaveQuote(quote.id)}
                      title="Saqlanganlardan o'chirish"
                    >
                      <FaBookmark /> O'chirish
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}

export default SavedPage;
