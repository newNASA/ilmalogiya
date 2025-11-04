import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../navbar/navbar";
import MainSection from "../main-section/main_section";
import Footer from "../footer/footer";
// import PostDetail from "../postDetail/postDetail";

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/*" element={<MainSection />} />
          <Route path="/posts/:id" element={<MainSection />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;