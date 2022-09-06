import React from "react";
import { useNavigate, useLocation, Routes, Route, NavigateFunction } from "react-router-dom";

import useToken from "./Hooks/useToken";

import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Science from "./Pages/Science/Science";
import Direction from "./Pages/Direction/Direction";
import Tests from "./Pages/Test/Test";
import Result from "./Pages/Result/Result";
import Winners from "./Pages/Winners/Winners";

import "./App.scss";

const App: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const { pathname }: { pathname: string } = useLocation();

  const [token] = useToken();

  React.useEffect(() => {
    if (!token && pathname !== "/register" && pathname !== "/") navigate("/login");
  }, [token, navigate, pathname]);

  return (
    <div className="app">
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
        <Route path={"/science"} element={<Science />} />
        <Route path={"/direction"} element={<Direction />} />
        <Route path={"/tests"} element={<Tests />} />
        <Route path={"/result/:resultId"} element={<Result />} />
        <Route path={"/winners"} element={<Winners />} />
      </Routes>
    </div>
  );
};

export default App;
