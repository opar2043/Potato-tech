import React from 'react'

const AddProduct = () => {
  return (
<div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center py-10 px-4">
  <form
    onSubmit={''}
    className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-xl space-y-6"
  >
    <h2 className="text-3xl font-bold text-center text-blue-700 mb-4">
     Add a New Item
    </h2>

    {/* Book Title */}
    <div>
      <label className="block text-sm font-semibold text-gray-700">
        Item Name
      </label>
      <input
        type="text"
        name="title"
        required
        placeholder="e.g. The Coral Kingdom"
        className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>

    {/* Category */}
    <div>
      <label className="block text-sm font-semibold text-gray-700">
        Category
      </label>
      <input
        type="text"
        name="category"
        required
        placeholder="e.g. Marine Life"
        className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>



    {/* Description */}
    <div>
      <label className="block text-sm font-semibold text-gray-700">
        Description
      </label>
      <textarea
        name="description"
        rows="3"
        required
        placeholder="Brief summary about the book..."
        className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
      ></textarea>
    </div>

    <div className='flex justify-between items-center gap-1'>
        {/* Price */}
    <div>
      <label className="block text-sm font-semibold text-gray-700">
        Price ($)
      </label>
      <input
        type="number"
        name="price"
        step="0.01"
        required
        placeholder="e.g. 12.99"
        className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>

    {/* Image Upload */}
    <div>
      <label className="block text-sm font-semibold text-gray-700">
        Item Cover Image
      </label>
      <input
        type="file"
        name="image"
        accept="image/*"
        required
        className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
    </div>
    </div>



    {/* Submit */}
    <div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow hover:bg-blue-700 transition"
      >
         Save Product
      </button>
    </div>
  </form>
</div>

  )
}

export default AddProduct