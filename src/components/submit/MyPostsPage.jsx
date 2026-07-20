import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineArticle } from "react-icons/md";
import { FaRegClock, FaCheck, FaXmark } from "react-icons/fa6";
import { useAuth } from "../../context/AuthContext";
import { getMyPosts } from "../../api/authApi";
import { stripHTML } from "../../utils/stripHTML.jsx";
import "./submit.scss";

const STATUS_META = {
  pending: { label: "Kutilmoqda", icon: <FaRegClock /> },
  approved: { label: "Tasdiqlangan", icon: <FaCheck /> },
  rejected: { label: "Rad etilgan", icon: <FaXmark /> },
};

function MyPostsPage() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    setLoading(true);
    getMyPosts().then((data) => {
      setPosts(Array.isArray(data) ? data : []);
      setLoading(false);
    });
  }, [user]);

  if (!user) {
    return (
      <div className="submit-page">
        <div className="submit-empty">
          <MdOutlineArticle className="submit-empty-icon" />
          <h2>Login qilish kerak</h2>
          <p>Yuborgan maqolalaringizni ko'rish uchun avval Google orqali kiring.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="submit-page">
      <div className="submit-header">
        <h1>Mening maqolalarim</h1>
        <p>{user.full_name || user.email}</p>
      </div>

      {loading ? (
        <div className="myposts-list">
          {[1, 2, 3].map((i) => <div key={i} className="myposts-skeleton" />)}
        </div>
      ) : posts.length === 0 ? (
        <div className="submit-empty">
          <MdOutlineArticle className="submit-empty-icon" />
          <h2>Hali maqola yubormagansiz</h2>
          <p>Birinchi maqolangizni yuboring — admin tasdiqlagach saytga chiqadi.</p>
          <Link to="/submit" className="submit-btn">Maqola yuborish</Link>
        </div>
      ) : (
        <div className="myposts-list">
          {posts.map((post) => {
            const meta = STATUS_META[post.status] || STATUS_META.pending;
            const cleanDesc = stripHTML(post.description || "");
            return (
              <Link
                to={`/posts/${post.slug}`}
                key={post.id}
                className="myposts-card shadow-elegant"
              >
                {post.file && (
                  <div className="myposts-media">
                    <img src={post.file} alt={post.title} loading="lazy" />
                  </div>
                )}
                <div className="myposts-body">
                  <div className="myposts-top">
                    <span className={`myposts-status ${post.status}`}>
                      {meta.icon} {meta.label}
                    </span>
                    <span className="myposts-date">
                      {new Date(post.publishedDate).toLocaleDateString("uz-UZ")}
                    </span>
                  </div>

                  <h2>{post.title}</h2>

                  <p>
                    {cleanDesc.length > 180 ? cleanDesc.slice(0, 180) + "..." : cleanDesc}
                  </p>

                  {post.status === "rejected" && post.rejection_reason && (
                    <p className="myposts-reason">
                      <strong>Rad etish sababi:</strong> {post.rejection_reason}
                    </p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyPostsPage;
