import React, { useContext } from 'react'
import { ItemsContext } from '../../contexts/ItemsContext';
import { Menu } from '../Icons/Menu';
import { Waiter } from '../Icons/Waiter';
import { Close } from '../Icons/Close';
import QRGenerator from '../Utilis/QRGenerator';

export const OrderSelection = () => {

  const { selectedItems, orderSelection, updateOrderSelection } = useContext(ItemsContext);


  return (
    <div className={`${orderSelection ? "top-[50px] fixed inset-0 bg-black flex flex-col " : "hidden"}`}>
      <div className="flex items-center p-3 pt-8 gap-2">
        <Menu width={30} height={30} />
        <h1 className="font-bold text-4xl my-font">Place Order</h1>
        <button className="ml-auto p-2 active:bg-green-200/9 active:border-yellow-200 duration-200 bg-red-900/40 text-white/87  text-lg font-bold rounded-full flex items-center justify-between" onClick={() => updateOrderSelection()}>
          <span><Close /></span>
        </button>
      </div>

      <p className="text-gray-400 pl-4 pb-2">Show the QR to waiter to place the order</p>

      <div className=" p-2 pt-0 grow overflow-y-scroll hide-scrollbar">
        <div className="aspect-square m-4 bg-white mb-2 rounded-lg">
          <QRGenerator />
        </div>

        <div className="flex flex-col gap-2 ">
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
      </div>
      <div className={`flex min-h-16 bg-black p-3 pt-1 justify-between`}>
        <div className=" flex justify-center items-center">
          {selectedItems.length} {selectedItems.length === 1 ? "item" : "items"} selected
        </div>
      </div>
    </div>
  )
}
