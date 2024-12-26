import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Component/Home";
import SingleProduct from "./Component/SingleProduct";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/:id" element={<SingleProduct/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
