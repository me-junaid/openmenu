import { createContext, useCallback, useState } from "react";

export const AdminContext = createContext()

export const AdminProvider = ({ children }) => {

  const adminName = "Muhammed Junaid"
  const [selectedByAdmin, setSelectedByAdmin] = useState(0)

  const [selectedCategoryByAdmin, setSelectedCategoryByAdmin] = useState(0)

  const [canAddCategory, setCanAddCategory] = useState(false)
  const [canAddNewItem, setCanAddNewItem] = useState(true)

  const handleAdminSelect = useCallback((index) => {
    setSelectedByAdmin(index)
  }, [])

  const handleSelectedCategoryByAdmin = useCallback((index) => {
    setSelectedCategoryByAdmin(index)
  }, [])

  return (
    <AdminContext.Provider value={{ adminName, selectedByAdmin, handleAdminSelect, selectedCategoryByAdmin, handleSelectedCategoryByAdmin, canAddCategory, setCanAddCategory, canAddNewItem, setCanAddNewItem }}>
      {children}
    </AdminContext.Provider>
  )
}
