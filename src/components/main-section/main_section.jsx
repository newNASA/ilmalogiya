import "./main_section.scss";

import { useState } from "react";
import Tags from "../tags/tags";
import Posts from "../posts/posts";

import image1 from "../../assets/post_imgs/i.png"
import image2 from "../../assets/post_imgs/image.png"

const MainSection = () => {
    const [selectedTag, setSelectedTag] = useState("all");

    const posts = [
        { id: 1, img: image1, title: "React Tutorial", description: "Birinchi sichqonchani Daglas Engelbart ismli amerikalik olim ixtiro qilgan. U yog‘ochdan yasalgan va faqat bitta tugmasi bor edi. ", tags: ["react", "javascript"] },
        { id: 2, img: image2, title: "Node.js Guide", description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus recusandae deleniti earum harum sunt pariatur tempora iusto aliquam omnis, enim nihil vitae. Repellat, tempora ex reiciendis distinctio voluptatibus veniam saepe consequatur, omnis dolorem eveniet harum cumque fugit similique atque ratione dignissimos dolore possimus deserunt quia ad veritatis quaerat labore animi!", tags: ["node", "backend"] },
        { id: 3, title: "SCSS Tricks", description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus recusandae deleniti earum harum sunt pariatur tempora iusto aliquam omnis, enim nihil vitae. Repellat, tempora ex reiciendis distinctio voluptatibus veniam saepe consequatur, omnis dolorem eveniet harum cumque fugit similique atque ratione dignissimos dolore possimus deserunt quia ad veritatis quaerat labore animi!", tags: ["css", "frontend"] },
    ];

    const filteredPosts =
        selectedTag === "all"
            ? posts
            : posts.filter((post) => post.tags.includes(selectedTag));

    return (
        <section className="main-section">
            <div className="left">
                <Tags selectedTag={selectedTag} setSelectedTag={setSelectedTag} />
                <Posts posts={filteredPosts} />
            </div>
            <div className="right"></div>
        </section>
    );
}

export default MainSection;