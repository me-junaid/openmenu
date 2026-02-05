import { useCallback, useContext } from "react";
import { ItemsContext } from "../../contexts/ItemsContext";

export const CategoryFeed = ({ admin }) => {
  const {
    user,
    selectedCategory,
    openCart,
    updateOpenCart,
    orderSelection,
    handleSelect,
  } = useContext(ItemsContext);

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

  function getRandom1to100() {
    return Math.floor(Math.random() * 100) + 1;
  }


  return (
    <div
      className={`${orderSelection ? "hidden" : "fixed bottom-0 left-0 right-0"}`}
      role="list"
      aria-label="Category feed"
    >
      <div
        id="category-scroll-container"
        className={`${admin ? "pb-14 h-40" : "h-[110px]"
          } px-2 py-1 dark:bg-black bg-white flex overflow-x-auto hide-scrollbar`}
      >
        {items.map((item, index) => {
          const isSelected = index === selectedCategory;

          const baseClasses =
            "p-0.5 flex flex-col justify-center items-center shrink-0 rounded-xl transition-transform duration-150 min-w-22";
          const selectedClasses = isSelected
            ? "border-2 dark:border-yellow-200 border-yellow-100 dark:bg-[#161616] bg-[#161616]/10"
            : "border-2 border-transparent";

          return (
            <div
              id={`cat-item-${index}`}
              key={item.id ?? index}
              role="button"
              tabIndex={0}
              aria-pressed={isSelected}
              onClick={() => {
                handleSelect(index);
                if (openCart) updateOpenCart();
              }}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`${baseClasses} ${selectedClasses}`}
            >
              <img src={`https://picsum.photos/200/300?random=${getRandom1to100() * getRandom1to100()}`} className="dark:bg-gray-700 bg-gray-200 w-18 aspect-square rounded-lg" />
              <div
                className={`${isSelected
                  ? "dark:text-yellow-200 text-black"
                  : "text-black/70 dark:text-white"
                  } font-bold text-xs text-center my-font mt-1`}
              >
                {item.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
