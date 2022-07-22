import {
  unstable_HistoryRouter as HistoryRouter,
  Route,
  Routes,
} from "react-router-dom";
import { AutoComponent } from "@/component/AuthComponent";
import { history } from "./utils";
import { lazy, Suspense } from "react";
// 按需导入路由组件
const Login = lazy(() => import("./pages/Login"));
const GeekLayout = lazy(() => import("./pages/Layout"));
const Home = lazy(() => import("./pages/Home"));
const Article = lazy(() => import("./pages/Article"));
const Publish = lazy(() => import("./pages/Publish"));

function App() {
  return (
    <HistoryRouter history={history}>
      <div className="App">
        <Suspense
          fallback={
            <div
              style={{
                textAlign: "center",
                marginTop: 200,
              }}
            >
              loading...
            </div>
          }
        >
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
        </Suspense>
      </div>
    </HistoryRouter>
  );
}

export default App;
