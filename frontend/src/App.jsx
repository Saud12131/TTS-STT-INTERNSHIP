import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from "./pages/Home";
import Vtt from "./pages/Vtt";
import Ttv from "./pages/ttv";
function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ttv" element={<Ttv />} />
          <Route path="/vtt" element={<Vtt />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;