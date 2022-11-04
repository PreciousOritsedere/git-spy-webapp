import Navbar from "./Components/Navbar.jsx";
import {Home, RepoDetails, PageNotFound, ErrorTest} from "./Pages";
import { Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/repo/:reponame" element={<RepoDetails />} />
        </Route>
        <Route path="/errortest" element={<ErrorTest />} />
        <Route path="*" element={<PageNotFound/>} />
        <Route path="/notfound" element={<PageNotFound/>} />
      </Routes>
    </div>
  );
}

export default App;
