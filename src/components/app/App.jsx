import { useEffect } from "react";
import { useLocation, Routes, Route } from "react-router-dom";
import ReactGA from "react-ga4";
import Navbar from "../navbar/navbar";
import MainSection from "../main-section/main_section";
import Footer from "../footer/footer";
import Quotes from "../quotes/quotes";
import Author from "../quotes/elements/author";
import SingleQuote from "../quotes/elements/SingleQuote";

function App() {
  const location = useLocation();

  useEffect(() => {
    ReactGA.event("page_view", {
      page_path: location.pathname + location.search,
      page_title: document.title,
    });
  }, [location]);

  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/*" element={<MainSection />} />
        <Route path="/posts/:slug" element={<MainSection />} />
        <Route path="/quotes" element={<Quotes />} />
        <Route path="/quotes/author/:slug" element={<Author />} />
        <Route path="/quotes/:slug" element={<Quotes />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;