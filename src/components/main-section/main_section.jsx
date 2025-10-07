import "./main_section.scss";
import { useState } from "react";
import Tags from "../tags/tags";
import Posts from "../posts/posts";
import RightPosts from "../rightPosts/rightposts";
import Pagination from "../pagination/pagination"; // ✅ import qildik

import image1 from "../../assets/post_imgs/i.png";
import image2 from "../../assets/post_imgs/image.png";

const MainSection = () => {
  const [selectedTag, setSelectedTag] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10; 

  const posts = [
    { id: 1, img: image1, title: "React Tutorial", description: "Birinchi sichqonchani Daglas Engelbart ismli amerikalik olim ixtiro qilgan.", tags: ["react", "javascript"] },
    { id: 2, img: image2, title: "Node.js Guide", description: "Lorem ipsum dolor sit amet.", tags: ["node", "backend"] },
    { id: 3, title: "SCSS Tricks", description: "Lorem ipsum dolor sit amet.", tags: ["css", "frontend"] },
    { id: 4, title: "Next.js Best Practices", description: "Lorem ipsum dolor sit amet.", tags: ["react", "frontend"] },
    { id: 5, title: "MongoDB Deep Dive", description: "Lorem ipsum dolor sit amet.", tags: ["backend", "database"] },
    { id: 6, title: "JavaScript Tips", description: "Lorem ipsum dolor sit amet.", tags: ["javascript", "frontend"] },
    { id: 7, title: "Express Setup", description: "Lorem ipsum dolor sit amet.", tags: ["node", "backend"] },
    { id: 8, title: "HTML5 Features", description: "Lorem ipsum dolor sit amet.", tags: ["frontend", "html"] },
    { id: 9, title: "TypeScript Basics", description: "Lorem ipsum dolor sit amet.", tags: ["typescript", "frontend"] },
    { id: 10, title: "Database Indexing", description: "Lorem ipsum dolor sit amet.", tags: ["database", "backend"] },
    { id: 11, title: "React Hooks Guide", description: "Lorem ipsum dolor sit amet.", tags: ["react", "javascript"] },
    { id: 12, title: "API Security", description: "Lorem ipsum dolor sit amet.", tags: ["backend", "security"] },
  ];

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

  const randomPost = posts[Math.floor(Math.random() * posts.length)];
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
