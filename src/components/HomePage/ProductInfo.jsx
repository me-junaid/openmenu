import { useContext } from "react";
import { ItemsContext } from "../../contexts/ItemsContext";
import { Wrong } from "../Icons/Wrong";
import { Plus } from "../Icons/Plus";


export const ProductInfo = () => {

  function getRandom1to100() {
    return Math.floor(Math.random() * 100) + 1;
  }

  const { openProductInfo, setOpenProductInfo, selectedItemDetails, updateSelectionCount } = useContext(ItemsContext);

  if (!openProductInfo) return null;
  console.log(selectedItemDetails);

  return (
    <div className="fixed z-10 left-0 right-0 bottom-0 top-[50px] w-full flex flex-col bg-white/10 dark:bg-black/40
      backdrop-blur-md" onClick={() => { if (openProductInfo) { setOpenProductInfo(false) } }}>
      <div className="mt-auto flex justify-center p-4 my-font">
        <button className="bg-white w-14 h-14 text-center shadow rounded-full flex justify-center items-center">
          <Wrong size={24} />
        </button>
      </div>
      <div className="rounded-t-[60px] border border-b-0 border-black/15 dark:border-white/15
      bg-white/80 dark:bg-black/40
      backdrop-blur-md
      text-sm text-black/70 dark:text-white/70
      hover:bg-white/60 dark:hover:bg-black/60
      transition
      overflow-hidden pb-10 max-h-2/3 overflow-y-scroll hide-scrollbar" onClick={(event) => { event.stopPropagation() }}>
        <div className="flex overflow-y-scroll gap-1 hide-scrollbar">
          {
            [1, 2, 3, 5, 6, 8, 9].map((item, index) => (
              <img key={index} src={`https://picsum.photos/200/300?random=${item * getRandom1to100()}`} className="dark:bg-white/3 bg-black/3 h-[280px] min-w-[280px] flex justify-center items-center"
              />
            ))
          }
        </div>
        <div className="mt-10 flex items-center">
          <div className="grow">
            <h1 className="text-4xl my-font dark:text-white text-black mx-10">
              {selectedItemDetails.name}
            </h1>
            <p className="text-lg font-bold ml-10">₹{selectedItemDetails.price}</p>
          </div>
          <button className="p-1 pr-3 rounded-lg shadow mr-2 flex justify-center items-center my-font text-xs bg-white self-center" onClick={() => {
            updateSelectionCount(
              selectedItemDetails.categoryId,
              selectedItemDetails.name,
              "increment"
            );
          }}><Plus />Add</button>
        </div>
      </div>
    </div>
  )
}
