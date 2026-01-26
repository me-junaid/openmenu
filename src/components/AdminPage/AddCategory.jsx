import React, { useContext, useState } from 'react'
import { AdminContext } from '../../contexts/AdminContext'
import { Close } from '../Icons/Close'

export const AddCategory = () => {
  const { canAddCategory, setCanAddCategory } = useContext(AdminContext)

  const [name, setName] = useState("")
  const [image, setImage] = useState(null)
  const [isOfferAvailable, setIsOfferAvailable] = useState(false)
  const [isLive, setIsLive] = useState(false)

  
  const handleSubmit = (e) => {
    e.preventDefault()

    const payload = {
      name,
      image,
      isOfferAvailable,
      isLive
    }

    console.log("Category data:", payload)

    setName("")
    setImage(null)
    setIsOfferAvailable(false)
    setIsLive(false)

    setCanAddCategory(false)
  }

  if (!canAddCategory) return null

  return (
    <div className="fixed justify-center items-center bottom-[50px] top-[50px] right-0 left-0 z-50 flex p-5 backdrop-blur-lg bg-black/40">
      <div
        className="
         max-w-xl mx-auto
          p-6 rounded-2xl
          bg-white/60 dark:bg-black/60
          backdrop-blur-xl
          border border-white/30 dark:border-white/10
          shadow-lg
        "
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6 gap-5">
          <h2 className="text-3xl my-font text-black dark:text-white">Add Category</h2>
          <button className={`flex ml-auto mt-2 p-2 active:bg-green-200/9 active:border-yellow-200 duration-200 bg-red-900/50 text-white/87  text-lg font-bold rounded-full items-center justify-between`} onClick={() => setCanAddCategory(false)}>
            <span><Close /></span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Category Name */}
          <div>
            <label className="block text-sm mb-1 text-black/70 dark:text-white/70">
              Category Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="e.g. Snacks"
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
              Category Image
            </label>

            {/* Clickable upload area */}
            <label
              className="
      flex flex-col items-center justify-center
      w-[200px] aspect-square
      rounded-xl cursor-pointer
      border border-white/30 dark:border-white/10
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
                  Click to upload<br />category image
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
            Add Category
          </button>
        </form>
      </div>
    </div>
  )
}
