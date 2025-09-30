import "./main_section.scss";

import { useState } from "react";
import Tags from "../tags/tags";
import Posts from "../posts/posts";

const MainSection = () => {
    const [selectedTag, setSelectedTag] = useState("all");

    const posts = [
        { id: 1, title: "React Tutorial", tags: ["react", "javascript"] },
        { id: 2, title: "Node.js Guide", tags: ["node", "backend"] },
        { id: 3, title: "SCSS Tricks", tags: ["css", "frontend"] },
    ];

    const filteredPosts =
        selectedTag === "all"
            ? posts
            : posts.filter((post) => post.tags.includes(selectedTag));

    return (
        <section className="main-section">
            <div className="left">
                <Tags setSelectedTag={setSelectedTag} />
                <Posts posts={filteredPosts} />
            </div>
            <div className="right"></div>
        </section>
    );
}

export default MainSection;