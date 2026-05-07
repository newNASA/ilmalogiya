import "./elements.scss";
import TagsLoading from "../../tagsLoading/tagsLoading";

function SingleQuoteLoading() {
    return (
        <div className="single-quote-loading">
            <div className="author-img loading-placeholder"></div>
            <TagsLoading count={3} />

            <div className="quote-content">
                <p></p>
                <p></p>
                <p></p>
            </div>

            <div className="author-name loading-placeholder"></div>
        </div>
    );
}

export default SingleQuoteLoading;