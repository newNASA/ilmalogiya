import "./tags.scss";
import { useTagsQuery } from "../../hooks/useTagsQuery";
import TagsLoading from "../tagsLoading/tagsLoading";
import { memo } from "react";

const Tags = ({ selectedTag, onTagChange }) => {
  const { tags, loading, error } = useTagsQuery();
  const safeTags = Array.isArray(tags?.results) ? tags.results : [];

  if (loading) return <TagsLoading />;
  if (error) return <div className="error">Error loading tags: {error}</div>;

  return (
    <div className="tags">
      <button
        onClick={() => onTagChange("all")}
        className={selectedTag === "all" ? "active" : ""}
      >
        Hammasi
      </button>
      {safeTags.map((tag) => (
        <button
          key={tag.id}
          onClick={() => onTagChange(tag.name)}
          className={selectedTag === tag.name ? "active" : ""}
        >
          {tag.name}
        </button>
      ))}
    </div>
  );
};

export default memo(Tags);