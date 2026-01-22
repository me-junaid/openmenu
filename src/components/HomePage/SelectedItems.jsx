import React, { useCallback, useContext } from 'react'
import { ItemsContext } from '../../contexts/ItemsContext';
import { Menu } from '../Icons/Menu';
import { Waiter } from '../Icons/Waiter';
import { Close } from '../Icons/Close';
import { ArrowRight } from '../Icons/ArrowRight';

export const SelectedItems = () => {

  const { selectedItems, updateOpenCart, updateOrderSelection, openCart, handleSelect } = useContext(ItemsContext);


  return (
    <div className={`${openCart ? "top-[50px] fixed inset-0 bg-black flex flex-col " : "hidden"}`}>
      <div className="flex items-center p-3 pt-8 gap-2">
        <Menu width={30} height={30} />
        <h1 className="font-bold text-4xl my-font">Cart</h1>
        <button className="ml-auto p-2 active:bg-green-200/9 active:border-yellow-200 duration-200 bg-red-900/40 text-white/87  text-lg font-bold rounded-full flex items-center justify-between" onClick={() => updateOpenCart()}>
          <span><Close /></span>
        </button>
      </div>

      <div className="flex justify-between px-7 text-gray-300 mt-5 text-xs mb-1">
        <p>Item</p>
        <p>Quantity</p>
      </div>

      <div className=" p-2 pb-40 flex flex-col gap-1 grow overflow-y-scroll hide-scrollbar">
        {selectedItems.map((item) => {
          return (
            <div className="bg-green-900/9 pl-5 pr-2 py-2 flex justify-between items-center rounded-lg" key={item.name} onClick={() => {
              handleSelect(item.categoryId - 1)
              updateOpenCart()
            }}>
              <div className="">
                <div className='my-font text-sm'> {item.name}</div>
                <div className="text-xs">₹{item.price}</div>
              </div>
              <div className="text-xl ml-auto mb-1">x {item.quantity}</div>
              <div className="w-7 h-7 bg-green-900/10 rounded-full ml-2 flex items-center justify-center text-gray-500">
                <ArrowRight />
              </div>
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
