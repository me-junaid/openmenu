
import { Header } from '../components/Header'
import { AdminFooter } from '../components/AdminPage/AdminFooter'
import { AdminContext, AdminProvider } from '../contexts/AdminContext'
import { AdminMain } from '../components/AdminPage/AdminMain'
import { useContext } from 'react'

export const AdminPage = () => {


  return (
    <AdminProvider>
      <Header />
      <AdminMain />
      <AdminFooter />
    </AdminProvider>
  )
}
