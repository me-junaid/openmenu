import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import ClientLoginPage from "./pages/ClientLoginPage";
import { ClientPage } from "./pages/ClientPage";
import { HomePage } from "./pages/HomePage";
import { WaiterPage } from "./pages/WaiterPage";
import { AdminPage } from "./pages/AdminPage";

function App() {
  // Explicitly set light theme once when App mounts
  useEffect(() => {
    document.documentElement.classList.toggle('dark') // FORCE LIGHT
  }, []);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/order" element={<WaiterPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/*" element={<HomePage />} />
    </Routes>
  );
}

export default App;
