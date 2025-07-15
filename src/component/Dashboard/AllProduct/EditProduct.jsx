import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../../Hook/useAxios";
import Swal from "sweetalert2";
import useProducts from "../../Hook/useProducts";

const img_hosting = "f00f7709983a82bfc1ca5153ef794386";
const img_api_key = `https://api.imgbb.com/1/upload?key=${img_hosting}`;

const EditProduct = () => {
  const { id } = useParams();
  const axiosSecure = useAxios();
  const [products, isLoading, refetch] = useProducts();

  const product = products?.find((item) => item._id === id);

  if (isLoading || !product)
    return <p className="text-center py-20">Loading...</p>;
  // const [product, setProduct] = useState(null);

  // useEffect(() => {
  //   fetch("/product.json")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const found = data.find((item) => item._id === id);
  //       setProduct(found);
  //     });
  // }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const description = e.target.description.value;
    const category = e.target.category.value;
    const sub = e.target.sub?.value;

    const updatedImages = [];
    const imageUploadPromises = [];

    for (let i = 0; i < 3; i++) {
      const file = e.target[`image${i}`]?.files?.[0];
      const price = e.target[`price${i}`]?.value;

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
          }));

        imageUploadPromises.push(uploadPromise);
      }
    }

    Promise.all(imageUploadPromises).then((uploadedImages) => {
      const updatedData = {
        name,
        category,
        description,
        images: uploadedImages.length > 0 ? uploadedImages : product.images,
        sub,
      };

      axiosSecure.patch(`/products/${id}`, updatedData).then(() => {
        Swal.fire({
          title: "Product Updated",
          icon: "success",
        });
      });
    });
  };

  if (!product) return <p className="text-center py-20">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center py-10 px-4">
      <form
        onSubmit={handleUpdate}
        className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-xl space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-4">
          Edit Product
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
            defaultValue={product.name}
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Category Dropdown */}
        {product?.category && (
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Category
            </label>
            <select
              name="category"
              defaultValue={product.category}
              required
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option disabled value="">
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
        )}

        {/* Sub Category Dropdown */}
        {product?.sub && (
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Sub Category (optional)
            </label>
            <select
              name="sub"
              defaultValue={product.sub || ""}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              <option value="">Choose Sub Category</option>
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
        )}

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            required
            defaultValue={product.description}
            rows="3"
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
          ></textarea>
        </div>

        {/* Image & Price Inputs */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-700">
            Update up to 3 new images with prices (optional)
          </label>

          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <input
                type="file"
                name={`image${i}`}
                accept="image/*"
                
                className="p-2 border rounded w-full"
              />
              <input
                type="number"
                name={`price${i}`}
                step="0.01"
                placeholder="Price"
                className="p-2 border rounded w-40"
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
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
