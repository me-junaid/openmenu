import { useCallback, useContext } from "react";
import { ItemsContext } from "../../contexts/ItemsContext";

export const CategoryFeed = ({ admin }) => {

  const { user, selectedCategory, openCart, updateOpenCart, orderSelection, handleSelect } = useContext(ItemsContext);
  const items = user.categories;


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

      className={`${orderSelection ? "hidden" : "fixed  bottom-0 left-0 right-0"}`}
      role="list"
      aria-label="Category feed"
    >
      <div className={`${admin ? "pb-14 h-[160px]" : "h-[110px]" } px-2 py-1 bg-black flex justify-around overflow-x-auto snap-x snap-mandatory hide-scrollbar`}>
        {items.map((item, index) => {
          const isSelected = index === selectedCategory;
          const baseClasses =
            "p-0.5 flex flex-col justify-center items-center shrink-0 rounded-xl snap-center transition-transform duration-150 min-w-22";
          const selectedClasses = isSelected
            ? "scale-100 border-2 border-yellow-200 bg-[#161616]"
            : "scale-100 border-2 border-[#6f6f6f00] bg-[#161616]/0";

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
              <div className={`${isSelected ? "text-yellow-200" : ""} font-bold text-xs my-0.5 text-center my-font`}>{item.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  )
}
