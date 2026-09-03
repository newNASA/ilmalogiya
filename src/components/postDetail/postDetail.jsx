import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdOutlineDateRange } from "react-icons/md";
import { FaRegEdit, FaRegEye, FaTelegramPlane, FaFacebookF, FaCheck, FaBookmark, FaRegBookmark } from "react-icons/fa";
import { FaArrowLeftLong, FaXTwitter, FaCircleCheck } from "react-icons/fa6";
import { IoClose, IoLinkOutline } from "react-icons/io5";
import { useAuth } from "../../context/AuthContext";
import { savePost, unsavePost } from "../../api/authApi";
import { getSocialMeta } from "../../utils/socialIcons.jsx";
import { stripHTML } from "../../utils/stripHTML.jsx";
import { setPageMeta, resetPageMeta } from "../../utils/seo.js";
import { resolveMediaUrl } from "../../utils/mediaUrl.js";
import RelatedPosts from "./RelatedPosts";
import NotFound from "../notFound/NotFound";
import "./postDetail.scss";

const PostDetail = ({ post }) => {
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [savePending, setSavePending] = useState(false);
  const { user, savedPostIds, toggleSavedPost } = useAuth();
  const isSaved = post && (savedPostIds.has(post.id) || post.is_saved === true);

  async function handleBookmark() {
    if (!user || savePending) return;
    setSavePending(true);
    const ok = isSaved ? await unsavePost(post.id) : await savePost(post.id);
    if (ok) toggleSavedPost(post.id, !isSaved);
    setSavePending(false);
  }

  const pageUrl = window.location.href;
  const pageTitle = post?.title || "Ilmalogiya";

  const shareItems = [
    {
      id: "telegram",
      label: "Telegram",
      icon: <FaTelegramPlane />,
      color: "#26A5E4",
      href: `https://t.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(pageTitle)}`,
    },
    {
      id: "twitter",
      label: "X (Twitter)",
      icon: <FaXTwitter />,
      color: "#000",
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(pageTitle)}`,
    },
    {
      id: "facebook",
      label: "Facebook",
      icon: <FaFacebookF />,
      color: "#1877F2",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`,
    },
  ];

  const handleCopyLink = () => {
    navigator.clipboard.writeText(pageUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (post) {
      const cleanDesc = stripHTML(post.description || "").slice(0, 160);
      setPageMeta({
        title: `${post.title} | Ilmalogiya`,
        description: cleanDesc,
        path: `/posts/${post.slug}`,
        image: post.file || undefined,
      });
    } else {
      // Topilmagan sahifa Google indeksiga tushmasligi uchun noindex
      setPageMeta({ title: "Post topilmadi | Ilmalogiya", noindex: true });
    }
    return () => { resetPageMeta(); };
  }, [post]);

  useEffect(() => {
    if (isImageModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isImageModalOpen]);

  if (!post) return <NotFound />;

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

  const isVideo = post.file && /\.(mp4|webm|ogg)$/i.test(post.file);
  const fileUrl = resolveMediaUrl(post.file);

  return (
    <>
      <div className="post-detail shadow-elegant">
        {/* Rasm yoki Video — oddiy! */}
        {post.file && (
          <div className="post-img">
            {isVideo ? (
              <video controls autoPlay muted preload="metadata">
                <source src={fileUrl} type="video/mp4" />
                Video yuklanmadi
              </video>
            ) : (
              <img 
                src={fileUrl} 
                alt={post.title} 
                loading="lazy"
                onClick={() => setIsImageModalOpen(true)}
                style={{ cursor: "pointer" }}
              />
            )}
            {post.imgdesc && <span className="img-caption">{post.imgdesc}</span>}
          </div>
        )}

        {/* Taglar */}
        <div className="post_tags_row">
          <div className="post_tags">
            {post.tags?.map((tag) => (
              <button key={tag}>{tag}</button>
            ))}
          </div>
          {user && (
            <button
              className={`post_bookmark ${isSaved ? "saved" : ""}`}
              onClick={handleBookmark}
              disabled={savePending}
              title={isSaved ? "Saqlanganlardan o'chirish" : "Saqlash"}
            >
              {isSaved ? <FaBookmark /> : <FaRegBookmark />}
            </button>
          )}
        </div>

        {/* Sarlavha */}
        <div className="post-title">
          <h1>{post.title}</h1>
        </div>

        {/* Sana va ko'rishlar */}
        <div className="post-date">
          <p className="published">
            <MdOutlineDateRange /> {formatDateTime(post.publishedDate)}
          </p>
          {post.modifiedDate && new Date(post.publishedDate) < new Date(post.modifiedDate) && (
            <p className="modified">
              <FaRegEdit /> {formatDateTime(post.modifiedDate)}
            </p>
          )}
          <p className="views">
            <FaRegEye /> {post.views || 0}
          </p>
        </div>



        {/* Tavsif */}
        <div
          className="post-description"
          dangerouslySetInnerHTML={{ __html: post.description }}
        />

        {/* Muallif (user yuborgan postlar uchun) */}
        {post.author_name && (
          <div className="post-author">
            <span className="post-author-label">Muallif:</span>
            {post.author ? (
              <Link to={`/users/${post.author}`} className="post-author-name">
                {post.author_name}
                {post.author_verified && (
                  <FaCircleCheck className="post-author-verified" title="Tasdiqlangan" />
                )}
              </Link>
            ) : (
              <span className="post-author-name">{post.author_name}</span>
            )}
            {post.author_links?.length > 0 && (
              <span className="post-author-links">
                {post.author_links.map((url) => {
                  const { Icon, label } = getSocialMeta(url);
                  return (
                    <a
                      key={url}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={label}
                    >
                      <Icon />
                    </a>
                  );
                })}
              </span>
            )}
          </div>
        )}

        {/* Inline Share tugmalari — post oxirida */}
        <div className="share-section">
          <h4>Ulashish</h4>
          <div className="share-options">
            {shareItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="share-social-btn"
                style={{ "--share-color": item.color }}
                title={item.label}
              >
                <span className="share-icon">{item.icon}</span>
                <span>{item.label}</span>
              </a>
            ))}

            <button
              className={`share-social-btn copy-link-btn ${copied ? "copied" : ""}`}
              onClick={handleCopyLink}
              title="Havolani nusxalash"
            >
              <span className="share-icon">
                {copied ? <FaCheck /> : <IoLinkOutline />}
              </span>
              <span>{copied ? "Nusxalandi!" : "Havolani nusxalash"}</span>
            </button>
          </div>
        </div>

        {/* Orqaga tugmasi */}
        <Link to="/" className="back-btn">
          <FaArrowLeftLong /> Bosh sahifaga qaytish
        </Link>

        {/* Aloqador maqolalar */}
        <RelatedPosts slug={post.slug} />
      </div>


      {/* Image Modal */}
      {isImageModalOpen && !isVideo && post.file && (
        <div 
          className="image-modal-overlay"
          onClick={() => setIsImageModalOpen(false)}
        >
          <button 
            className="image-modal-close"
            onClick={() => setIsImageModalOpen(false)}
            aria-label="Yopish"
          >
            <IoClose />
          </button>
          <div 
            className="image-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={fileUrl} alt={post.title} />
            {post.imgdesc && (
              <div className="image-modal-caption">{post.imgdesc}</div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PostDetail;