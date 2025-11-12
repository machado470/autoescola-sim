import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Categoria from "../pages/categoria/Categoria";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categoria" element={<Categoria />} />
      </Routes>
    </BrowserRouter>
  );
}
