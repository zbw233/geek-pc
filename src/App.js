import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import GeekLayout from "./pages/Layout";
import Login from "@/pages/Login";
import { AutoComponent } from "@/component/AuthComponent";
import Home from "@/pages/Home";
import Article from "@/pages/Article";
import Publish from "@/pages/Publish";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <AutoComponent>
                <GeekLayout />
              </AutoComponent>
            }
          >
            <Route index element={<Home />}></Route>
            <Route path="/Article" element={<Article />}></Route>
            <Route path="/Publish" element={<Publish />}></Route>
          </Route>

          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
