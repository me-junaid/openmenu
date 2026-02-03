import React, { useCallback, useContext } from 'react'
import { Plus } from '../Icons/Plus';
import { Minus } from '../Icons/Minus';
import { ItemsContext } from '../../Contexts/ItemsContext';


export const ItemFeed = ({ admin = false }) => {

  const { user, selectedCategory, updateSelectionCount, selectedItems, confirmOrder, setSelectedItemDetails, setOpenProductInfo } = useContext(ItemsContext);
  const categoryName = user.categories[selectedCategory].name;
  const itemsInMenus = user.categories[selectedCategory].items;


  return (
    <div className='dark:text-white dark:bg-black bg-white text-black '>
      <h2 id='catergory-name' className="font-bold px-8 my-font dark:text-white text-3xl text-left mb-2 dark:animate-pulse-glow">
        {categoryName}
      </h2>

      <div className={`${admin ? "pb-[170px]" : "pb-[150px]"} px-2 mt-0 space-y-1 rounded-2xl -z-1`}>
        {itemsInMenus.map((item, index) => (
          <div key={index} className='bg-[#02090104] dark:bg-[#020901] pr-3 rounded-xl flex items-center relative' onClick={() => { setSelectedItemDetails({ name: item.name, price: item.price }); setOpenProductInfo(true) }}>
            <div className="w-18 h-18  bg-[#0b0e0a10] dark:bg-[#0b0e0a] rounded-xl shrink-0"></div>
            <div className="grow ml-3">
              <p className='text-lg font-semibold dark:text-green-200 my-font'>{item.name}</p>
              <p className='dark:text-gray-200 text-xs'>₹{item.price}</p>
              <p className='line-clamp-2 text-[#6e6e6e] text-xs'>Description</p>
            </div>
            <div className={`${confirmOrder || admin ? "hidden" : "flex"} absolute transition-all duration-200 right-[5px] shrink-0 border-2 dark:border-white/40 border-black/40 bg-white dark:bg-black rounded-lg overflow-hidden`}>

              <div
                className={`
    h-7 min-w-7 rounded-full dark:border-green-200/20 border-green-800/30 flex justify-center items-center dark:text-white/80 text-green-800 cursor-pointer transition-all duration-100
    ${item.selectionCount > 0
                    ? "flex scale-100 opacity-100"
                    : "hidden opacity-0 scale-75 pointer-events-none"}
    md:hover:bg-green-200/10
    active:scale-90
    active:bg-green-200/20
  `}
                onClick={(event) => {
                  event.stopPropagation();
                  updateSelectionCount(
                    user.categories[selectedCategory].id,
                    item.name,
                    "decrement"
                  );
                }}
              >
                <Minus height={17} width={17} />
              </div>

              <div className={`flex justify-center items-center font-bold ${(item.selectionCount > 0) ? "block" : "hidden"}`}>
                <p className={`text-center dark:text-white leading-0 text-sm w-[15px]`}>{item.selectionCount}</p>
              </div>

              <div
                onClick={(event) => {
                  event.stopPropagation();
                  updateSelectionCount(
                    user.categories[selectedCategory].id,
                    item.name,
                    "increment"
                  );

                  selectedItems.map((item) => {
                    console.log(item);
                  })

                }}
                className="
                h-7 min-w-7
    dark:border-green-200/20 border-green-800/50 
    flex justify-center items-center 
    dark:text-white/80 text-green-800 cursor-pointer
    transition-all duration-100
    active:scale-95 
    active:bg-green-200/20
    md:hover:bg-green-200/10
    rounded-full
  "
              >
                <Plus height={20} width={20} />
              </div>

            </div>
          </div>
        ))
        }
      </div >
    </div>
  )
}
