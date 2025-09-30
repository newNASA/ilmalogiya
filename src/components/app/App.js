import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "../navbar/navbar";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
      </div>
    </Router>
  );
}

export default App;
