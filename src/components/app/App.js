import { BrowserRouter as Router } from "react-router-dom";

import Navbar from "../navbar/navbar";
import MainSection from "../main-section/main_section";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <MainSection />
      </div>
    </Router>
  );
}

export default App;
