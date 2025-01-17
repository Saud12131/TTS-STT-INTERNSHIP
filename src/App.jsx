import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Ttv from "./pages/ttv";
import Home from "./pages/Home";
import Vtt from "./pages/Vtt";
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