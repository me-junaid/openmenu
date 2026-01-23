import { useCallback, useContext } from "react";
import { ItemsContext } from "../../contexts/ItemsContext";
import { AdminContext } from "../../contexts/AdminContext";

export const ManageCatergory = ({ admin }) => {

  const { user } = useContext(ItemsContext);
  const { selectedCategoryByAdmin, handleSelectedCategoryByAdmin } = useContext(AdminContext)
  const items = user.categories;
  const categoryName = user.categories[selectedCategoryByAdmin].name;
  const itemsInMenus = user.categories[selectedCategoryByAdmin].items;

  return (
    <>
      <h1 className="mt-2.5 text-4xl my-font ml-4 mb-2">Category</h1>
      <div
        className="sticky top-0"
        role="list"
        aria-label="Category feed"
      >
        <div className="relative bg-black">
          <div className=" max-h-[230px] pb-10 px-2 py-1 bg-black grid grid-cols-4 justify-around overflow-x-auto snap-x snap-mandatory hide-scrollbar">


            {items.map((item, index) => {
              const isSelected = index === selectedCategoryByAdmin;
              const baseClasses =
                "p-0.5 flex flex-col justify-center items-center shrink-0 rounded-xl snap-center transition-transform duration-150 min-w-22";
              const selectedClasses = isSelected
                ? "scale-100 border-2 border-yellow-200/10"
                : "scale-100 border-2 border-[#6f6f6f00]";

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
                  <div className="bg-gray-700 w-18 aspect-square rounded-lg" />
                  <div className={`${isSelected ? "text-yellow-200" : ""} font-bold text-xs my-0.5 text-center my-font`}>{item.name}</div>
                </div>
              );
            })}
          </div>

          <div
            className="pointer-events-none absolute -bottom-1 left-0 right-0 h-12
                 bg-linear-to-t from-black to-transparent z-10"
          />
        </div>

      </div>
      <h1 className="mt-2.5 text-2xl my-font ml-4 mb-2">Items in <span className="text-yellow-200 my-font animate-pulse-glow">{categoryName}</span></h1>

      <div>
        <div className="mb-[57px] mt-0 space-y-0.5 rounded-2xl -z-1">
          {itemsInMenus.map((item, index) => (
            <div key={index} className='bg-[#020901]  pr-3 flex items-center'>
              <div className="w-20 h-20 bg-[#0b0e0a] rounded-r-lg shrink-0"></div>
              <div className="grow ml-3">
                <p className='text-lg font-semibold text-green-200 my-font'>{item.name}</p>
                <p className='text-gray-200 text-xs'>₹{item.price}</p>
                <p className='line-clamp-2 text-[#6e6e6e] text-xs'>12345678 90123456 789456784 567845678456 78khk hjkkhkh</p>
              </div>
            </div>
          ))
          }
        </div >
      </div>
    </>
  )
}
