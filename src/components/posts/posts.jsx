import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import "./posts.scss";

const Posts = ({ posts }) => {

  const stripHTML = (html) => {
    if (!html) return "";
    html = html
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/p>/gi, "\n")
      .replace(/<\/div>/gi, "\n");
    
    const div = document.createElement("div");
    div.innerHTML = html;
    const text = div.textContent || div.innerText || "";
    return text.replace(/\s+/g, " ").trim();
  };

  return (
    <div className="posts">
      {posts.length > 0 ? (
        posts.map((post) => {
          const hasImg = !!post.file;
          const cleanDescription = stripHTML(post.description);

          return (
            <div
              className={`post_item${hasImg ? "" : " post_item--noimg"} shadow-elegant`}
              key={post.id || post.title}
            >
              {hasImg && (
                <div className="post_left">
                  <img src={post.file} alt={post.title} />
                </div>
              )}

              <div className="post_right">
                <div className="post_tags">
                  {post.tags.map((tag) => (
                    <button key={tag}>{tag}</button>
                  ))}
                </div>

                <div className="post_text">
                  <Link to={`/posts/${post.id}`}>
                    <h1>{post.title}</h1>
                  </Link>
                  <p>
                    {cleanDescription.length > 380
                      ? cleanDescription.slice(0, 380) + "..."
                      : cleanDescription}
                  </p>
                </div>

                <div className="post_link">
                  <Link to={`/posts/${post.id}`}>
                    To'liq o'qish <FaArrowRightLong />
                  </Link>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p>No posts found</p>
      )}
    </div>
  );
};

export default Posts;