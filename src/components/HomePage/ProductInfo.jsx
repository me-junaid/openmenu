import { useContext } from "react"
import { ItemsContext } from "../../contexts/ItemsContext"

export const ProductInfo = () => {

  const { openProductInfo, setOpenProductInfo } = useContext(ItemsContext);

  if (!openProductInfo) return null;
  const { selectedItemDetails } = useContext(ItemsContext)
  console.log(selectedItemDetails);

  return (
    <div className="fixed z-10 inset-0 top-[50px] w-full flex flex-col bg-white/10 dark:bg-black/40
      backdrop-blur-md" onClick={() => { if (openProductInfo) { setOpenProductInfo(false) } }}>
      <div className="mt-auto h-1/2 rounded-t-[60px] border border-b-0 border-black/15 dark:border-white/15
      bg-white/80 dark:bg-black/40
      backdrop-blur-md
      text-sm text-black/70 dark:text-white/70
      hover:bg-white/60 dark:hover:bg-black/60
      transition
      overflow-hidden p-10">
        <h1 className="text-4xl my-font text-black">
          {selectedItemDetails.name}
        </h1>
        <p className="text-lg font-bold">₹{selectedItemDetails.price}</p>
      </div>
    </div>
  )
}
