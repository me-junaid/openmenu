import React, { useContext } from 'react'
import { ItemsContext } from '../../contexts/ItemsContext';
import { Menu } from '../Icons/Menu';

export const SelectedItems = () => {

  const { selectedItems, openCart, updateOpenCart } = useContext(ItemsContext);


  return (
    <div className={`${openCart ? "top-[50px] fixed inset-0 bg-black flex flex-col " : "hidden"}`}>
      <div className="flex items-center p-3 pt-8 gap-2">
        <Menu width={30} height={30} />
        <h1 className="font-bold text-4xl my-font">Cart</h1>
      </div>
      <div className=" p-2 flex flex-col gap-2 grow overflow-y-scroll hide-scrollbar">
        {selectedItems.map((item) => {
          return (
            <div className="bg-green-900/9 p-3 flex justify-between items-center" key={item.name}>
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
      <div className={`flex min-h-16 bg-black p-3 pt-1 justify-between`}>
        <div className=" flex justify-center items-center">
          {selectedItems.length} . {selectedItems.length === 1 ? "Item" : "Items"} |
        </div>
        <button className="ml-1 active:bg-green-200/9 active:border-yellow-200 duration-200 bg-red-900 w-20 text-white/87 border-green-200 border  text-lg font-bold rounded-2xl flex items-center justify-center" onClick={() => updateOpenCart()}>
          Close <span><Menu /></span>
        </button>
        <button className="ml-auto bg-green-200 px-7 text-black border-yellow-200 border  text-lg font-bold rounded-2xl">
          Call waiter
        </button>
      </div>
    </div>
  )
}
