import "./postDetailSkeleton.scss";

function PostDetailSkeleton() {
  return (
    <div className="pd-skeleton shadow-elegant">
      {/* Rasm */}
      <div className="pd-sk pd-sk-img" />

      {/* Tags row */}
      <div className="pd-sk-tags-row">
        <div className="pd-sk pd-sk-tag" />
        <div className="pd-sk pd-sk-tag" />
        <div className="pd-sk pd-sk-tag" />
      </div>

      {/* Sarlavha */}
      <div className="pd-sk pd-sk-title" />
      <div className="pd-sk pd-sk-title pd-sk-title--short" />

      {/* Sana va ko'rishlar */}
      <div className="pd-sk-meta-row">
        <div className="pd-sk pd-sk-meta" />
        <div className="pd-sk pd-sk-meta" />
        <div className="pd-sk pd-sk-meta pd-sk-meta--short" />
      </div>

      {/* Tavsif satrlari */}
      <div className="pd-sk-body">
        {[100, 95, 90, 100, 85, 92, 78, 100, 88, 60].map((w, i) => (
          <div
            key={i}
            className="pd-sk pd-sk-line"
            style={{ width: `${w}%` }}
          />
        ))}
      </div>

      {/* Muallif */}
      <div className="pd-sk-author">
        <div className="pd-sk pd-sk-author-label" />
        <div className="pd-sk pd-sk-author-name" />
      </div>

      {/* Share */}
      <div className="pd-sk-share">
        <div className="pd-sk pd-sk-share-title" />
        <div className="pd-sk-share-btns">
          <div className="pd-sk pd-sk-share-btn" />
          <div className="pd-sk pd-sk-share-btn" />
          <div className="pd-sk pd-sk-share-btn" />
          <div className="pd-sk pd-sk-share-btn" />
        </div>
      </div>
    </div>
  );
}

export default PostDetailSkeleton;
