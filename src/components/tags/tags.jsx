import "./tags.scss";

const Tags = ({ selectedTag, setSelectedTag }) => {
  const tags = ["all", "react", "javascript", "node", "backend", "css", "frontend"];

  return (
    <div className="tags">
      {tags.map((tag) => (
        <button key={tag} onClick={() => setSelectedTag(tag)} className={selectedTag === tag ? "active" : ""}>
          {tag}
        </button>
      ))}
    </div>
  );
};

export default Tags;
