import React, { useContext } from 'react'
import { ItemsContext } from '../../contexts/ItemsContext'


export const PromoBanner = () => {
  const { user } = useContext(ItemsContext)
  
  return (
    <div className='p-4 m-3  dark:bg-[#1e1e1e] bg-[#1e1e1e07] h-[150px] rounded-2xl'>
      {user.name}
    </div>
  )
}
