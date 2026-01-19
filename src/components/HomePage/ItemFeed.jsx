import React, { useContext } from 'react'
import { ItemsContext } from '../../contexts/ItemsContext'
import { Plus } from '../Icons/Plus';

// const itemsInMenus = [
//   {
//     name: "Biriyani",
//     price: "$120"
//   },
//   {
//     name: "Biriyani",
//     price: "$120"
//   },
//   {
//     name: "Biriyani",
//     price: "$120"
//   },
//   {
//     name: "Biriyani",
//     price: "$120"
//   },
//   {
//     name: "Biriyani",
//     price: "$120"
//   },
//   {
//     name: "Biriyani",
//     price: "$120"
//   },
//   {
//     name: "Biriyani",
//     price: "$120"
//   },
//   {
//     name: "Biriyani",
//     price: "$120"
//   },
// ]

export const ItemFeed = () => {

  const { user, selectedCategory } = useContext(ItemsContext);
  const categoryName = user.categories[selectedCategory].name;
  const itemsInMenus = user.categories[selectedCategory].items;

  return (
    <>
      <h2 className='text-2xl font-bold px-8 pb-2 text-green-200'>{categoryName}</h2>
      <div className='p-2 mt-0 space-y-2 mb-[100px] rounded-2xl'>
        {itemsInMenus.map((item, index) => (
          <div key={index} className='bg-[#051302] py-2 pl-5 pr-3 rounded-2xl flex'>
            <div className="grow">
              <p className='text-xl font-semibold text-green-200'>{item.name}</p>
              <p className='text-gray-200'>₹{item.price}</p>
              <p className='line-clamp-3 text-xs hover:line-clamp-none text-[#959595]'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur, quidem aperiam. Aliquam, consequatur illum. Doloribus ad deleniti velit voluptatibus incidunt similique repudiandae error sed ipsam enim! Provident aliquid placeat totam in. Sunt dolorem, incidunt minima aliquid, voluptatibus sapiente maiores quae fugit eius voluptate fuga molestiae? Ex saepe, nihil mollitia veniam sed quo quis quidem quasi nam, aliquid laboriosam. Ea cumque consequatur error est. Sint dolorem quas expedita excepturi beatae est, laudantium dolores aliquid repellat dolore pariatur possimus autem amet reprehenderit soluta cumque esse natus. Libero et inventore consequatur quam obcaecati ratione dolor nisi est ipsum ut? At amet numquam consequatur?</p>
            </div>
            <div className="w-25 h-25 bg-white rounded-2xl shrink-0"></div>
            <div className="h-5 min-w-5  self-center ml-3 rounded-full border border-green-200 flex justify-center items-center text-green-300"><Plus height={30} width={30}/></div>
          </div>
        ))
        }
      </div>
    </>
  )
}
