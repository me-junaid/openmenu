import { Route, Routes } from "react-router-dom"
import ClientLoginPage from "./pages/ClientLoginPage"
import { ClientPage } from "./pages/ClientPage"
import { HomePage } from "./pages/HomePage"
import ScanPage from "./pages/AdminPage"

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin" element={<ScanPage />} />
      <Route path="/*" element={<HomePage />} />
    </Routes>
  )
}


export default App