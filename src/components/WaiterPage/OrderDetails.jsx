import { useSearchParams } from "react-router-dom";
import { Menu } from "../Icons/Menu";
import { useContext } from "react";
import { ItemsContext } from "../../contexts/ItemsContext";

export const OrderDetails = () => {

  const [searchParams] = useSearchParams();

  const { selectedItems } = useContext(ItemsContext);


  const table = searchParams.get("table");
  const token = searchParams.get("token");

  return (
    <div className={`top-[50px] fixed inset-0 bg-black flex flex-col`}>
      <div className="flex items-center p-3 pt-8 gap-2">
        <Menu width={35} height={35} />
        <h1 className="font-bold text-5xl my-font">Table : {table}</h1>
      </div>

      <p className="text-gray-400 pl-4 pb-2">Order ID: {token}</p>

      <div className=" p-2 pt-0 grow overflow-y-scroll hide-scrollbar">

        <div className="flex flex-col gap-2 ">
          {selectedItems.map((item) => {
            return (
              <div className="bg-green-900/9 p-3 flex justify-between items-center rounded-lg" key={item.name}>
                <div className="">
                  <div> {item.name}</div>
                  <div className="text-xs">₹{item.price}</div>
                </div>
                <div className="text-xl">x {item.quantity}</div>
              </div>
            )
          }
          )}
        </div>
      </div>
      <div className={`flex min-h-16 bg-black p-3 pt-1 justify-between`}>
        <div className=" flex justify-center items-center">
          {selectedItems.length} {selectedItems.length === 1 ? "item" : "items"} selected
        </div>
      </div>
    </div>

  )
}