import "./postloading.scss";
import "../posts/posts.scss";
import TagsLoading from "../tagsLoading/tagsLoading.jsx";
import { Link } from "react-router-dom";

const postloading = () => {
    return (
        <div className="postloading posts">
            {[...Array(10)].map((_, i) => (
                <div className="postloading-item post_item">
                    <div className="post_left">
                        <div className="img"></div>
                    </div>
                    <div className="post_right">
                        <TagsLoading count={3} />
                        <div className="post_text">
                            <Link to="" className="h1"></Link>
                            <p></p>
                            <p></p>
                            <p></p>
                        </div>
                        <div className="post_link">
                            <Link to="" className="link"></Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default postloading;