import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Main from "./components/Main/Main";
import Navbar from "./components/Navbar/Navbar";
import Login from "./components/Login/Login";
import Signup from "./components/Login/Signup";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction, loginAction } from "./store/actions/actions";
import { fetchAllItems } from "./store/actions/actions";
import { refreshAccessToken } from "./components/jwtFunctions";

const PrivateRoute = ({ children }) => {
  const { isAuth } = useSelector((state) => state.user);
  return isAuth ? children : <Navigate to="/login" />;
};

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      const user = JSON.parse(localStorage.getItem("user"));

      if (accessToken && user) {
        dispatch(loginAction(user));
      } else if (refreshToken && user) {
        try {
          const newAccessToken = await refreshAccessToken(refreshToken);
          if (newAccessToken) {
            localStorage.setItem("accessToken", newAccessToken);
            dispatch(loginAction(user));
          } else {
            dispatch(logoutAction());
          }
        } catch (error) {
          console.error("Ошибка обновления токена:", error);
          dispatch(logoutAction());
        }
      } else {
        dispatch(logoutAction());
      }
      setLoading(false);
    };

    initializeAuth();
  }, [dispatch]);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      dispatch(fetchAllItems());
    }
  }, [dispatch]);

  useEffect(() => {
    fetch("https://server-ancient-grass-9030.fly.dev/api/test")
      .then((response) => response.json())
      .then((data) => console.log(data.message))
      .catch((error) => {
        console.error("Ошибка запроса:", error);
      });
  }, []);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <BrowserRouter basename="/ClientSpring/">
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <>
                <Navbar />
                <Main />
              </>
            </PrivateRoute>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
