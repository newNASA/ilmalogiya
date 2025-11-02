import "./tags.scss";
import { useTagsQuery } from "../../hooks/useTagsQuery";
import TagsLoading from "../tagsLoading/tagsLoading"

const Tags = ({ selectedTag, setSelectedTag }) => {
  const { tags, loading, error } = useTagsQuery();

  if (loading) return <TagsLoading />;
  if (error) return <div className="error">Error loading tags: {error}</div>;

  return (
    <div className="tags">
      <button
        onClick={() => setSelectedTag("all")}
        className={selectedTag === "all" ? "active" : ""}
      >
        Hammasi
      </button>

      {tags.map((tag) => (
        <button
          key={tag.id}
          onClick={() => setSelectedTag(tag.name)}
          className={selectedTag === tag.name ? "active" : ""}
        >
          {tag.name}
        </button>
      ))}
    </div>
  );
};

export default Tags;