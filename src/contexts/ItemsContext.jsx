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
          },
          {
            name: "Coffee",
            price: 15,
            img: "Image need to be added",
          },
          {
            name: "Boost",
            price: 150,
            img: "Image need to be added",
          },
          {
            name: "Tea",
            price: 12,
            img: "Image need to be added",
          },
          {
            name: "Coffee",
            price: 15,
            img: "Image need to be added",
          },
          {
            name: "Boost",
            price: 150,
            img: "Image need to be added",
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
          },
          {
            name: "Elanji",
            price: 15,
            img: "Image need to be added",
          },
          {
            name: "Cutlet",
            price: 15,
            img: "Image need to be added",
          },
          {
            name: "Chicken Roll",
            price: 20,
            img: "Image need to be added",
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
          },
          {
            name: "Lime Juice",
            price: 200,
            img: "Image need to be added",
          },
          {
            name: "Orange Juice",
            price: 300,
            img: "Image need to be added",
          },
          {
            name: "Anar Juice",
            price: 150,
            img: "Image need to be added",
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
          },
          {
            name: "Lime Juice",
            price: 200,
            img: "Image need to be added",
          },
          {
            name: "Orange Juice",
            price: 300,
            img: "Image need to be added",
          },
          {
            name: "Anar Juice",
            price: 150,
            img: "Image need to be added",
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
          },
          {
            name: "Lime Juice",
            price: 200,
            img: "Image need to be added",
          },
          {
            name: "Orange Juice",
            price: 300,
            img: "Image need to be added",
          },
          {
            name: "Anar Juice",
            price: 150,
            img: "Image need to be added",
          },

        ]
      },
    ]
  }

  const [selectedCategory, setSelectedCategory] = useState(0)

  const [user, setUser] = useState(initailData); // example state


  return (
    <ItemsContext.Provider value={{ user, setUser, selectedCategory, setSelectedCategory }}>
      {children}
    </ItemsContext.Provider>
  );
};
