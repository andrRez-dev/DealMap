import Login from "./pages/loginPage";
import Register from "./pages/registerPage";
import Home from "./pages/homePage";
import InfoPage from "./pages/infoPage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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

  return <Home />;
}

export default function App() {
  return (
    <BrowserRouter>
      <main className="w-screen min-h-screen h-screen">
        <Routes>
          <Route path="/" element={<InfoPage />} />
          <Route path="/home" element={<ProtectedAuth />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
