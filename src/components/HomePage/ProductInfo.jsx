import { useContext } from "react"
import { ItemsContext } from "../../contexts/ItemsContext"

export const ProductInfo = () => {

  const { openProductInfo, setOpenProductInfo } = useContext(ItemsContext);

  if (!openProductInfo) return null;
  const { selectedItemDetails } = useContext(ItemsContext)
  console.log(selectedItemDetails);

  return (
    <div className="fixed z-10 left-0 right-0 bottom-0 top-[50px] w-full flex flex-col bg-white/10 dark:bg-black/40
      backdrop-blur-md" onClick={() => { if (openProductInfo) { setOpenProductInfo(false) } }}>
      <div className="mt-auto rounded-t-[60px] border border-b-0 border-black/15 dark:border-white/15
      bg-white/80 dark:bg-black/40
      backdrop-blur-md
      text-sm text-black/70 dark:text-white/70
      hover:bg-white/60 dark:hover:bg-black/60
      transition
      overflow-hidden py-10 max-h-2/3 overflow-y-scroll hide-scrollbar" onClick={(event) => { event.stopPropagation()  }}>
        <h1 className="text-4xl my-font dark:text-white text-black mx-10">
          {selectedItemDetails.name}
        </h1>
        <p className="text-lg font-bold mb-2 ml-10">₹{selectedItemDetails.price}</p>
        <div className="flex overflow-y-scroll gap-1 hide-scrollbar px-10">
          {
            [1, 2, 3].map((item, index) => (
              <div key={index} className="dark:bg-white/3 bg-black/3 rounded-2xl h-[250px] min-w-[250px] flex justify-center items-center">
                {item}
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
