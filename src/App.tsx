import React from "react";
import { useNavigate, useLocation, Routes, Route, NavigateFunction } from "react-router-dom";

import useToken from "./Hooks/useToken";

import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";

import "./App.scss";

const App: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const { pathname }: { pathname: string } = useLocation();

  const [token] = useToken();

  React.useEffect(() => {
    if (!token && pathname !== "/register" && pathname !== "/login") navigate("/login");
  }, [token, navigate, pathname]);

  return (
    <div className="app">
      <Routes>
        <Route path={"/login"} element={<Login />} />
        <Route path={"/register"} element={<Register />} />
      </Routes>
    </div>
  );
};

export default App;
