import React, { useContext } from 'react'
import { ItemsContext } from '../../contexts/ItemsContext';

export const SelectedItems = () => {

  const {  selectedItems } = useContext(ItemsContext);


  return (
    <div className='mb-80'>
      {selectedItems.map((item) => {
        return (
          <div className="bg-green-900/9 p-3" key={item.name}>
            <div>{item.name}</div>
            <div className="">₹{item.price} x {item.quantity}</div>
          </div>
        )
      }

      )}
    </div>
  )
}
