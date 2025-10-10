import "./main_section.scss";
import { useParams } from "react-router-dom";
import { useState, useMemo } from "react";
import Tags from "../tags/tags";
import Posts from "../posts/posts";
import RightPosts from "../rightPosts/rightposts";
import Pagination from "../pagination/pagination";
import PostDetail from "../postDetail/postDetail";

const MainSection = ({ posts, isDetailPage }) => {
  const { id } = useParams();
  const [selectedTag, setSelectedTag] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const filteredPosts =
    selectedTag === "all" ? posts : posts.filter((p) => p.tags.includes(selectedTag));

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const handleTagChange = (tag) => {
    setSelectedTag(tag);
    setCurrentPage(1);
  };

  const randomPost = useMemo(
    () => posts[Math.floor(Math.random() * posts.length)],
    [posts]
  );
  const lastPost = posts[posts.length - 1];

  const selectedPost = posts.find((p) => p.id === Number(id));

  return (
    <section className="main-section">
      <div className="left">
        {isDetailPage && selectedPost ? (
          <PostDetail post={selectedPost} />
        ) : (
          <>
            <Tags selectedTag={selectedTag} setSelectedTag={handleTagChange} />
            <Posts posts={currentPosts} />
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
      <div className="right">
        <RightPosts randomPost={randomPost} lastPost={lastPost} />
      </div>
    </section>
  );
};

export default MainSection;
