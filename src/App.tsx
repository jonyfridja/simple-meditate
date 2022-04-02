import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/Home/Home";
import { PresetsPage } from "./pages/PresetsPage/PresetsPage";

function Header() {
  return (
    <nav
      style={{
        borderBottom: "solid 1px",
        paddingBottom: "1rem",
      }}
    >
      <Link to="/">Home</Link> |{" "}
      <Link to="/presets">Presets</Link>
    </nav>
  );
}
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="presets" element={<PresetsPage />} />
      {/* <Route path="meditate/:id" element={<MeditatePage />} /> */}
    </Routes>
    </div>
  );
}

export default App;
