import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

import "./posts.scss";

const Posts = ({ posts }) => {
  return (
    <div className="posts">
      {posts.length > 0 ? (
        posts.map((post) => {
          const hasImg = !!post.img;
            return (
            <div
              className={`post_item${hasImg ? "" : " post_item--noimg"} shadow-elegant`}
              key={post.id || post.title}
            >
              {hasImg && (
              <div className="post_left">
                <img src={post.img} alt="" />
              </div>
              )}
              <div className="post_right">
              <div className="post_tags">
                {post.tags.map((tag) => (
                <button key={tag} className="">{tag}</button>
                ))}
              </div>
              <div className="post_text">
                <Link to={`/posts/${post.id}`}>
                <h1>{post.title}</h1>
                </Link>
                <p>
                {post.description.length > 380
                  ? post.description.slice(0, 380) + "..."
                  : post.description}
                </p>
              </div>
              <div className="post_link">
                <Link to={`/posts/${post.id}`}>To'liq o'qish <FaArrowRightLong /></Link>
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
