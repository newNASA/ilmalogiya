import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaBookmark, FaRegBookmark, FaPlay } from "react-icons/fa";
import "./posts.scss";
import { stripHTML } from "../../utils/stripHTML.jsx";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { savePost, unsavePost } from "../../api/authApi";

const Posts = ({
  allPosts = [],
  handleTagClick,
}) => {
  const filteredPosts = allPosts;
  const { user, savedPostIds, toggleSavedPost } = useAuth();
  const [pendingIds, setPendingIds] = useState(new Set());

  if (!Array.isArray(filteredPosts) || filteredPosts.length === 0) {
    return <h1 className="postloading-message">Hech qanday post topilmadi</h1>;
  }

  const url = import.meta.env.VITE_API_MEDIA_URL;

  async function handleBookmark(e, postId, isSaved) {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return;
    if (pendingIds.has(postId)) return;

    setPendingIds((p) => new Set(p).add(postId));
    const ok = isSaved ? await unsavePost(postId) : await savePost(postId);
    if (ok) toggleSavedPost(postId, !isSaved);
    setPendingIds((p) => { const n = new Set(p); n.delete(postId); return n; });
  }

  return (
    <div className="posts">
      {filteredPosts.map((post) => {
        const hasFile = !!post.file;
        const isVideo = hasFile && /\.(mp4|webm|ogg)$/i.test(post.file);
        const cleanDescription = stripHTML(post.description || "");
        const postLink = post.slug ? `/posts/${post.slug}` : `/posts/${post.id}`;
        const isSaved = savedPostIds.has(post.id) || post.is_saved === true;

        return (
          <div
            className={`post_item${hasFile ? "" : " post_item--noimg"} shadow-elegant`}
            key={post.id}
          >
            {hasFile && (
              <div className="post_left">
                <Link to={postLink}>
                  {isVideo ? (
                    <div className="video-thumb">
                      <video muted preload="auto" playsInline>
                        <source src={url + post.file} type="video/mp4" />
                      </video>
                      <span className="video-play-icon"><FaPlay /></span>
                    </div>
                  ) : (
                    <img
                      src={url + post.file}
                      alt={post.title}
                      loading="lazy"
                    />
                  )}
                </Link>
              </div>
            )}

            <div className="post_right">
              <div className="post_tags_row">
                <div className="post_tags">
                  {post.tags?.map((tag) => (
                    <button
                      key={tag}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleTagClick?.(tag);
                      }}
                    >
                      {tag}
                    </button>
                  ))}
                </div>

                {user && (
                  <button
                    className={`post_bookmark ${isSaved ? "saved" : ""}`}
                    onClick={(e) => handleBookmark(e, post.id, isSaved)}
                    disabled={pendingIds.has(post.id)}
                    title={isSaved ? "Saqlanganlardan o'chirish" : "Saqlash"}
                  >
                    {isSaved ? <FaBookmark /> : <FaRegBookmark />}
                  </button>
                )}
              </div>

              <div className="post_text">
                <Link to={postLink}>
                  <h1>{post.title}</h1>
                </Link>
                <p>
                  {cleanDescription.length > 380
                    ? cleanDescription.slice(0, 380) + "..."
                    : cleanDescription}
                </p>
              </div>

              <div className="post_link">
                <Link to={postLink}>
                  To'liq o'qish <FaArrowRightLong />
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Posts;
