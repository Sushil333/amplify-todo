import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import NewArticle from "./pages/NewArticle";
import Existing from "./pages/Existing";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<NewArticle />} />
        <Route path="/existing-aticles" element={<Existing />} />
      </Routes>
    </>
  );
}

export default App;
