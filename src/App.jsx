import { Route, Routes } from "react-router-dom"
import ClientLoginPage from "./pages/ClientLoginPage"
import { ClientPage } from "./pages/ClientPage"
import { HomePage } from "./pages/HomePage"
import ScanPage from "./pages/ScanPage"
import { WaiterPage } from "./pages/WaiterPage"

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin" element={<ScanPage />} />
      <Route path="/order" element={<WaiterPage />} />
      <Route path="/*" element={<HomePage />} />
    </Routes>
  )
}


export default App