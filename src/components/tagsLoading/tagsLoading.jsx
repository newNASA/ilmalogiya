import "./tagsLoading.scss"

const Test = () => {
    return (
        <div className="tags-loading">
            {[...Array(5)].map((_, i) => (
                <span key={i} class="text-loader"></span>
            ))}
        </div>
    )
}

export default Test;