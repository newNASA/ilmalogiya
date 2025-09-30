const Tags = ({ setSelectedTag }) => {
  const tags = ["all", "react", "javascript", "node", "backend", "css", "frontend"];

  return (
    <div>
      {tags.map((tag) => (
        <button key={tag} onClick={() => setSelectedTag(tag)}>
          {tag}
        </button>
      ))}
    </div>
  );
};

export default Tags;
