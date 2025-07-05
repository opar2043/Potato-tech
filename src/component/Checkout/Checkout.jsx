import React from 'react'
import useAxios from '../Hook/useAxios';
import Swal from 'sweetalert2';
const img_hosting = 'f00f7709983a82bfc1ca5153ef794386'
const img_api_key = `https://api.imgbb.com/1/upload?key=${img_hosting}`;
const Checkout = () => {
      const axiosSecure = useAxios();

  function handleAdd(e) {
    e.preventDefault();
    const name = e.target.name.value;
    const category = e.target.category.value;
    const description = e.target.description.value;
    const price = e.target.price.value;
    const image = e.target.image.files[0];

    const data = new FormData();
    data.append("image", image);

    fetch(img_api_key, {
      method: "POST",
      body: data,
    })
    .then((res) => res.json())
    .then(data => {
      console.log(data);
 

    const productObj = {
      name,
      category,
      description,
      price,
      image: data.data.url
    };

    axiosSecure.post("/products", productObj)
    .then((res) => {
      Swal.fire({
        title: "Item Added",
        icon: "success",
      });
    });

   })

   e.target.reset()

  }
  return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center py-10 px-4">
      <form
        onSubmit={handleAdd}
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
            name="name"
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

        <div className="flex justify-between items-center gap-1">
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

export default Checkout