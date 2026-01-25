import React, { useContext } from 'react'
import { ItemsContext } from '../../contexts/ItemsContext';
import { Menu } from '../Icons/Menu';
import { Waiter } from '../Icons/Waiter';
import { Close } from '../Icons/Close';
import QRGenerator from '../Utilis/QRGenerator';
import { Check } from '../Icons/Check';
import { ArrowRight } from '../Icons/ArrowRight';

export const OrderSelection = () => {

  const { selectedItems, orderSelection, updateOrderSelection, confirmOrder, updateConfirmOrder, handleSelect } = useContext(ItemsContext);



  return (
    <div className={`${orderSelection ? "top-[50px] fixed inset-0 bg-black flex flex-col " : "hidden"}`}>
      <div className="flex items-center p-3 pb-0 pt-8 gap-2">
        <Menu width={30} height={30} />
        <h1 className="font-bold text-4xl my-font">Place Order</h1>
        <button className={`${(confirmOrder) ? "flex" : " flex"} ml-auto p-2 active:bg-green-200/9 active:border-yellow-200 duration-200 bg-red-900/40 text-white/87  text-lg font-bold rounded-full items-center justify-between`} onClick={() => updateOrderSelection()}>
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

        <div className={`${(confirmOrder) ?? "hidden"} text-green-200 text-center flex justify-center items-center pb-4 text-sm`}>
          <p>Any doubt in ordering?</p>
          <button className='ml-1 p-1 px-3 my-font text-xs active:bg-green-200/9 active:border-yellow-200 duration-200 bg-green-900/9 text-green-400 border-green-200 border font-bold rounded-lg flex justify-between items-center'>
            <Waiter />
            Call waiter
          </button>
        </div>

        <div className="flex justify-between px-5 text-gray-300 mt-5 text-xs mb-1">
          <p>Item</p>
          <p>Quantity</p>
        </div>
        <div className="flex flex-col gap-2 ">
          {selectedItems.map((item) => {
            return (
              <div className={`${(confirmOrder ? "pr-5" : "pr-2")} bg-green-900/9 pl-5 py-2 flex justify-between items-center rounded-lg`} key={item.name} onClick={() => {
                if (!confirmOrder) {
                  updateOrderSelection()
                  setTimeout(() => {
                    handleSelect(item.categoryId - 1)
                  }, 5);
                }
              }}>
                <div className="">
                  <div className='my-font text-sm'> {item.name}</div>
                  <div className="text-xs">₹{item.price}</div>
                </div>
                <div className="text-xl ml-auto mb-1">x {item.quantity}</div>
                {(!confirmOrder) &&
                  <div className="w-7 h-7 bg-green-900/10 rounded-full ml-2 flex items-center justify-center text-gray-500">
                    <ArrowRight />
                  </div>
                }
              </div>
            )
          }
          )}
        </div>
      </div>

      <div className={`flex bg-black p-3 pb-3 pt-0 justify-between`}>
        <div className=" flex justify-center items-center text-gray-300 pl-2">
          {selectedItems.length} {selectedItems.length === 1 ? "item" : "items"} selected
        </div>
        <button className={`${(confirmOrder) ? "bg-green-500" : " active:bg-green-200 duration-200  "} bg-green-400 ml-auto p-2 pr-3 text-black border-green-900 border-2  text-lg font-bold rounded-xl flex items-center justify-center`} onClick={() => updateConfirmOrder()}>
          <Check size={35} />
          <p className="text-sm my-font">{(confirmOrder ? "" : "Confirm Order")}</p>
        </button>
      </div>

    </div>
  )
}
