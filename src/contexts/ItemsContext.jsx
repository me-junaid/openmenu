import { createContext, useState } from "react";

export const ItemsContext = createContext();

export const ItemsProvider = ({ children }) => {

  const initailData = {
    categories: [
      {
        id: 1,
        name: "Hot Drinks",
        items: [
          {
            name: "Tea",
            price: 12,
            img: "Image need to be added",
            selectionCount: 0
          },
          {
            name: "Coffee",
            price: 15,
            img: "Image need to be added",
            selectionCount: 0
          },
          {
            name: "Boost",
            price: 150,
            img: "Image need to be added",
            selectionCount: 0
          },
          {
            name: "Tea",
            price: 12,
            img: "Image need to be added",
            selectionCount: 0
          },
          {
            name: "Coffee",
            price: 15,
            img: "Image need to be added",
            selectionCount: 0
          },
          {
            name: "Boost",
            price: 150,
            img: "Image need to be added",
            selectionCount: 0
          },
        ]
      },
      {
        id: 2,
        name: "Snacks",
        items: [
          {
            name: "Payampori",
            price: 10,
            img: "Image need to be added",
            selectionCount: 0
          },
          {
            name: "Elanji",
            price: 15,
            img: "Image need to be added",
            selectionCount: 0
          },
          {
            name: "Cutlet",
            price: 15,
            img: "Image need to be added",
            selectionCount: 0
          },
          {
            name: "Chicken Roll",
            price: 20,
            img: "Image need to be added",
            selectionCount: 0
          },
        ]
      },
      {
        id: 3,
        name: "Juice",
        items: [
          {
            name: "Musambi Juice",
            price: 200,
            img: "Image need to be added",
            selectionCount: 0
          },
          {
            name: "Lime Juice",
            price: 200,
            img: "Image need to be added",
            selectionCount: 0
          },
          {
            name: "Orange Juice",
            price: 300,
            img: "Image need to be added",
            selectionCount: 0
          },
          {
            name: "Anar Juice",
            price: 150,
            img: "Image need to be added",
            selectionCount: 0
          },

        ]
      },
      {
        id: 4,
        name: "Juice",
        items: [
          {
            name: "Musambi Juice",
            price: 200,
            img: "Image need to be added",
            selectionCount: 0
          },
          {
            name: "Lime Juice",
            price: 200,
            img: "Image need to be added",
            selectionCount: 0
          },
          {
            name: "Orange Juice",
            price: 300,
            img: "Image need to be added",
            selectionCount: 0
          },
          {
            name: "Anar Juice",
            price: 150,
            img: "Image need to be added",
            selectionCount: 0
          },

        ]
      },
      {
        id: 5,
        name: "Juice",
        items: [
          {
            name: "Musambi Juice",
            price: 200,
            img: "Image need to be added",
            selectionCount: 0
          },
          {
            name: "Lime Juice",
            price: 200,
            img: "Image need to be added",
            selectionCount: 0
          },
          {
            name: "Orange Juice",
            price: 300,
            img: "Image need to be added",
            selectionCount: 0
          },
          {
            name: "Anar Juice",
            price: 150,
            img: "Image need to be added",
            selectionCount: 0
          },

        ]
      },
    ]
  }

  const [selectedCategory, setSelectedCategory] = useState(0)

  const [user, setUser] = useState(initailData); 

  const updateSelectionCount = (categoryId, itemName, type = "increment") => {
    setUser(prev => ({
      ...prev,
      categories: prev.categories.map(category =>
        category.id === categoryId
          ? {
            ...category,
            items: category.items.map(item =>
              item.name === itemName
                ? {
                  ...item,
                  selectionCount:
                    type === "increment"
                      ? item.selectionCount + 1
                      : Math.max(item.selectionCount - 1, 0)
                }
                : item
            )
          }
          : category
      )
    }));
  };

  return (
    <ItemsContext.Provider value={{ user, selectedCategory, setSelectedCategory, updateSelectionCount }}>
      {children}
    </ItemsContext.Provider>
  );
};
