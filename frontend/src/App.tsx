import Login from "./pages/loginPage";
import Register from "./pages/registerPage";
import Main from "./pages/mainPage";
import InfoPage from "./pages/infoPage";

import HomeContent from "./components/mainContent/homeContent";
import SearchContent from "./components/mainContent/searchContent";
import MapContent from "./components/mainContent/mapContent";
import FavoriteContent from "./components/mainContent/favoriteContent";

import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { useEffect, useState } from "react";

function ProtectedAuth() {
  const [status, setStatus] = useState<
    "checking" | "authorized" | "unauthorized" | "error"
  >("checking");

  useEffect(() => {
    async function checkToken() {
      const userToken = localStorage.getItem("client_token");
      const api = import.meta.env.VITE_API_URL;
      const token = import.meta.env.VITE_FRONTEND_TOKEN;

      if (!userToken) {
        setStatus("unauthorized");
        return;
      }

      if (!api || !token) {
        setStatus("error");
        return;
      }

      try {
        const response = await fetch(`${api}/api/user/checkAuth`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
            "X-Client-Token": userToken,
          },
        });

        if (response.status === 401) {
          localStorage.removeItem("client_token");
          setStatus("unauthorized");
        } else if (response.ok) {
          setStatus("authorized");
        } else {
          setStatus("error");
        }
      } catch {
        setStatus("error");
      }
    }

    void checkToken();
  }, []);

  if (status === "checking") return <p>Checking authorization</p>;
  if (status === "unauthorized") return <Navigate to="/login" replace />;
  if (status === "error")
    return <p>Did not succeed to check the authorization</p>;

  return <Outlet />;
}

export default function App() {
  return (
    <BrowserRouter>
      <main className="w-screen min-h-screen h-screen">
        <Routes>
          <Route path="/" element={<InfoPage />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedAuth />}>
            {/* Outlet */}
            <Route path="/main" element={<Main />}>
              {/* default page after login */}
              <Route index element={<Navigate to="home" replace />} />
              <Route path="home" element={<HomeContent />} />
              <Route path="search" element={<SearchContent />} />
              <Route path="map" element={<MapContent />} />
              <Route path="favorites" element={<FavoriteContent />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
