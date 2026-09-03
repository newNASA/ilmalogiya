import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { resolveMediaUrl } from "../../utils/mediaUrl.js";
import { stripHTML } from "../../utils/stripHTML.jsx";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function RelatedPosts({ slug }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setPosts([]);
    fetch(`${BASE_URL}/posts/${slug}/related/`)
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setPosts(Array.isArray(data) ? data : []))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, [slug]);

  if (!loading && posts.length === 0) return null;

  return (
    <div className="related-posts">
      <h3 className="related-posts__title">Aloqador maqolalar</h3>

      <div className="related-posts__track" ref={scrollRef}>
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="related-card related-card--skeleton">
                <div className="related-card__img sk" />
                <div className="related-card__body">
                  <div className="sk sk-tag" />
                  <div className="sk sk-title" />
                  <div className="sk sk-line" />
                </div>
              </div>
            ))
          : posts.map((post) => {
              const fileUrl = resolveMediaUrl(post.file);
              const postLink = post.slug ? `/posts/${post.slug}` : `/posts/${post.id}`;
              const desc = stripHTML(post.description || "");
              return (
                <Link to={postLink} key={post.id} className="related-card">
                  {fileUrl && (
                    <div className="related-card__img">
                      <img src={fileUrl} alt={post.title} loading="lazy" />
                    </div>
                  )}
                  <div className="related-card__body">
                    {post.tags?.length > 0 && (
                      <div className="related-card__tags">
                        {post.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="related-card__tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <h4 className="related-card__title">{post.title}</h4>
                    {desc && (
                      <p className="related-card__desc">
                        {desc.length > 80 ? desc.slice(0, 80) + "…" : desc}
                      </p>
                    )}
                    <span className="related-card__link">
                      O'qish <FaArrowRightLong />
                    </span>
                  </div>
                </Link>
              );
            })}
      </div>
    </div>
  );
}

export default RelatedPosts;
