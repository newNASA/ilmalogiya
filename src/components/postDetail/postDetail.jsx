import { Link } from "react-router-dom";
import { useEffect } from "react";
import { MdOutlineDateRange } from "react-icons/md";
import { FaRegEdit, FaRegEye } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import "./postDetail.scss";

const PostDetail = ({ post }) => {
    useEffect(() => {
        if (post) {
            document.title = `${post.title} | Ilmalogiya`;
        } else {
            document.title = "Post topilmadi | Ilmalogiya";
        }

        return () => {
            document.title = "Ilmalogiya";
        };
    }, [post]);

    if (!post) return <p>Post topilmadi 😕</p>;

    const formatDateTime = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        const formatted = date.toISOString().slice(0, 16).replace("T", " ");
        return formatted;
    };

    return (
        <div className="post-detail shadow-elegant">
            {post.file && (
                <div className="post-img">
                    <img src={post.file} alt={post.title} />
                    {post.imgdesc && <span>{post.imgdesc}</span>}
                </div>
            )}

            <div className="post_tags">
                {post.tags.map((tag) => (
                    <button key={tag} className="">
                        {tag}
                    </button>
                ))}
            </div>

            <div className="post-title">
                <h1>{post.title}</h1>
            </div>

            <div className="post-date">
                <p className="published">
                    <MdOutlineDateRange /> Joylangan: {formatDateTime(post.publishedDate)}
                </p>

                {new Date(post.publishedDate).getTime() !== new Date(post.modifiedDate).getTime() && (
                    <p className="modified">
                        <FaRegEdit /> O'zgartirilgan: {formatDateTime(post.modifiedDate)}
                    </p>
                )}

                <p className="views">
                    <FaRegEye /> {post.views}
                </p>
            </div>

            <div
                className="post-description"
                dangerouslySetInnerHTML={{ __html: post.description }}
            />

            <Link to="/" className="back-btn">
                <FaArrowLeftLong /> Bosh sahifaga
            </Link>
        </div>
    );
};

export default PostDetail;
