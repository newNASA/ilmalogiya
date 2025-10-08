import "./main_section.scss";
import { useState } from "react";
import Tags from "../tags/tags";
import Posts from "../posts/posts";
import RightPosts from "../rightPosts/rightposts";
import Pagination from "../pagination/pagination";
import { useMemo } from "react";

const MainSection = ({ posts }) => {
  const [selectedTag, setSelectedTag] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10; 

  const filteredPosts =
    selectedTag === "all"
      ? posts
      : posts.filter((post) => post.tags.includes(selectedTag));

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTagChange = (tag) => {
    setSelectedTag(tag);
    setCurrentPage(1);
  };

  const randomPost = useMemo(
    () => posts[Math.floor(Math.random() * posts.length)],
    [posts]
  );
  const lastPost = posts[posts.length - 1];

  return (
    <section className="main-section">
      <div className="left">
        <Tags selectedTag={selectedTag} setSelectedTag={handleTagChange} />
        <Posts posts={currentPosts} />

        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>

      <div className="right">
        <RightPosts randomPost={randomPost} lastPost={lastPost} />
      </div>
    </section>
  );
};

export default MainSection; 