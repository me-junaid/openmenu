import React, { useContext } from 'react'
import { CategoryFeed } from '../HomePage/CategoryFeed'
import { ItemFeed } from '../HomePage/ItemFeed'
import { PromoBanner } from '../HomePage/PromoBanner'
import { ItemsProvider } from '../../contexts/ItemsContext'
import { AdminContext, AdminProvider } from '../../contexts/AdminContext'
import { ManageCatergory } from './ManageCatergory'

export const AdminMain = () => {

  const { selectedByAdmin } = useContext(AdminContext)

  if (selectedByAdmin === 0) { // Restaurant
    return (
      <ItemsProvider>
        <div className="h-10"></div>
        <PromoBanner />
        <ItemFeed admin={true} />
        <CategoryFeed admin={true} />
      </ItemsProvider>
    )
  }

  if (selectedByAdmin === 1) { // Menu
    return (
      <AdminProvider>
        <ItemsProvider>
          <ManageCatergory />
        </ItemsProvider>
      </AdminProvider>
    )
  }


}
