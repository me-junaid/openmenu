import React, { useState, useCallback, useContext } from "react";
import { ItemsContext } from "../../contexts/ItemsContext";



export const CategoryFeed = () => {

  const { user, selectedCategory, setSelectedCategory } = useContext(ItemsContext);
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
    <div
      className="fixed bottom-0 left-0 right-0 p-3 pt-1 bg-black flex justify-around gap-3 overflow-x-auto snap-x snap-mandatory"
      role="list"
      aria-label="Category feed"
    >
      {items.map((item, index) => {
        const isSelected = index === selectedCategory;
        const baseClasses =
          "p-2 flex flex-col justify-center items-center rounded-xl snap-center transition-transform duration-150";
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
            <div className="bg-gray-700 w-[70px] aspect-square rounded-md" />
            <div className="font-semibold text-sm my-0.5 text-center">{item.name}</div>
          </div>
        );
      })}
    </div>
  );
};
