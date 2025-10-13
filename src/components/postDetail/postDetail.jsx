import { Link } from "react-router-dom";
import { useEffect } from "react";
import { MdOutlineDateRange } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";

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

    return (
        <div className="post-detail shadow-elegant">
            {post.img && (
                <div className="post-img">
                    <img src={post.img} alt={post.title} />
                    {post.imgdesc && <span>{post.imgdesc}</span>}
                </div>
            )}
            <div className="post_tags">
                {post.tags.map((tag) => (
                    <button key={tag} className="">{tag}</button>
                ))}
            </div>
            <div className="post-title">
                <h1>{post.title}</h1>
            </div>
            <div className="post-date">
                <p className="published"><MdOutlineDateRange />Joylangan: {post.publishedDate}</p>
                {post.modifiedDate && <p className="modified"><FaRegEdit />O'zgartirilgan: {post.modifiedDate}</p>}
                <p className="views"><FaRegEye />{post.views}</p>
            </div>
            <p>{post.description}</p>

            <Link to="/" className="back-btn">
                ⬅ Bosh sahifaga
            </Link>
        </div>
    );
};

export default PostDetail;