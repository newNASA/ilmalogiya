import { useEffect, useState } from "react";
import { FaPlus, FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { updateProfile } from "../../api/authApi";
import { getSocialMeta } from "../../utils/socialIcons.jsx";
import "./profile.scss";

const MAX_LINKS = 5;

function ProfilePage() {
  const { user, updateUser } = useAuth();

  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!user) return;
    setFullName(user.full_name || "");
    setBio(user.bio || "");
    setLinks(user.social_links || []);
  }, [user]);

  function addLink() {
    const link = newLink.trim();
    setError("");
    if (!link) return;
    if (links.length >= MAX_LINKS) {
      setError(`Ko'pi bilan ${MAX_LINKS} ta havola qo'shish mumkin.`);
      return;
    }
    let url = link;
    if (!/^https?:\/\//i.test(url)) url = `https://${url}`;
    try {
      new URL(url);
    } catch {
      setError("Havola noto'g'ri ko'rinishda.");
      return;
    }
    if (links.includes(url)) {
      setError("Bu havola allaqachon qo'shilgan.");
      return;
    }
    setLinks([...links, url]);
    setNewLink("");
  }

  function removeLink(url) {
    setLinks(links.filter((l) => l !== url));
  }

  async function handleSave(e) {
    e.preventDefault();
    setError("");
    setSaved(false);
    setSaving(true);
    try {
      const profile = await updateProfile({
        full_name: fullName.trim(),
        bio: bio.trim(),
        social_links: links,
      });
      updateUser(profile);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (!user) {
    return (
      <div className="profile-page">
        <div className="profile-empty">
          <FaUserCircle className="profile-empty-icon" />
          <h2>Login qilish kerak</h2>
          <p>Profilingizni ko'rish uchun avval Google orqali kiring.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        {user.avatar ? (
          <img src={user.avatar} alt={user.full_name} className="profile-avatar" />
        ) : (
          <span className="profile-avatar-placeholder">
            {(user.full_name || user.email || "U")[0].toUpperCase()}
          </span>
        )}
        <div>
          <h1>Profil</h1>
          <p>{user.email}</p>
        </div>
      </div>

      <form className="profile-form shadow-elegant" onSubmit={handleSave}>
        <label className="profile-field">
          <span>Ism</span>
          <input
            type="text"
            value={fullName}
            maxLength={255}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="To'liq ismingiz"
          />
        </label>

        <label className="profile-field">
          <span>Bio</span>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="O'zingiz haqingizda qisqacha..."
            rows={3}
          />
        </label>

        <div className="profile-field">
          <span>Ijtimoiy tarmoq havolalari (ko'pi bilan {MAX_LINKS} ta)</span>
          <p className="profile-hint">
            Telegram kanal, Instagram, YouTube yoki boshqa profilingiz havolasini
            qo'shing — ular siz yozgan maqolalarda ko'rinadi.
          </p>

          {links.length > 0 && (
            <ul className="profile-links">
              {links.map((url) => {
                const { Icon, label } = getSocialMeta(url);
                return (
                  <li key={url}>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                      <Icon className="profile-link-icon" />
                      <span className="profile-link-label">{label}</span>
                      <span className="profile-link-url">{url}</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => removeLink(url)}
                      title="O'chirish"
                    >
                      <IoClose />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}

          {links.length < MAX_LINKS && (
            <div className="profile-link-add">
              <input
                type="text"
                value={newLink}
                onChange={(e) => setNewLink(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addLink();
                  }
                }}
                placeholder="https://t.me/kanalingiz"
              />
              <button type="button" onClick={addLink}>
                <FaPlus /> Qo'shish
              </button>
            </div>
          )}
        </div>

        {error && <p className="profile-error">{error}</p>}

        <button type="submit" className="profile-save-btn" disabled={saving}>
          {saved ? (
            <>
              <FaCheck /> Saqlandi
            </>
          ) : saving ? (
            "Saqlanmoqda..."
          ) : (
            "Saqlash"
          )}
        </button>
      </form>
    </div>
  );
}

export default ProfilePage;
