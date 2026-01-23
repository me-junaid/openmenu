import { createContext, useCallback, useState } from "react";

export const ItemsContext = createContext();

export const ItemsProvider = ({ children }) => {

  const initialData = {
    categories: [
      {
        id: 1,
        name: "Hot Drinks",
        items: [
          { name: "Tea", price: 12, img: "", selectionCount: 0 },
          { name: "Black Tea", price: 15, img: "", selectionCount: 0 },
          { name: "Masala Tea", price: 18, img: "", selectionCount: 0 },
          { name: "Coffee", price: 15, img: "", selectionCount: 0 },
          { name: "Filter Coffee", price: 20, img: "", selectionCount: 0 },
          { name: "Boost", price: 150, img: "", selectionCount: 0 },
          { name: "Horlicks", price: 140, img: "", selectionCount: 0 },
          { name: "Hot Chocolate", price: 120, img: "", selectionCount: 0 },
        ],
      },

      {
        id: 2,
        name: "Cold Drinks",
        items: [
          { name: "Cold Coffee", price: 80, img: "", selectionCount: 0 },
          { name: "Iced Tea", price: 70, img: "", selectionCount: 0 },
          { name: "Lemon Soda", price: 60, img: "", selectionCount: 0 },
          { name: "Mint Lime", price: 65, img: "", selectionCount: 0 },
          { name: "Chocolate Milkshake", price: 120, img: "", selectionCount: 0 },
          { name: "Vanilla Milkshake", price: 110, img: "", selectionCount: 0 },
        ],
      },

      {
        id: 3,
        name: "Snacks",
        items: [
          { name: "Payampori", price: 10, img: "", selectionCount: 0 },
          { name: "Elanji", price: 15, img: "", selectionCount: 0 },
          { name: "Cutlet", price: 15, img: "", selectionCount: 0 },
          { name: "Veg Roll", price: 20, img: "", selectionCount: 0 },
          { name: "Chicken Roll", price: 25, img: "", selectionCount: 0 },
          { name: "Samosa", price: 12, img: "", selectionCount: 0 },
          { name: "Pazham Pori", price: 12, img: "", selectionCount: 0 },
          { name: "Bread Pakoda", price: 18, img: "", selectionCount: 0 },
        ],
      },

      {
        id: 4,
        name: "Fast Food",
        items: [
          { name: "Veg Sandwich", price: 40, img: "", selectionCount: 0 },
          { name: "Egg Sandwich", price: 50, img: "", selectionCount: 0 },
          { name: "Chicken Sandwich", price: 70, img: "", selectionCount: 0 },
          { name: "Veg Burger", price: 60, img: "", selectionCount: 0 },
          { name: "Chicken Burger", price: 90, img: "", selectionCount: 0 },
          { name: "French Fries", price: 70, img: "", selectionCount: 0 },
          { name: "Cheese Fries", price: 90, img: "", selectionCount: 0 },
        ],
      },

      {
        id: 5,
        name: "Juices",
        items: [
          { name: "Musambi Juice", price: 200, img: "", selectionCount: 0 },
          { name: "Lime Juice", price: 60, img: "", selectionCount: 0 },
          { name: "Orange Juice", price: 90, img: "", selectionCount: 0 },
          { name: "Anar Juice", price: 150, img: "", selectionCount: 0 },
          { name: "Watermelon Juice", price: 80, img: "", selectionCount: 0 },
          { name: "Pineapple Juice", price: 90, img: "", selectionCount: 0 },
          { name: "Grape Juice", price: 100, img: "", selectionCount: 0 },
        ],
      },

      {
        id: 6,
        name: "Desserts",
        items: [
          { name: "Gulab Jamun", price: 40, img: "", selectionCount: 0 },
          { name: "Ice Cream Vanilla", price: 60, img: "", selectionCount: 0 },
          { name: "Ice Cream Chocolate", price: 70, img: "", selectionCount: 0 },
          { name: "Brownie", price: 90, img: "", selectionCount: 0 },
          { name: "Brownie with Ice Cream", price: 120, img: "", selectionCount: 0 },
          { name: "Fruit Salad", price: 80, img: "", selectionCount: 0 },
        ],
      },

      {
        id: 7,
        name: "Breakfast",
        items: [
          { name: "Idli (2 pcs)", price: 30, img: "", selectionCount: 0 },
          { name: "Dosa", price: 40, img: "", selectionCount: 0 },
          { name: "Masala Dosa", price: 60, img: "", selectionCount: 0 },
          { name: "Poori Masala", price: 50, img: "", selectionCount: 0 },
          { name: "Upma", price: 35, img: "", selectionCount: 0 },
          { name: "Vada (2 pcs)", price: 30, img: "", selectionCount: 0 },
        ],
      },

      {
        id: 8,
        name: "Meals & Rice",
        items: [
          { name: "Veg Meals", price: 90, img: "", selectionCount: 0 },
          { name: "Chicken Meals", price: 140, img: "", selectionCount: 0 },
          { name: "Fried Rice Veg", price: 120, img: "", selectionCount: 0 },
          { name: "Fried Rice Chicken", price: 150, img: "", selectionCount: 0 },
          { name: "Ghee Rice", price: 110, img: "", selectionCount: 0 },
        ],
      },
      {
        id: 9,
        name: "Hot Drinks",
        items: [
          { name: "Tea", price: 12, img: "", selectionCount: 0 },
          { name: "Black Tea", price: 15, img: "", selectionCount: 0 },
          { name: "Masala Tea", price: 18, img: "", selectionCount: 0 },
          { name: "Coffee", price: 15, img: "", selectionCount: 0 },
          { name: "Filter Coffee", price: 20, img: "", selectionCount: 0 },
          { name: "Boost", price: 150, img: "", selectionCount: 0 },
          { name: "Horlicks", price: 140, img: "", selectionCount: 0 },
          { name: "Hot Chocolate", price: 120, img: "", selectionCount: 0 },
        ],
      },
    ],
  };

  // const sizeInBytes = new Blob([JSON.stringify(initialData)]).size;
  // const sizeInKB = (sizeInBytes / 1024).toFixed(2);

  // console.log(sizeInKB, "KB");


  const [openCart, setOpenCart] = useState(false)
  const [orderSelection, setOrderSelection] = useState(false)
  const [confirmOrder, setConfirmOrder] = useState(false)

  const [selectedItems, setSelectedItems] = useState([])

  const [selectedCategory, setSelectedCategory] = useState(0)

  const [user, setUser] = useState(initialData);

  const updateSelectionCount = (categoryId, itemName, type = "increment") => {
    setUser(prev => {
      let updatedItem = null;

      const updatedCategories = prev.categories.map(category =>
        category.id === categoryId
          ? {
            ...category,
            items: category.items.map(item => {
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

      // 🔥 sync selectedItems
      if (updatedItem) {
        updateSelectedItems(categoryId, updatedItem);
      }

      return { ...prev, categories: updatedCategories };
    });
  };


  const updateSelectedItems = (categoryId, item) => {
    setSelectedItems(prev => {
      const existingItem = prev.find(
        i => i.name === item.name && i.categoryId === categoryId
      );

      // REMOVE if quantity becomes 0
      if (item.selectionCount === 0) {
        return prev.filter(
          i => !(i.name === item.name && i.categoryId === categoryId)
        );
      }

      // UPDATE if item already exists
      if (existingItem) {
        return prev.map(i =>
          i.name === item.name && i.categoryId === categoryId
            ? { ...i, quantity: item.selectionCount }
            : i
        );
      }

      // ADD new item
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

  const updateOpenCart = () => {
    setOpenCart((openCart) ? false : true)
  }

  const updateOrderSelection = () => {
    setOrderSelection((orderSelection) ? false : true)
  }
  const updateConfirmOrder = () => {
    setConfirmOrder(true)
  }

  const handleSelect = useCallback((index) => {
    setSelectedCategory(index);
    // optional: scroll the selected item into view
    const el = document.getElementById(`cat-item-${index}`);
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, []);

  return (
    <ItemsContext.Provider value={{
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
      handleSelect
    }}>
      {children}
    </ItemsContext.Provider>
  );
};
