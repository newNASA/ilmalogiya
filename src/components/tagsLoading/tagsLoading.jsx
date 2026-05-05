import "./tagsLoading.scss"

const Test = ({ count }) => {
    return (
        <div className="tags-loading">
            {[...Array(count)].map((_, i) => (
                <span key={i} className="text-loader"></span>
            ))}
        </div>
    )
}

export default Test;