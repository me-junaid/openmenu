import React, { useContext } from 'react'
import { ItemsContext } from '../../contexts/ItemsContext'
import { Plus } from '../Icons/Plus';
import { Minus } from '../Icons/Minus';


export const ItemFeed = () => {

  const { user, selectedCategory, updateSelectionCount } = useContext(ItemsContext);
  const categoryName = user.categories[selectedCategory].name;
  const itemsInMenus = user.categories[selectedCategory].items;

  return (
    <>
      <h2 className='text-2xl font-bold px-8 text-center'>{categoryName}</h2>
      <div className='p-2 mt-0 space-y-2 mb-[230px] rounded-2xl '>
        {itemsInMenus.map((item, index) => (
          <div key={index} className='bg-[#020901] py-2 pl-5 pr-3 rounded-2xl flex'>
            <div className="grow">
              <p className='text-xl font-semibold text-green-200'>{item.name}</p>
              <p className='text-gray-200'>₹{item.price}</p>
              <p className='line-clamp-2 text-xs hover:line-clamp-none text-[#959595]'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur, quidem aperiam. Aliquam, consequatur illum. Doloribus ad deleniti velit voluptatibus incidunt similique repudiandae error sed ipsam enim! Provident aliquid placeat totam in. Sunt dolorem, incidunt minima aliquid, voluptatibus sapiente maiores quae fugit eius voluptate fuga molestiae? Ex saepe, nihil mollitia veniam sed quo quis quidem quasi nam, aliquid laboriosam. Ea cumque consequatur error est. Sint dolorem quas expedita excepturi beatae est, laudantium dolores aliquid repellat dolore pariatur possimus autem amet reprehenderit soluta cumque esse natus. Libero et inventore consequatur quam obcaecati ratione dolor nisi est ipsum ut? At amet numquam consequatur?</p>
            </div>
            <div className="w-25 h-25 bg-white rounded-2xl shrink-0"></div>
            <div className="flex flex-col gap-1">

              <div className="ml-3 flex justify-center items-center font-bold">
                <p className={`text-center text-xl ${(item.selectionCount > 0) ? "flex" : "hidden"}`}>{item.selectionCount}</p>
              </div>

              <div className={`${(item.selectionCount > 0) ? "flex" : "hidden"}  h-7 min-w-7 ml-3 rounded-full 
    border-2 border-green-200 
    flex justify-center items-center 
    text-green-300 cursor-pointer
    transition-all duration-150
    active:scale-90 
    active:bg-green-200/20
    hover:bg-green-200/10`} onClick={() => {
                  updateSelectionCount(
                    user.categories[selectedCategory].id,
                    item.name,
                    "decrement"
                  )
                  console.log(item.selectionCount);
                }
                }>
                <Minus height={25} width={25} />
              </div>

              <div
                onClick={() => {
                  updateSelectionCount(
                    user.categories[selectedCategory].id,
                    item.name,
                    "increment"
                  );
                }}
                className="
    h-7 mt-auto mb-2 min-w-7 ml-3 rounded-full 
    border-2 border-green-200 
    flex justify-center items-center 
    text-green-300 cursor-pointer
    transition-all duration-150
    active:scale-90 
    active:bg-green-200/20
    hover:bg-green-200/10
  "
              >
                <Plus height={25} width={25} />
              </div>

            </div>
          </div>
        ))
        }
      </div >
    </>
  )
}
