import React, { useState } from "react";
import useAxios from "../../Hook/useAxios";
import Swal from "sweetalert2";

const img_hosting = "f00f7709983a82bfc1ca5153ef794386";
const img_api_key = `https://api.imgbb.com/1/upload?key=${img_hosting}`;

const AddProduct = () => {
  const axiosSecure = useAxios();
  const [category, setCategory] = useState("mouse");
  const [sub, setSub] = useState("");
  function handleAdd(e) {
    e.preventDefault();
    const name = e.target.name.value;
    
    const description = e.target.description.value;

    const imageUploadPromises = [];

    for (let i = 0; i < 5; i++) {
      const file = e.target[`image${i}`]?.files?.[0];
      const price = e.target[`price${i}`]?.value;
      const color = e.target[`color${i}`]?.value;

      if (file && price) {
        const formData = new FormData();
        formData.append("image", file);

        const uploadPromise = fetch(img_api_key, {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then((imgData) => ({
            img: imgData.data.url,
            price: parseFloat(price),
            color
          }));

        imageUploadPromises.push(uploadPromise);
      }
    }

    Promise.all(imageUploadPromises).then((images) => {
      const productObj = {
        name,
        category,
        description,
        images,
        sub,
      };
      console.log(productObj);

      axiosSecure
        .post("/products", productObj)
        .then(() => {
          Swal.fire({
            title: "Item Added",
            icon: "success",
          });
        })
        .catch((err) => {
          console.error(err);
          Swal.fire({
            title: "Something went wrong",
            icon: "error",
          });
        });

      e.target.reset();
    });
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

        {/* Item Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Item Name
          </label>
          <input
            type="text"
            name="name"
            required
            placeholder="e.g. Eco-Friendly Bottle"
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Category */}
        <div className="flex gap-2 flex-col md:flex-row">
          {/* Category Dropdown */}
          <div className="w-full">
            <select
              onChange={(e) => setCategory(e.target.value)}
              className="select text-gray-700 border font-semibold border-gray-300 w-full max-w-xs"
            >
              <option disabled value={""}>
                Choose Product Category
              </option>
              <option value="Keyboard">Keyboard</option>
              <option value="Switch">Switch</option>
              <option value="Keycaps">Keycaps</option>
              <option value="Keyboard Accessories">Keyboard Accessories</option>
              <option value="Mouse">Mouse</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Subcategory Dropdown */}
          <div className="w-full">
            <select
              value={sub}
              onChange={(e) => setSub(e.target.value)}
              className="select text-gray-700 border font-semibold border-gray-300 w-full max-w-xs"
            >
              <option disabled value="">
                Choose Product Sub Category
              </option>
              <option value="Weikav">Weikav</option>
              <option value="Silent">Silent</option>
              <option value="Clicky">Clicky</option>
              <option value="OEM">OEM</option>
              <option value="Cherry">Cherry</option>
              <option value="Lube">Lube</option>
              <option value="Moding tools">Moding tools</option>
              <option value="VXE">VXE</option>
              <option value="Aula">Aula</option>
              <option value="Topographic">Topographic</option>
              <option value="Other">Other</option>
            </select>
          </div>
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
            placeholder="Brief description of the product..."
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          ></textarea>
        </div>

        {/* Multiple Images + Prices */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-700">
            Upload up to 5 images with prices
          </label>

          {[0, 1, 2,3,4].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <input
                type="file"
                name={`image${i}`}
                accept="image/*"
                className="p-2 border rounded w-full"
                required
              />
              <input
                type="number"
                name={`price${i}`}
                step="0.01"
                placeholder="Price"
                className="p-2 border rounded w-40"
                required
              />
              <input
                type="text"
                name={`color${i}`}
                step="0.01"
                placeholder="Color"
                className="p-2 border rounded w-40"
                required
              />
            </div>
          ))}
        </div>

        {/* Submit Button */}
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
  );
};

export default AddProduct;
