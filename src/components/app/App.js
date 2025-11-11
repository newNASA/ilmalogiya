import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import ReactGA from "react-ga4";
import Navbar from "../navbar/navbar";
import MainSection from "../main-section/main_section";
import Footer from "../footer/footer";
// import PostDetail from "../postDetail/postDetail";

function App() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
  }, [location]);
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