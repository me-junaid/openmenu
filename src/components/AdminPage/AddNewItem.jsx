import React, { useContext, useState } from 'react'
import { AdminContext } from '../../contexts/AdminContext'
import { Close } from '../Icons/Close'
import { addItemToCategory } from '../../services/itemService';


export const AddNewItem = () => {
  const { canAddNewItem, setCanAddNewItem, idOfCategory } = useContext(AdminContext)

  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState(null)
  const [isOfferAvailable, setIsOfferAvailable] = useState(false)
  const [isLive, setIsLive] = useState(false)


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!idOfCategory) return alert("Category ID missing");

    try {

      const newItem = await addItemToCategory({
        categoryId: idOfCategory,
        name,
        price,
        description,
        image,
        isOfferAvailable,
        isLive
      });


      console.log("Item added:", newItem);

      // Reset
      setName("");
      setPrice("");
      setDescription("");
      setImage(null);
      setIsOfferAvailable(false);
      setIsLive(false);
      setCanAddNewItem(false);

    } catch (err) {
      console.error(err);
      alert("Failed to add item");
    }
  };

  if (!canAddNewItem) return null

  return (
    <div className="fixed justify-center items-center bottom-[50px] top-[50px] right-0 left-0 z-50 flex p-5 backdrop-blur-lg dark:bg-black/40 bg-white/40">
      <div
        className="
         max-w-xl mx-auto
          p-6 rounded-2xl
          bg-white/60 dark:bg-black/60
          backdrop-blur-xl
          border border-white/30 dark:border-white/10
          shadow-lg
          overflow-y-scroll
          h-full
          w-full
          hide-scrollbar
        "
      >
        {/* Header */}
        <div className="flex justify-between mb-6 gap-5">
          <h2 className="text-3xl my-font text-black dark:text-white">Add Item</h2>
          <button className={`flex ml-auto mt-2 p-2 active:bg-green-200/9 active:border-yellow-200 duration-200 bg-red-900/50 text-white/87  text-lg font-bold rounded-full items-center justify-between`} onClick={() => setCanAddNewItem(false)}>
            <span><Close /></span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Item Name */}
          <div>
            <label className="block text-sm mb-1 text-black/70 dark:text-white/70">
              Item Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="e.g. Kunafa"
              className="
                w-full px-4 py-2 rounded-xl
                bg-white/70 dark:bg-black/50
                border border-black/10 dark:border-white/10
                outline-none
                dark:text-white
                text-black
                focus:outline-0
              "
            />
          </div>

          {/* Item Price */}
          <div>
            <label className="block text-sm mb-1 text-black/70 dark:text-white/70">
              Price
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              placeholder="39"
              className="
                w-full px-4 py-2 rounded-xl
                bg-white/70 dark:bg-black/50
                border border-black/10 dark:border-white/10
                outline-none
                dark:text-white
                text-black
                focus:outline-0
              "
            />
          </div>
          <div>
            <label className="block text-sm mb-1 text-black/70 dark:text-white/70">
              Description about the product
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="• Spicy but delicious"
              className="
                w-full px-4 py-2 rounded-xl
                bg-white/70 dark:bg-black/50
                border border-black/10 dark:border-white/10
                outline-none
                dark:text-white
                text-black
                focus:outline-0
              "
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm mb-2 text-black/70 dark:text-white/70">
              Item Image
            </label>

            {/* Clickable upload area */}
            <label
              className="
      flex flex-col items-center justify-center
      w-[200px] aspect-square
      rounded-xl cursor-pointer
    
      border border-black/15 dark:border-white/15
      bg-white/40 dark:bg-black/40
      backdrop-blur-md
      text-sm text-black/70 dark:text-white/70
      hover:bg-white/60 dark:hover:bg-black/60
      transition
      overflow-hidden
    "
            >
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                className="hidden"
              />

              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="px-3 text-center">
                  Click to upload image
                </span>
              )}
            </label>
          </div>


          <div className="flex items-center justify-between">
            <span className="text-sm text-black/70 dark:text-white/70">
              Offer Available
            </span>

            <button
              type="button"
              onClick={() => setIsOfferAvailable(!isOfferAvailable)}
              className={`
                w-12 h-6 rounded-full transition-all
                ${isOfferAvailable ? "bg-green-500" : "bg-gray-300"}
                relative
              `}
            >
              <span
                className={`
                  absolute top-0.5 h-5 w-5 rounded-full bg-white shadow
                  transition-all
                  ${isOfferAvailable ? "left-6" : "left-1"}
                `}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-black/70 dark:text-white/70">
              Show to customers
            </span>

            <button
              type="button"
              onClick={() => setIsLive(!isLive)}
              className={`
                w-12 h-6 rounded-full transition-all
                ${isLive ? "bg-green-500" : "bg-gray-300"}
                relative
              `}
            >
              <span
                className={`
                  absolute top-0.5 h-5 w-5 rounded-full bg-white shadow
                  transition-all
                  ${isLive ? "left-6" : "left-1"}
                `}
              />
            </button>
          </div>

          <button
            type="submit"
            className="
              w-full mt-6 py-2 rounded-xl
              bg-green-500/70 my-font text-white font-semibold
              hover:bg-green-600
              transition
            "
          >
            Add Item
          </button>
        </form>
      </div>
    </div>
  )
}


// import React, { useContext, useState } from "react";
// import { AdminContext } from "../../contexts/AdminContext";
// import { Close } from "../Icons/Close";
// import { addItemToCategory } from "../../services/items";

// export const AddNewItem = ({ categoryId }) => {
//   const { canAddNewItem, setCanAddNewItem } = useContext(AdminContext);

//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [description, setDescription] = useState("");
//   const [image, setImage] = useState(null);
//   const [isOfferAvailable, setIsOfferAvailable] = useState(false);
//   const [isLive, setIsLive] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!categoryId) return alert("Category ID missing");

//     try {
//       setLoading(true);

//       const newItem = await addItemToCategory({
//         categoryId,
//         name,
//         price,
//         description,
//         image,
//         isOfferAvailable,
//         isLive
//       });

//       console.log("Item added:", newItem);

//       // Reset
//       setName("");
//       setPrice("");
//       setDescription("");
//       setImage(null);
//       setIsOfferAvailable(false);
//       setIsLive(false);
//       setCanAddNewItem(false);

//     } catch (err) {
//       console.error(err);
//       alert("Failed to add item");
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!canAddNewItem) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-5 backdrop-blur-lg bg-black/40">
//       <div className="max-w-xl w-full h-full overflow-y-scroll rounded-2xl bg-white/80 dark:bg-black/70 p-6">

//         {/* Header */}
//         <div className="flex justify-between mb-6">
//           <h2 className="text-3xl font-semibold">Add Item</h2>
//           <button
//             onClick={() => setCanAddNewItem(false)}
//             className="p-2 rounded-full bg-red-500 text-white"
//           >
//             <Close />
//           </button>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-5">

//           <input
//             type="text"
//             placeholder="Item name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//             className="w-full px-4 py-2 rounded-xl border"
//           />

//           <input
//             type="number"
//             placeholder="Price"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//             required
//             className="w-full px-4 py-2 rounded-xl border"
//           />

//           <input
//             type="text"
//             placeholder="Description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//             className="w-full px-4 py-2 rounded-xl border"
//           />

//           {/* Image */}
//           <label className="block w-[200px] aspect-square border rounded-xl cursor-pointer overflow-hidden">
//             <input
//               type="file"
//               accept="image/*"
//               hidden
//               onChange={(e) => setImage(e.target.files[0])}
//             />
//             {image ? (
//               <img
//                 src={URL.createObjectURL(image)}
//                 alt="Preview"
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <div className="flex items-center justify-center h-full text-sm">
//                 Click to upload
//               </div>
//             )}
//           </label>

//           {/* Offer Toggle */}
//           <Toggle
//             label="Offer Available"
//             value={isOfferAvailable}
//             onChange={() => setIsOfferAvailable(!isOfferAvailable)}
//           />

//           {/* Live Toggle */}
//           <Toggle
//             label="Show to customers"
//             value={isLive}
//             onChange={() => setIsLive(!isLive)}
//           />

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-2 rounded-xl bg-green-600 text-white"
//           >
//             {loading ? "Adding..." : "Add Item"}
//           </button>

//         </form>
//       </div>
//     </div>
//   );
// };

// /* Reusable toggle */
// const Toggle = ({ label, value, onChange }) => (
//   <div className="flex justify-between items-center">
//     <span>{label}</span>
//     <button
//       type="button"
//       onClick={onChange}
//       className={`w-12 h-6 rounded-full ${value ? "bg-green-500" : "bg-gray-300"} relative`}
//     >
//       <span
//         className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${value ? "left-6" : "left-1"
//           }`}
//       />
//     </button>
//   </div>
// );
