import { createContext, useCallback, useEffect, useState } from "react";
import { getCategoriesWithItems } from "../services/menuService";

export const ItemsContext = createContext();

const USER_ID = "0307bc68-5818-4b0c-9e5b-b0c56aaea4fc";

export const ItemsProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);

  const [openCart, setOpenCart] = useState(false);
  const [orderSelection, setOrderSelection] = useState(false);
  const [confirmOrder, setConfirmOrder] = useState(false);
  const [openProductInfo, setOpenProductInfo] = useState(false);

  const [selectedItemDetails, setSelectedItemDetails] = useState({
    name: "",
    price: "",
  });

  /* ---------------- FETCH MENU FROM DB ---------------- */
  useEffect(() => {
    async function loadMenu() {
      try {
        const categories = await getCategoriesWithItems(USER_ID);

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
      } catch (err) {
        console.error("Menu fetch failed", err);
      }
    }

    loadMenu();
  }, []);

  /* ---------------- SORT ITEMS AFTER ORDER ---------------- */
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

  /* ---------------- CART STATE ---------------- */
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

  /* ---------------- HELPERS ---------------- */
  const updateOpenCart = () => setOpenCart((v) => !v);
  const updateOrderSelection = () => setOrderSelection((v) => !v);
  const updateConfirmOrder = () => setConfirmOrder(true);

  const getCategoryIndexById = (categoryId) =>
    user?.categories.findIndex((c) => c.id === categoryId) ?? 0;

  const handleSelect = useCallback((index) => {
    setSelectedCategory(index);

    const container = document.getElementById(
      "category-scroll-container"
    );
    const el = document.getElementById(`cat-item-${index}`);

    if (!container || !el) return;

    const containerWidth = container.offsetWidth;
    const elementWidth = el.offsetWidth;

    const scrollPosition =
      el.offsetLeft -
      containerWidth / 2 +
      elementWidth / 2;

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
