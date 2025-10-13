import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../navbar/navbar";
import MainSection from "../main-section/main_section";
import Footer from "../footer/footer";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase"

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Firestore'dan ma'lumot olish
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "posts"));
        const postsArray = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postsArray);
      } catch (error) {
        console.error("Xatolik:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <p className="loading">Yuklanmoqda...</p>;

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
