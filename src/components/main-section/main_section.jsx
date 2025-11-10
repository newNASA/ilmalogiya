// components/main-section/main_section.jsx
import { useState, useEffect, useCallback, memo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSidebarData } from "../../hooks/useSideBarData";
import { usePostsQuery } from "../../hooks/usePostsQuery";
import { useGetOneQuery } from "../../hooks/useGetOneQuery";
import "./main_section.scss";
import Tags from "../tags/tags";
import Posts from "../posts/posts";
import PostDetail from "../postDetail/postDetail";
import Pagination from "../pagination/pagination";
import RightPosts from "../rightPosts/rightposts";
import Loader from "../loader/loader";

const MemoizedTags = memo(Tags);
const MemoizedRightPosts = memo(RightPosts);

const MainSection = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");

  // Postlar
  const { posts: allPosts, error: postsError, pagination } = usePostsQuery(
    currentPage,
    searchQuery,
    "all"
  );

  const { post: detailedPost, loading: detailLoading, error: detailError } = useGetOneQuery(id);

  const { randomPost, lastPost, loading, error } = useSidebarData();

  const handleTagChange = useCallback((tag) => {
    setSelectedTag(tag);
    setCurrentPage(1);
    navigate("/"); // Bosh sahifaga
  }, [navigate]);

  useEffect(() => {
    const handleSearch = () => {
      setSearchQuery(localStorage.getItem("searchQuery") || "");
      setCurrentPage(1);
    };
    window.addEventListener("searchChanged", handleSearch);
    return () => window.removeEventListener("searchChanged", handleSearch);
  }, []);

  // Loading

  if (postsError) return <div className="error">Xatolik: {postsError}</div>;

  return (
    <section className="main-section">
      <div className="left">

        {id ? (
          detailLoading ? (
            <Loader />
          ) : detailError ? (
            <div className="error">{detailError}</div>
          ) : detailedPost ? (
            <PostDetail post={detailedPost} />
          ) : (
            <p>Post topilmadi</p>
          )
        ) : (
          <>
            <MemoizedTags selectedTag={selectedTag} onTagChange={handleTagChange} />
            <Posts
              allPosts={allPosts}
              selectedTag={selectedTag}
              searchQuery={searchQuery}
              handleTagClick={handleTagChange}
            />
            <Pagination
              pagination={pagination}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>

      <div className="right">
        {error ? (
          <div className="error p-4 bg-red-100 text-red-700 rounded">
            <strong>Sidebar xato:</strong> {error}
            <br />
            <small>Backendda /posts/random/ yoki /posts/latest/ ishlamayapti</small>
          </div>
        ) : loading ? (
          <div className="text-center py-8">Yuklanmoqda...</div>
        ) : (
          <MemoizedRightPosts randomPost={randomPost} lastPost={lastPost} />
        )}
      </div>
    </section>
  );
};

export default MainSection;