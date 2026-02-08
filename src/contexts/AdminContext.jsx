import { createContext, useCallback, useEffect, useState } from "react";
import { supabase } from "../config/supabase";

export const AdminContext = createContext()

export const AdminProvider = ({ children }) => {

  const adminName = "Muhammed Junaid"
  const [selectedByAdmin, setSelectedByAdmin] = useState(0)

  const [selectedCategoryByAdmin, setSelectedCategoryByAdmin] = useState(0)

  /* ---------------- AUTH USER ---------------- */
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        console.warn("User not logged in");
        return;
      }

    };

    fetchUser();
  }, []);

  const [canAddCategory, setCanAddCategory] = useState(false)
  const [idOfCategory, setIdOfCategory] = useState(0)
  const [canAddNewItem, setCanAddNewItem] = useState(false)

  const handleAdminSelect = useCallback((index) => {
    setSelectedByAdmin(index)
  }, [])

  const handleSelectedCategoryByAdmin = useCallback((index) => {
    setSelectedCategoryByAdmin(index)
  }, [])

  return (
    <AdminContext.Provider value={{ adminName, selectedByAdmin, handleAdminSelect, selectedCategoryByAdmin, handleSelectedCategoryByAdmin, canAddCategory, setCanAddCategory, canAddNewItem, setCanAddNewItem, idOfCategory, setIdOfCategory }}>
      {children}
    </AdminContext.Provider>
  )
}
