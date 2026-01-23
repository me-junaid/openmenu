
import { Header } from '../components/Header'
import { AdminFooter } from '../components/AdminPage/AdminFooter'
import { AdminContext, AdminProvider } from '../contexts/AdminContext'
import { AdminMain } from '../components/AdminPage/AdminMain'
import { useContext } from 'react'

export const AdminPage = () => {


  return (
    <AdminProvider>
      <Header />
      <div className="fixed top-[50px] bottom-0 left-0 right-0 overflow-y-scroll">
        <AdminMain />
        <AdminFooter />
      </div>
    </AdminProvider>
  )
}
