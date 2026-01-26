import { useCallback, useContext } from "react";
import { ItemsContext } from "../../contexts/ItemsContext";
import { AdminContext } from "../../contexts/AdminContext";
import { Plus } from "../Icons/Plus";

export const ManageCatergory = () => {

  const { user } = useContext(ItemsContext);
  const { selectedCategoryByAdmin, handleSelectedCategoryByAdmin, setCanAddCategory } = useContext(AdminContext)
  const items = user.categories;
  const categoryName = user.categories[selectedCategoryByAdmin].name;
  const itemsInMenus = user.categories[selectedCategoryByAdmin].items;

  return (
    <div className="dark:text-white dark:bg-black bg-white text-black ">
      <div className="flex items-center justify-between px-4">
        <h1 className="mt-2.5 text-4xl my-font mb-2">Category</h1>
        <button onClick={() => setCanAddCategory(true)} className="my-font text-xs mt-2 border dark:border-yellow-100 border-green-500 py-0.5 px-2 rounded-full flex justify-center items-center" >
          <Plus width={25} height={25} />
          Add Category</button>
      </div>
      <div
        role="list"
        aria-label="Category feed"
      >
        <div className="px-2 py-1 grid grid-cols-4 justify-around overflow-x-auto snap-x snap-mandatory hide-scrollbar">


          {items.map((item, index) => {
            const isSelected = index === selectedCategoryByAdmin;
            const baseClasses =
              "p-0.5 flex flex-col justify-center items-center shrink-0 rounded-xl snap-center transition-transform duration-150 min-w-22";
            const selectedClasses = isSelected
              ? "border-2 dark:border-yellow-200/0 border-yellow-100 dark:bg-[#161616] bg-[#161616]/10"
              : "border-2 border-[#6f6f6f00] bg-[#161616]/0";

            return (
              <div
                key={index}
                role="button"
                tabIndex={0}
                aria-pressed={isSelected}
                onClick={() => {
                  handleSelectedCategoryByAdmin(index)
                }}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={`${baseClasses} ${selectedClasses}`}
              >
                <div className="dark:bg-gray-700 bg-gray-200 w-18 aspect-square rounded-lg" />
                <div className={`${isSelected ? "dark:text-yellow-200" : "dark:text-white"} font-bold text-xs my-0.5 text-center my-font`}>{item.name}</div>
              </div>
            );
          })}
        </div>


      </div>
      <h1 className="mt-2.5 text-2xl my-font ml-4 mb-2 dark:text-white text-black">Items in <span className="dark:text-yellow-200 text-green-500 my-font dark:animate-pulse-glow">{categoryName}</span></h1>

      <div>
        <div className="mb-[57px] mt-0 space-y-0.5 rounded-2xl -z-1">
          {itemsInMenus.map((item, index) => (
            <div key={index} className='dark:bg-[#020901] bg-[#02090105] pr-3 flex items-center'>
              <div className="w-20 h-20 dark:bg-[#0b0e0a] bg-[#0b0e0a10] rounded-r-lg shrink-0"></div>
              <div className="grow ml-3">
                <p className='text-lg font-semibold dark:text-green-200 my-font'>{item.name}</p>
                <p className='dark:text-gray-200 text-xs'>₹{item.price}</p>
                <p className='line-clamp-2 text-[#6e6e6e] text-xs'>12345678 90123456 789456784 567845678456 78khk hjkkhkh</p>
              </div>
            </div>
          ))
          }
        </div >
      </div>
    </div>
  )
}