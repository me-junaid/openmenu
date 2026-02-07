import { createContext, useCallback, useEffect, useState } from "react";
import { getCategoriesWithItems } from "../services/menuService";
import { supabase } from "../config/supabase";

export const ItemsContext = createContext(null);

export const ItemsProvider = ({ children }) => {
  const [USER_ID, setUSER_ID] = useState(null);
  const [user, setUser] = useState(null);

  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);

  const [openCart, setOpenCart] = useState(false);
  const [orderSelection, setOrderSelection] = useState(false);
  const [confirmOrder, setConfirmOrder] = useState(false);
  const [openProductInfo, setOpenProductInfo] = useState(false);

  const dummyData = {
    name: "Eatmosphere",
    categories: [
      {
        id: 1,
        name: "Hot Drinks",
        items: [
          { name: "Tea", price: 12, img: "", selectionCount: 0 },
          { name: "Black Tea", price: 15, img: "", selectionCount: 0 },
        ],
      },
      {
        id: 2,
        name: "Cold Drinks",
        items: [
          { name: "Cold Coffee", price: 80, img: "", selectionCount: 0 },
        ],
      },
    ],
  };

  const [selectedItemDetails, setSelectedItemDetails] = useState({
    name: "",
    price: "",
  });

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

      setUSER_ID(user.id);
    };

    fetchUser();
  }, []);

  /* ---------------- FETCH MENU ---------------- */
  useEffect(() => {
    if (!USER_ID) return;

    const loadMenu = async () => {
      try {
        const categories = await getCategoriesWithItems(USER_ID);

        if (categories.length === 0) {
          setUser({
            name: "Eatmosphere",
            categories: [
              {
                id: 1,
                name: "Hot Drinks",
                items: [
                  { name: "Tea", price: 12, img: "", selectionCount: 0 },
                  { name: "Black Tea", price: 15, img: "", selectionCount: 0 },
                ],
              },
              {
                id: 2,
                name: "Cold Drinks",
                items: [
                  { name: "Cold Coffee", price: 80, img: "", selectionCount: 0 },
                ],
              },
            ],
          });
        } else {
          setUser({
            name: "Eatmosphere",
            categories: categories.map((cat) => ({
              id: cat.id,
              name: cat.name,
              items: cat.items.map((item) => ({
                name: item.name,
                price: item.price,
                img: item.img || "",
                selectionCount: item.selection_count ?? 0,
              })),
            })),
          });
        }
      } catch (err) {
        console.error("Menu fetch failed", err);

        // fallback demo data
        setUser({
          name: "Eatmosphere",
          categories: [
            {
              id: 1,
              name: "Hot Drinks",
              items: [
                { name: "Tea", price: 12, img: "", selectionCount: 0 },
                { name: "Black Tea", price: 15, img: "", selectionCount: 0 },
              ],
            },
            {
              id: 2,
              name: "Cold Drinks",
              items: [
                { name: "Cold Coffee", price: 80, img: "", selectionCount: 0 },
              ],
            },
          ],
        });
      }
    };

    loadMenu();
  }, [USER_ID]);

  /* ---------------- SORT BY SELECTION ---------------- */
  useEffect(() => {
    if (!user) return;

    setUser((prev) => ({
      ...prev,
      categories: prev.categories.map((cat) => ({
        ...cat,
        items: [...cat.items].sort(
          (a, b) => b.selectionCount - a.selectionCount
        ),
      })),
    }));
  }, [orderSelection]);

  /* ---------------- UPDATE ITEM COUNT ---------------- */
  const updateSelectionCount = (categoryId, itemName, type = "increment") => {
    setUser((prev) => {
      if (!prev) return prev;

      let updatedItem = null;

      const updatedCategories = prev.categories.map((category) =>
        category.id === categoryId
          ? {
            ...category,
            items: category.items.map((item) => {
              if (item.name === itemName) {
                const newCount =
                  type === "increment"
                    ? item.selectionCount + 1
                    : Math.max(item.selectionCount - 1, 0);

                updatedItem = { ...item, selectionCount: newCount };
                return updatedItem;
              }
              return item;
            }),
          }
          : category
      );

      if (updatedItem) {
        updateSelectedItems(categoryId, updatedItem);
      }

      return { ...prev, categories: updatedCategories };
    });
  };

  const updateSelectedItems = (categoryId, item) => {
    setSelectedItems((prev) => {
      const existing = prev.find(
        (i) => i.name === item.name && i.categoryId === categoryId
      );

      if (item.selectionCount === 0) {
        return prev.filter(
          (i) => !(i.name === item.name && i.categoryId === categoryId)
        );
      }

      if (existing) {
        return prev.map((i) =>
          i.name === item.name && i.categoryId === categoryId
            ? { ...i, quantity: item.selectionCount }
            : i
        );
      }

      return [
        ...prev,
        {
          categoryId,
          name: item.name,
          price: item.price,
          quantity: item.selectionCount,
          img: item.img,
        },
      ];
    });
  };

  /* ---------------- UI HELPERS ---------------- */
  const updateOpenCart = () => setOpenCart((v) => !v);
  const updateOrderSelection = () => setOrderSelection((v) => !v);
  const updateConfirmOrder = () => setConfirmOrder(true);

  const getCategoryIndexById = (categoryId) =>
    user?.categories.findIndex((c) => c.id === categoryId) ?? 0;

  const handleSelect = useCallback((index) => {
    setSelectedCategory(index);

    const container = document.getElementById("category-scroll-container");
    const el = document.getElementById(`cat-item-${index}`);

    if (!container || !el) return;

    const scrollPosition =
      el.offsetLeft -
      container.offsetWidth / 2 +
      el.offsetWidth / 2;

    container.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });
  }, []);

  if (!user) return null;

  return (
    <ItemsContext.Provider
      value={{
        user,
        selectedCategory,
        setSelectedCategory,
        updateSelectionCount,
        selectedItems,
        openCart,
        updateOpenCart,
        orderSelection,
        updateOrderSelection,
        confirmOrder,
        updateConfirmOrder,
        handleSelect,
        getCategoryIndexById,
        selectedItemDetails,
        setSelectedItemDetails,
        openProductInfo,
        setOpenProductInfo,
      }}
    >
      {children}
    </ItemsContext.Provider>
  );
};
