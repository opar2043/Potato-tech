import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useAxios from '../../Hook/useAxios';
import Swal from 'sweetalert2';
const img_hosting = 'f00f7709983a82bfc1ca5153ef794386'
const img_api_key = `https://api.imgbb.com/1/upload?key=${img_hosting}`;
const EditProduct = () => {
    const {id} = useParams();
    const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/product.json")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

   const axiosSecure = useAxios();

  const handleEdit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const category = form.category.value;
    const description = form.description.value;
    const price = form.price.value;
    const imageFile = form.image.files[0];



    const formData = new FormData();
    formData.append('image', imageFile);

    fetch(img_api_key, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        const image = imgData.data.url;
        
      });
  };


  const editItem = products && products.find(edit => edit._id == id);
   const { name, price, description, category, image } = editItem || {};
  return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center py-10 px-4">
      <form
        onSubmit={''}
        className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-xl space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-4">
          Edit Item
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
            defaultValue={name}
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Category */}
        <div>
       <label className="block text-sm font-semibold text-gray-700">
            Category
          </label>
          {   category &&
          <input
            type="text"
            name="category"
            required
            defaultValue={category}
            placeholder="e.g. Marine Life"
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />}
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
            defaultValue={description}
            placeholder="Brief summary about the book..."
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          ></textarea>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-1">
          {/* Price */}
          <div className='w-full md:w-1/2'>
            <label className="block  text-sm font-semibold text-gray-700">
              Price ($)
            </label>
            <input
              type="number"
              name="price"
              step="0.01"
              required
              defaultValue={price}
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
              defaultValue={image}
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

export default EditProduct