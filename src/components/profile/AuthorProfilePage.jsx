import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaUserCircle, FaCheck } from "react-icons/fa";
import { MdOutlineArticle } from "react-icons/md";
import { useAuthorProfileQuery } from "../../hooks/useAuthorProfileQuery";
import { getSocialMeta } from "../../utils/socialIcons.jsx";
import Posts from "../posts/posts";
import Postloading from "../postloading/postloading.jsx";
import "./profile.scss";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

function AuthorProfilePage() {
  const { userId } = useParams();
  const { profile, loading, error } = useAuthorProfileQuery(userId);
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    setPostsLoading(true);
    fetch(`${BASE_URL}/posts/?author=${userId}`)
      .then((res) => (res.ok ? res.json() : { results: [] }))
      .then((data) => setPosts(data.results || []))
      .finally(() => setPostsLoading(false));
  }, [userId]);

  if (loading) {
    return (
      <div className="profile-page">
        <div className="myposts-skeleton" style={{ height: 100, marginBottom: 26 }} />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="profile-page">
        <div className="profile-empty">
          <FaUserCircle className="profile-empty-icon" />
          <h2>Profil topilmadi</h2>
          <p>Bunday foydalanuvchi mavjud emas.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        {profile.avatar ? (
          <img src={profile.avatar} alt={profile.full_name} className="profile-avatar" />
        ) : (
          <span className="profile-avatar-placeholder">
            {(profile.full_name || "U")[0].toUpperCase()}
          </span>
        )}
        <div>
          <h1>
            {profile.full_name || "Foydalanuvchi"}
            {profile.verified && (
              <FaCheck className="profile-verified-badge" title="Tasdiqlangan" />
            )}
          </h1>
          <p>{profile.posts_count} ta maqola</p>
        </div>
      </div>

      {profile.bio && <p className="profile-bio">{profile.bio}</p>}

      {profile.social_links?.length > 0 && (
        <ul className="profile-links profile-links-view">
          {profile.social_links.map((url) => {
            const { Icon, label } = getSocialMeta(url);
            return (
              <li key={url}>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  <Icon className="profile-link-icon" />
                  <span className="profile-link-label">{label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      )}

      <div className="profile-posts">
        <h2 className="profile-posts-title">
          <MdOutlineArticle /> Maqolalari
        </h2>
        {postsLoading ? (
          <Postloading />
        ) : posts.length === 0 ? (
          <div className="submit-empty">
            <MdOutlineArticle className="submit-empty-icon" />
            <p>Bu foydalanuvchi hali maqola joylamagan.</p>
          </div>
        ) : (
          <Posts allPosts={posts} />
        )}
      </div>
    </div>
  );
}

export default AuthorProfilePage;
