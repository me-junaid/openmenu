import React, { useState, useCallback, useContext } from "react";
import { ItemsContext } from "../../contexts/ItemsContext";
import { SelectedItems } from "./SelectedItems";



export const CategoryFeed = () => {

  const { user, selectedCategory, setSelectedCategory, selectedItems, updateOpenCart } = useContext(ItemsContext);
  const items = user.categories;



  const handleSelect = useCallback((index) => {
    setSelectedCategory(index);
    // optional: scroll the selected item into view
    const el = document.getElementById(`cat-item-${index}`);
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  }, []);

  const handleKeyDown = useCallback(
    (e, index) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleSelect(index);
      }
    },
    [handleSelect]
  );

  return (
    <div className="fixed bottom-0 left-0 right-0">
      <div
        className=" p-3 pt-1 bg-black flex justify-around gap-3 overflow-x-auto snap-x snap-mandatory hide-scrollbar"
        role="list"
        aria-label="Category feed"
      >
        {items.map((item, index) => {
          const isSelected = index === selectedCategory;
          const baseClasses =
            "p-2 flex flex-col justify-center items-center shrink-0 rounded-xl snap-center transition-transform duration-150";
          const selectedClasses = isSelected
            ? "scale-100 border-2 border-[#6f6f6f] bg-[#161616]"
            : "scale-100 border-2 border-[#6f6f6f00] bg-[#161616]/90";

          return (
            <div
              id={`cat-item-${index}`}
              key={index}
              role="button"
              tabIndex={0}
              aria-pressed={isSelected}
              onClick={() => handleSelect(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`${baseClasses} ${selectedClasses}`}
            >
              <div className="bg-gray-700 w-20 aspect-square rounded-md" />
              <div className={`${isSelected ? "text-yellow-200" : ""} font-semibold text-sm my-0.5 text-center`}>{item.name}</div>
            </div>
          );
        })}
      </div>
      <div className={`${(selectedItems.length > 0 ? "flex" : "hidden")} h-16 bg-black p-3 pt-1 justify-between`}>
        <div className=" flex justify-center items-center">
          {selectedItems.length} . {selectedItems.length === 1 ? "Item" : "Items"} |
        </div>
        <button className="ml-1 active:bg-green-200/9 active:border-yellow-200 duration-200 bg-green-900/9 px-4 text-white/87 border-green-200 border  text-lg font-bold rounded-2xl" onClick={() => updateOpenCart()}>
          View
        </button>
        <button className="ml-auto bg-green-200 px-7 text-black border-yellow-200 border  text-lg font-bold rounded-2xl">
          Call waiter
        </button>
      </div>
    </div>
  );
};
