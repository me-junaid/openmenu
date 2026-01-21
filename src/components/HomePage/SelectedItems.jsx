import React, { useCallback, useContext } from 'react'
import { ItemsContext } from '../../contexts/ItemsContext';
import { Menu } from '../Icons/Menu';
import { Waiter } from '../Icons/Waiter';
import { Close } from '../Icons/Close';

export const SelectedItems = () => {

  const { user, selectedCategory, setSelectedCategory, selectedItems, updateOpenCart, updateOrderSelection, openCart } = useContext(ItemsContext);
  const items = user.categories;


  return (
    <div className={`${openCart ? "top-[50px] fixed inset-0 bg-black flex flex-col " : "hidden"}`}>
      <div className="flex items-center p-3 pt-8 gap-2">
        <Menu width={30} height={30} />
        <h1 className="font-bold text-4xl my-font">Cart</h1>
        <button className="ml-auto p-2 active:bg-green-200/9 active:border-yellow-200 duration-200 bg-red-900/40 text-white/87  text-lg font-bold rounded-full flex items-center justify-between" onClick={() => updateOpenCart()}>
          <span><Close /></span>
        </button>
      </div>
      <div className=" p-2 flex flex-col gap-2 grow overflow-y-scroll hide-scrollbar">
        {selectedItems.map((item) => {
          return (
            <div className="bg-green-900/9 p-3 flex justify-between items-center rounded-lg" key={item.name}>
              <div className="">
                <div> {item.name}</div>
                <div className="text-xs">₹{item.price}</div>
              </div>
              <div className="text-xl">x {item.quantity}</div>
            </div>
          )
        }
        )}
      </div>


      <div className={`flex h-10 bg-black p-3 pb-0 pt-1 justify-between fixed bottom-[110px] left-0 right-0`}>
        <div className=" flex justify-center items-center">
          {selectedItems.length} {selectedItems.length === 1 ? "item" : "items"} ●
        </div>
        <button className="ml-1 p-1 active:bg-green-200/9 bg-red-900 active:border-yellow-200 duration-200 w-20 text-white/87 border-green-200 border-2  text-lg font-bold rounded-xl flex justify-between items-center" onClick={() => updateOpenCart()}>
          <div className="grow text-sm">Close</div>
          <span><Menu width={20} height={20} /></span>
        </button>
        <button className="ml-auto bg-yellow-200 active:bg-green-200 duration-200 px-3 text-black border-green-900 border-2  text-lg font-bold rounded-xl flex items-center justify-center" onClick={() => updateOrderSelection()}>
          <Waiter size={25} />
          <p className="text-sm font-bold">Call waiter</p>
        </button>
      </div>


    </div>
  )
}
