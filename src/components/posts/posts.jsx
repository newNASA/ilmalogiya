import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import "./posts.scss";
import NoPost from "../nopost/nopost.jsx";
import { stripHTML } from "../../utils/stripHTML.jsx";
import { motion } from "framer-motion"; // 🧠 Qo‘shildi

const Posts = ({ posts }) => {
  return (
    <div className="posts">
      {posts.length > 0 ? (
        posts.map((post) => {
          const hasFile = !!post.file;
          const cleanDescription = stripHTML(post.description);
          const isVideo = hasFile && /\.(mp4|webm|ogg)$/i.test(post.file);

          return (
            <div
              className={`post_item${hasFile ? "" : " post_item--noimg"} shadow-elegant`}
              key={post.id || post.title}
            >
              {hasFile && (
                <div className="post_left">
                  <Link to={`/posts/${post.id}`}>
                    {isVideo ? (
                      <motion.video
                        layoutId={`media-${post.id}`} // 🪄 Hero ID
                        muted
                        preload="metadata"
                        style={{ pointerEvents: "none" }} // video ishlamasligi uchun
                      >
                        <source src={post.file} type="video/mp4" />
                      </motion.video>
                    ) : (
                      <motion.img
                        layoutId={`media-${post.id}`} // 🪄 Hero ID
                        src={post.file}
                        alt={post.title}
                      />
                    )}
                  </Link>
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
        <NoPost />
      )}
    </div>
  );
};

export default Posts;