import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../navbar/navbar";
import MainSection from "../main-section/main_section";
import Footer from "../footer/footer";

import { useMemo } from "react";
import image1 from "../../assets/post_imgs/i.png";
import image2 from "../../assets/post_imgs/image.png";

function App() {
  const posts = useMemo(
    () => [
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
    ],
    []
  );

  return (
    <Router>
      <Navbar posts={posts} />
      <Routes>
        <Route path="/" element={<MainSection posts={posts} />} />
        <Route path="/posts/:id" element={<MainSection posts={posts} isDetailPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
