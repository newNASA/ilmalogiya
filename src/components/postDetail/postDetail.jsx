import { Link } from "react-router-dom";
import "./postDetail.scss";

const PostDetail = ({ post }) => {
    if (!post) return <p>Post topilmadi 😕</p>;

    return (
        <div className="post-detail">
            {post.img && <div className="post-img">
                <img src={post.img} alt={post.title} />
                <span></span>
            </div>}
            <h1>{post.title}</h1>
            <p>{post.description}</p>
            <div className="tags">
                {post.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                ))}
            </div>
            <Link to="/" className="back-btn">⬅ Bosh sahifaga</Link>
        </div>
    );
};

export default PostDetail;
