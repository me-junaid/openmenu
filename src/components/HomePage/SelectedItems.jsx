import React, { useContext } from 'react'
import { ItemsContext } from '../../contexts/ItemsContext';

export const SelectedItems = () => {

  const { selectedItems, openCart } = useContext(ItemsContext);


  return (
    <div className={`${openCart ? "top-[50px] bottom-[70px] fixed inset-0 bg-black p-2 flex flex-col gap-2" : "hidden"}`}>
      {selectedItems.map((item) => {
        return (
          <div className="bg-green-900/9 p-3 flex justify-between items-center" key={item.name}>
            <div className="">
              <div> {item.name}</div>
              <div className="text-xs">₹{item.price}</div>
            </div>
            <div className="">x {item.quantity}</div>
          </div>
        )
      }
      )}
    </div>
  )
}
