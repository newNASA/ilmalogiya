// import { useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Loader from "../loader/loader"
import Navbar from "../navbar/navbar"
import MainSection from "../main-section/main_section"
import Footer from "../footer/footer"
import { usePostsQuery } from "../../hooks/usePostsQuery"

function App() {
  const { posts, loading, error } = usePostsQuery() 

  if (loading) return <Loader />
  if (error) return <div className="error">Xatolik: {error}</div>

  // useEffect(() => {
  //   window.scrollTo({
  //     top: 0,
  //   behavior: "smooth",
  //   });
  // }, []);

  return (
    <Router>
      <div className="app">
        <Navbar posts={posts} />
        <Routes>
          <Route path="/" element={<MainSection posts={posts} />} />
          <Route
            path="/posts/:id"
            element={<MainSection posts={posts} isDetailPage />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App