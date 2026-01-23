import React, { useContext } from 'react'
import { ItemsContext } from '../../contexts/ItemsContext'
import { Plus } from '../Icons/Plus';
import { Minus } from '../Icons/Minus';


export const ItemFeed = ({ admin = false }) => {

  const { user, selectedCategory, updateSelectionCount, selectedItems, confirmOrder } = useContext(ItemsContext);
  const categoryName = user.categories[selectedCategory].name;
  const itemsInMenus = user.categories[selectedCategory].items;

  return (
    <>
      <h2 className="font-bold px-8 my-font text-white text-4xl text-center animate-pulse-glow">
        {categoryName}
      </h2>

      <div className={`${admin ? "mb-[170px]" : "mb-[150px]"} px-2 mt-0 space-y-1 rounded-2xl -z-1`}>
        {itemsInMenus.map((item, index) => (
          <div key={index} className='bg-[#020901]  pr-3 rounded-2xl flex items-center'>
            <div className="w-26 h-26 bg-[#0b0e0a] rounded-2xl shrink-0"></div>
            <div className="grow ml-3">
              <p className='text-lg font-semibold text-green-200 my-font'>{item.name}</p>
              <p className='text-gray-200 text-xs'>₹{item.price}</p>
              <p className='line-clamp-2 text-[#6e6e6e] text-xs'>12345678 90123456 789456784 567845678456 78khk hjkkhkh</p>
            </div>
            <div className={`${confirmOrder || admin ? "hidden" : "flex"} flex-col gap-1 shrink-0`}>

              <div className="ml-3 flex justify-center items-center font-bold">
                <p className={`text-center text-xl text-white ${(item.selectionCount > 0) ? "opacity-100 block" : "opacity-0"}`}>{item.selectionCount}</p>
              </div>

              <div
                className={`
    h-7 min-w-7 ml-3 rounded-full
    border-2 border-green-200/20 
    flex justify-center items-center
    text-green-300 cursor-pointer
    transition-all duration-100
    ${item.selectionCount > 0
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-75 pointer-events-none"}
    md:hover:bg-green-200/10
    active:scale-90
    active:bg-green-200/20
  `}
                onClick={() => {
                  updateSelectionCount(
                    user.categories[selectedCategory].id,
                    item.name,
                    "decrement"
                  );
                }}
              >
                <Minus height={20} width={20} />
              </div>

              <div
                onClick={() => {
                  updateSelectionCount(
                    user.categories[selectedCategory].id,
                    item.name,
                    "increment"
                  );

                  console.log(selectedItems);
                }}
                className="
    h-7 mt-auto mb-2 min-w-7 ml-3 rounded-full 
    border-2 border-green-200/50 
    flex justify-center items-center 
    text-green-300 cursor-pointer
    transition-all duration-100
    active:scale-90 
    active:bg-green-200/20
    md:hover:bg-green-200/10
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
