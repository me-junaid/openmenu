import { useCallback, useContext } from "react";
import { ItemsContext } from "../../contexts/ItemsContext";

export const CategoryFeed = () => {

  const { user, selectedCategory, setSelectedCategory, openCart, updateOpenCart, orderSelection } = useContext(ItemsContext);
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

      className={`${orderSelection ? "hidden" : "fixed h-[110px] bottom-0 left-0 right-0 px-2 py-1 bg-black flex justify-around gap-1 overflow-x-auto snap-x snap-mandatory hide-scrollbar"}`}
      role="list"
      aria-label="Category feed"
    >
      {items.map((item, index) => {
        const isSelected = index === selectedCategory;
        const baseClasses =
          "p-0.5 flex flex-col justify-center items-center shrink-0 rounded-xl snap-center transition-transform duration-150 min-w-22";
        const selectedClasses = isSelected
          ? "scale-100 border-2 border-[#6f6f6f] bg-yellow-200"
          : "scale-100 border-2 border-[#6f6f6f00] bg-[#161616]/90";

        return (
          <div
            id={`cat-item-${index}`}
            key={index}
            role="button"
            tabIndex={0}
            aria-pressed={isSelected}
            onClick={() => {
              handleSelect(index)
              if (openCart) {
                updateOpenCart()
              }
            }}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`${baseClasses} ${selectedClasses}`}
          >
            <div className="bg-gray-700 w-18 aspect-square rounded-lg" />
            <div className={`${isSelected ? "text-black" : ""} font-bold text-xs my-0.5 text-center my-font`}>{item.name}</div>
          </div>
        );
      })}
    </div>
  )
}
