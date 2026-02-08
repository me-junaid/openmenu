import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { getCategoriesWithItems } from "../services/menuService";

export const ItemsContext = createContext(null);

const USER_ID = "c01e4c2e-d091-44b2-9a21-43d3b338fc40";

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

export const ItemsProvider = ({ children }) => {
  console.log("ItemsProvider render");

  /* ---------------- CORE STATE ---------------- */
  const [user, setUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);

  /* ---------------- UI STATE ---------------- */
  const [openCart, setOpenCart] = useState(false);
  const [orderSelection, setOrderSelection] = useState(false);
  const [confirmOrder, setConfirmOrder] = useState(false);
  const [openProductInfo, setOpenProductInfo] = useState(false);

  const [selectedItemDetails, setSelectedItemDetails] = useState({
    name: "",
    price: "",
  });

  /* ---------------- FETCH MENU (SAFE) ---------------- */
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (!USER_ID) return;
    if (fetchedRef.current) return;

    fetchedRef.current = true;

    const loadMenu = async () => {
      try {
        const categories = await getCategoriesWithItems(USER_ID);

        if (!categories || categories.length === 0) {
          setUser(dummyData);
          return;
        }

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
        setUser(dummyData);
      }
    };

    loadMenu();
  }, []);

  /* ---------------- DERIVED SORT (NO MUTATION) ---------------- */
  const sortedCategories = useMemo(() => {
    if (!user) return [];

    if (!orderSelection) return user.categories;

    return user.categories.map((cat) => ({
      ...cat,
      items: [...cat.items].sort(
        (a, b) => b.selectionCount - a.selectionCount
      ),
    }));
  }, [user, orderSelection]);

  /* ---------------- UPDATE ITEM COUNT ---------------- */
  const updateSelectionCount = useCallback(
    (categoryId, itemName, type = "increment") => {
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
    },
    []
  );

  /* ---------------- CART LOGIC ---------------- */
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
    sortedCategories.findIndex((c) => c.id === categoryId) ?? 0;

  /* ---------------- CONTEXT VALUE (MEMOIZED) ---------------- */
  const value = useMemo(
    () => ({
      user: user ? { ...user, categories: sortedCategories } : null,
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
      getCategoryIndexById,
      selectedItemDetails,
      setSelectedItemDetails,
      openProductInfo,
      setOpenProductInfo,
    }),
    [
      user,
      sortedCategories,
      selectedCategory,
      selectedItems,
      openCart,
      orderSelection,
      confirmOrder,
      selectedItemDetails,
      openProductInfo,
    ]
  );

  if (!user) return null;

  return (
    <ItemsContext.Provider value={value}>
      {children}
    </ItemsContext.Provider>
  );
};
