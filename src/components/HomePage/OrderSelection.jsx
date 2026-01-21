import React, { useContext } from 'react'
import { ItemsContext } from '../../contexts/ItemsContext';
import { Menu } from '../Icons/Menu';
import { Waiter } from '../Icons/Waiter';
import { Close } from '../Icons/Close';
import QRGenerator from '../Utilis/QRGenerator';
import { Check } from '../Icons/Check';

export const OrderSelection = () => {

  const { selectedItems, orderSelection, updateOrderSelection, confirmOrder, updateConfirmOrder } = useContext(ItemsContext);

  

  return (
    <div className={`${orderSelection ? "top-[50px] fixed inset-0 bg-black flex flex-col " : "hidden"}`}>
      <div className="flex items-center p-3 pb-0 pt-8 gap-2">
        <Menu width={30} height={30} />
        <h1 className="font-bold text-4xl my-font">Place Order</h1>
        <button className={`${(confirmOrder) ? "hidden" : " flex"} ml-auto p-2 active:bg-green-200/9 active:border-yellow-200 duration-200 bg-red-900/40 text-white/87  text-lg font-bold rounded-full items-center justify-between`} onClick={() => updateOrderSelection()}>
          <span><Close /></span>
        </button>
      </div>

      <p className="flex justify-between px-4 text-gray-500 pb-2 text-sm mb-1">
        Take a moment to review your order before confirming.
      </p>

      <div className=" p-2 pt-0 grow overflow-y-scroll hide-scrollbar">
        <div className="p-5 mb-2 rounded-xl bg-green-900/9">
          <QRGenerator size={(confirmOrder) ? 300 : 150} fgColor={(confirmOrder) ? "#ffffff" : "#ffffff10"} />
        </div>


        <p className={`${(confirmOrder) ? "text-yellow-200" : "text-gray-900"} text-center  pb-4 text-sm`}>
          Show this QR code to the waiter to place your order.
        </p>

        <div className="flex justify-between px-3 text-gray-300 mt-5 text-xs mb-1">
          <p>Item</p>
          <p>Quantity</p>
        </div>
        <div className="flex flex-col gap-2 ">
          {selectedItems.map((item) => {
            return (
              <div className="bg-green-900/9 p-3 flex justify-between items-center rounded-lg" key={item.name}>
                <div>
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

      <div className={`flex h-16 bg-black p-3 pb-3 pt-0 justify-between`}>
        <div className=" flex justify-center items-center text-gray-300 pl-2">
          {selectedItems.length} {selectedItems.length === 1 ? "item" : "items"} selected
        </div>
        <button className={`${(confirmOrder) ? "bg-green-500 " : " active:bg-green-200 duration-200  "} bg-green-400 ml-auto p-2 pr-3 text-black border-green-900 border-2  text-lg font-bold rounded-xl flex items-center justify-center`} onClick={() => updateConfirmOrder()}>
          <Check size={35} />
          <p className="text-sm my-font">{(confirmOrder ? "" : "Confirm Order")}</p>
        </button>
      </div>

    </div>
  )
}
