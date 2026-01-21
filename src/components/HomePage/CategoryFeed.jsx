import { useCallback, useContext } from "react";
import { ItemsContext } from "../../contexts/ItemsContext";
import { Menu } from "../Icons/Menu";
import { Waiter } from "../Icons/Waiter";



export const CategoryFeed = () => {

  const { user, selectedCategory, setSelectedCategory, selectedItems, updateOpenCart, updateOrderSelection } = useContext(ItemsContext);
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
        className=" pl-2 py-1 bg-black flex justify-around gap-1 overflow-x-auto snap-x snap-mandatory hide-scrollbar"
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
              onClick={() => handleSelect(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`${baseClasses} ${selectedClasses}`}
            >
              <div className="bg-gray-700 w-18 aspect-square rounded-lg" />
              <div className={`${isSelected ? "text-black" : ""} font-bold text-xs my-0.5 text-center my-font`}>{item.name}</div>
            </div>
          );
        })}
      </div>
      <div className={`${(selectedItems.length > 0 ? "flex" : "hidden")} h-13 bg-black p-3 pb-1 pt-0 justify-between`}>
        <div className=" flex justify-center items-center">
          {selectedItems.length} {selectedItems.length === 1 ? "item" : "items"} ●
        </div>
        <button className="ml-1 p-1 active:bg-green-200/9 active:border-yellow-200 duration-200 bg-green-900/9 w-20 text-white/87 border-green-200 border-2  text-lg font-bold rounded-xl flex justify-between items-center" onClick={() => updateOpenCart()}>
          <div className="grow text-sm">View</div>
          <span><Menu width={20} height={20}/></span>
        </button>
        <button className="ml-auto bg-green-200/80 active:bg-green-200 duration-200 px-3 text-black border-green-900 border-2  text-lg font-bold rounded-xl flex items-center justify-center" onClick={() => updateOrderSelection()}>
          <Waiter size={25} />
          <p className="">Call waiter</p>
        </button>
      </div>
    </div>
  );
};
