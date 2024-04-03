import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import CreateProduct from "./pages/CreateProduct/CreateProduct";
import EditProduct from "./pages/EditProduct/EditProduct";
import ViewProduct from "./pages/ViewProduct/ViewProduct";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ViewProduct />} />
        <Route path="/create-product" element={<CreateProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
