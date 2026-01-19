import React, { useContext } from 'react'
import { ItemsContext } from '../../contexts/ItemsContext'


export const PromoBanner = () => {
  const { user } = useContext(ItemsContext)
  
  return (
    <div className='p-4 m-3 mt-[50px] bg-[#1e1e1e] aspect-video rounded-2xl'>
      {user.name}
    </div>
  )
}
