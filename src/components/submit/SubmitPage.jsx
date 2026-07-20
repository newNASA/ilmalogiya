import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegImage, FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { MdOutlineArticle } from "react-icons/md";
import { useAuth } from "../../context/AuthContext";
import { useTagsQuery } from "../../hooks/useTagsQuery";
import { submitPost } from "../../api/authApi";
import DescriptionEditor from "./DescriptionEditor";
import "./submit.scss";

const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1 MB
const MAX_TAGS = 3;

function SubmitPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { tags } = useTagsQuery();
  const fileInputRef = useRef(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [fileError, setFileError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const tagList = Array.isArray(tags) ? tags : tags?.results || [];

  function toggleTag(name) {
    setSelectedTags((prev) => {
      if (prev.includes(name)) return prev.filter((t) => t !== name);
      if (prev.length >= MAX_TAGS) return prev;
      return [...prev, name];
    });
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    setFileError("");
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setFileError("Faqat rasm yuklash mumkin (jpg, png, webp).");
      e.target.value = "";
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setFileError(
        `Rasm hajmi 1 MB dan oshmasligi kerak (sizniki: ${(file.size / 1024 / 1024).toFixed(2)} MB).`
      );
      e.target.value = "";
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  }

  function removeImage() {
    setImageFile(null);
    setImagePreview("");
    setFileError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitError("");

    if (!title.trim() || !description.trim()) {
      setSubmitError("Sarlavha va matn to'ldirilishi shart.");
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("title", title.trim());
      formData.append("description", description.trim());
      selectedTags.forEach((t) => formData.append("tags", t));
      if (imageFile) formData.append("file", imageFile);

      await submitPost(formData);
      setSuccess(true);
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (!user) {
    return (
      <div className="submit-page">
        <div className="submit-empty">
          <MdOutlineArticle className="submit-empty-icon" />
          <h2>Login qilish kerak</h2>
          <p>Maqola yuborish uchun avval Google orqali kiring.</p>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="submit-page">
        <div className="submit-empty">
          <FaCheck className="submit-empty-icon success" />
          <h2>Maqolangiz yuborildi!</h2>
          <p>
            Maqolangiz admin tomonidan tekshirilgandan so'ng saytga joylanadi.
            Holatini "Mening maqolalarim" bo'limida kuzatishingiz mumkin.
          </p>
          <div className="submit-success-actions">
            <Link to="/my-posts" className="submit-btn">Mening maqolalarim</Link>
            <button
              className="submit-btn outline"
              onClick={() => {
                setTitle("");
                setDescription("");
                setSelectedTags([]);
                removeImage();
                setSuccess(false);
              }}
            >
              Yana yuborish
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="submit-page">
      <div className="submit-header">
        <h1>Maqola yuborish</h1>
        <p>
          Maqolangiz admin tekshiruvidan o'tgach saytga joylanadi. Faqat rasm
          (1 MB gacha) biriktirish mumkin.
        </p>
      </div>

      <form className="submit-form shadow-elegant" onSubmit={handleSubmit}>
        <label className="submit-field">
          <span>Sarlavha *</span>
          <input
            type="text"
            value={title}
            maxLength={250}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Maqola sarlavhasi"
          />
        </label>

        <div className="submit-field">
          <span>Matn *</span>
          <DescriptionEditor
            value={description}
            onChange={setDescription}
            placeholder="Maqola matni... (formatlash uchun matnni belgilab, yuqoridagi tugmalardan foydalaning)"
          />
        </div>

        <div className="submit-field">
          <span>Teglar (ko'pi bilan {MAX_TAGS} ta)</span>
          <div className="submit-tags">
            {tagList.map((tag) => {
              const name = tag.name || tag;
              const active = selectedTags.includes(name);
              return (
                <button
                  type="button"
                  key={tag.id || name}
                  className={`submit-tag ${active ? "active" : ""}`}
                  onClick={() => toggleTag(name)}
                >
                  {name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="submit-field">
          <span>Rasm (ixtiyoriy, 1 MB gacha)</span>
          {imagePreview ? (
            <div className="submit-image-preview">
              <img src={imagePreview} alt="Tanlangan rasm" />
              <button type="button" className="remove-image" onClick={removeImage} title="Rasmni olib tashlash">
                <IoClose />
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="submit-image-drop"
              onClick={() => fileInputRef.current?.click()}
            >
              <FaRegImage />
              <span>Rasm tanlash</span>
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            hidden
          />
          {fileError && <p className="submit-error">{fileError}</p>}
        </div>

        {submitError && <p className="submit-error">{submitError}</p>}

        <button type="submit" className="submit-btn" disabled={submitting}>
          {submitting ? "Yuborilmoqda..." : "Yuborish"}
        </button>
      </form>
    </div>
  );
}

export default SubmitPage;
