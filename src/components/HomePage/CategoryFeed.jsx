import {  useContext } from "react";
import { ItemsContext } from "../../contexts/ItemsContext";
import { Menu } from "../Icons/Menu";
import { Waiter } from "../Icons/Waiter";
import { NavForCatergory } from "./NavForCatergory";



export const CategoryFeed = () => {

  const { selectedItems, updateOpenCart, updateOrderSelection } = useContext(ItemsContext);



  return (
    <div className="fixed bottom-0 left-0 right-0">

      <div className={`${(selectedItems.length > 0 ? "flex" : "hidden")} h-13 bg-black p-3 pb-1 pt-0 justify-between`}>
        <div className=" flex justify-center items-center">
          {selectedItems.length} {selectedItems.length === 1 ? "item" : "items"} ●
        </div>
        <button className="ml-1 p-1 active:bg-green-200/9 active:border-yellow-200 duration-200 bg-green-900/9 w-20 text-white/87 border-green-200 border-2  text-lg font-bold rounded-xl flex justify-between items-center" onClick={() => updateOpenCart()}>
          <div className="grow text-sm">View</div>
          <span><Menu width={20} height={20} /></span>
        </button>
        <button className="ml-auto bg-green-200/80 active:bg-green-200 duration-200 px-3 text-black border-green-900 border-2  text-lg font-bold rounded-xl flex items-center justify-center" onClick={() => updateOrderSelection()}>
          <Waiter size={25} />
          <p className="">Call waiter</p>
        </button>
      </div>

      <NavForCatergory />

    </div>
  );
};
