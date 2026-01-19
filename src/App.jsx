import { Route, Routes } from "react-router-dom"
import ClientLoginPage from "./pages/ClientLoginPage"
import { ClientPage } from "./pages/ClientPage"
import { HomePage } from "./pages/HomePage"

function App() {

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin" element={<ClientLoginPage />} />
      <Route path="/*" element={<HomePage />} />
    </Routes>
  )
}


export default App