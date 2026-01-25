import { useContext } from "react";
import { ItemsContext } from "../../contexts/ItemsContext";
import { Menu } from "../Icons/Menu";
import { Waiter } from "../Icons/Waiter";



export const NavForCatergory = () => {

  const { selectedItems, updateOpenCart, updateOrderSelection } = useContext(ItemsContext);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle('dark')
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }

  
  return (
    <div className="fixed bottom-[110px] left-0 right-0 ">

      <div className={`${(selectedItems.length > 0 ? "flex" : "hidden")} h-10 dark:bg-black bg-white p-3 pb-0 pt-1 justify-between`}>
        <div className="" onClick={() => toggleTheme()}>jkn</div>
        <div className="ml-auto flex justify-center items-center">
          {selectedItems.length} {selectedItems.length === 1 ? "item" : "items"} ●
        </div>
        <button className="ml-1 bg-yellow-200 active:bg-green-200 duration-200 px-3 text-black border-green-900 border-2  text-lg font-bold rounded-xl flex items-center justify-center my-font" onClick={() => updateOrderSelection()}>
          <div className="grow text-sm">View</div>
          <span><Menu width={20} height={20} /></span>
        </button>

      </div>
    </div>
  );
};
