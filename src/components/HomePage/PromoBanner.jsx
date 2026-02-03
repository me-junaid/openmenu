import React, { useContext } from 'react'
import { ItemsContext } from '../../Contexts/ItemsContext'


export const PromoBanner = () => {
  const { user } = useContext(ItemsContext)

  return (
    <div className="dark:text-white dark:bg-black bg-white text-black p-3">
      <div className='p-4  dark:bg-[#1e1e1e] bg-[#1e1e1e07] h-[150px] rounded-2xl'>
        {user.name}
      </div>
    </div>
  )
}
