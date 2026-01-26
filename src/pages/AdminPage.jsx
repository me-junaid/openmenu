
import { Header } from '../components/Header'
import { AdminFooter } from '../components/AdminPage/AdminFooter'
import { AdminProvider } from '../contexts/AdminContext'
import { AdminMain } from '../components/AdminPage/AdminMain'
import { useContext, useEffect } from 'react'
import { ItemsProvider } from '../contexts/ItemsContext'

export const AdminPage = () => {

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    const systemDefault = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (theme === "dark" || theme !== "light" && systemDefault) {
      document.documentElement.classList.add("dark");
    }

  }, []);

  return (
    <AdminProvider>
      <ItemsProvider>
        <Header />
      </ItemsProvider>
      <div className="fixed top-[50px] bottom-0 left-0 right-0 overflow-y-scroll">
        <AdminMain />
        <AdminFooter />
      </div>
    </AdminProvider>
  )
}
