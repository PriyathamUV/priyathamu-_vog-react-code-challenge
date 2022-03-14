import './App.css';
import { Route, Routes } from "react-router-dom"
import PostalLookup from "./pages/PostalLookup/PostalLookup"
import Universities from "./pages/Universities/Universities"
import Home from "./pages/Home/Home"
import Header from "./pages/Header/Header"

function App() {

  return (
    <div className="App">
    <Header />
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/postal-lookup" element={<PostalLookup />} />
      <Route exact path="/universities" element={<Universities />} />
    </Routes>
  </div>
  );
}

export default App;
