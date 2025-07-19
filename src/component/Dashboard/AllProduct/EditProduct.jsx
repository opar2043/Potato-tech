
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

  const [category, setCategory] = useState("");
  const [sub, setSub] = useState("");
  const [features, setFeatures] = useState([]);
  const [images, setImages] = useState([{ file: null, price: "", color: "" }]);

  useEffect(() => {
    if (product) {
      setCategory(product.category || "");
      setSub(product.sub || "");
      setFeatures(product.features || []);
    }
  }, [product]);

  if (isLoading || !product)
    return <p className="text-center py-20">Loading...</p>;

  function handleFeature(idx, field, value) {
    const update = [...features];
    update[idx][field] = value;
    setFeatures(update);
  }

  function addFeature() {
    setFeatures([...features, { features: "", value: "" }]);
  }

  function removeFeature(index) {
    const updated = features.filter((_, i) => i !== index);
    setFeatures(updated);
  }

  function handleImageChange(index, field, value) {
    const updated = [...images];
    updated[index][field] = field === "file" ? value.target.files[0] : value;
    setImages(updated);
  }

  function addImageField() {
    setImages([...images, { file: null, price: "", color: "" }]);
  }

  function removeImageField(index) {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const description = e.target.description.value;
    const stock = e.target.stock.value;

    const imageUploadPromises = [];

    images.forEach(({ file, price, color }) => {
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
            color,
          }));

        imageUploadPromises.push(uploadPromise);
      }
    });

    Promise.all(imageUploadPromises).then((newImages) => {
      const updatedData = {
        name,
        description,
        category,
        sub,
        features,
        images: newImages.length > 0 ? newImages : product.images,
        stock,
      };

      axiosSecure.patch(`/products/${id}`, updatedData).then(() => {
        Swal.fire({
          title: "Product Updated",
          icon: "success",
        });
        refetch();
      });
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center py-10 px-4">
      <form
        onSubmit={handleUpdate}
        className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-xl space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-4">
          Edit Product
        </h2>

        <div className="flex justify-end items-center gap-1">
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700 w-full">
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
          <div className="w-full">
            <label className="block text-sm font-semibold text-gray-700 w-full">
             If Available, write (available)
            </label>
            <input
              type="text"
              name="stock"
              required
              defaultValue={product.stock || "available"}
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
            />
          </div>
        </div>

        <div className="flex gap-2 flex-col md:flex-row">
          <div className="w-full">
            <select
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              required
              className="select text-gray-700 border font-semibold border-gray-300 w-full max-w-xs"
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

          <div className="w-full">
            <select
              value={sub}
              onChange={(e) => setSub(e.target.value)}
              className="select text-gray-700 border font-semibold border-gray-300 w-full max-w-xs"
            >
              <option disabled value="">
                Choose Product Sub Category
              </option>
              {category === "Keyboard" && (
                <>
                  <option value="Weikav">Weikav</option>
                  <option value="Aula">Aula</option>
                  <option value="Leobog">Leobog</option>
                </>
              )}
              {category === "Switch" && (
                <>
                  <option value="Tactile">Tactile</option>
                  <option value="Linear">Linear</option>
                  <option value="Silent">Silent</option>
                  <option value="Clicky">Clicky</option>
                </>
              )}
              {category === "Keycaps" && (
                <>
                  <option value="Clicky">Clicky</option>
                  <option value="OEM">OEM</option>
                  <option value="MOA/KOA">MOA/KOA</option>
                  <option value="Comic">Comic</option>
                  <option value="Topographic">Topographic</option>
                  <option value="Shine Through">Shine Through</option>
                </>
              )}
              {category === "Keyboard Accessories" && (
                <>
                  <option value="Lube">Lube</option>
                  <option value="Moding tools">Moding tools</option>
                </>
              )}
              {category === "Mouse" && (
                <>
                  <option value="ATK">ATK</option>
                  <option value="VXE">VXE</option>
                </>
              )}
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            rows="3"
            required
            defaultValue={product.description}
            className="w-full mt-1 p-3 border border-gray-300 rounded-lg"
          ></textarea>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-700">
            Replace images (optional)
          </label>

          {images.map((img, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-3 items-center gap-3"
            >
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(i, "file", e)}
                className="p-2 border rounded w-full"
              />
              <input
                type="number"
                placeholder="Price"
                value={img.price}
                onChange={(e) => handleImageChange(i, "price", e.target.value)}
                className="p-2 border rounded w-full"
              />
              <div className="flex gap-1 items-center">
              <input
                type="text"
                placeholder="Color"
                value={img.color}
                onChange={(e) => handleImageChange(i, "color", e.target.value)}
                className="p-2 border rounded w-full"
              />
                <button
                type="button"
                onClick={() => removeImageField(i)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                ✕
              </button>
              </div>


            </div>
          ))}

          <button
            type="button"
            onClick={addImageField}
            className="mt-2 px-3 py-1 bg-green-500 text-white rounded"
          >
            + Add More Image
          </button>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Product Features
          </label>

          {features?.map((item, idx) => (
            <div key={idx} className="flex gap-2 items-center mb-2">
              <input
                type="text"
                placeholder="Feature"
                value={item.features}
                onChange={(e) => handleFeature(idx, "features", e.target.value)}
                className="p-2 border rounded w-full"
                required
              />
              <input
                type="text"
                placeholder="Attribute"
                value={item.value}
                onChange={(e) => handleFeature(idx, "value", e.target.value)}
                className="p-2 border rounded w-full"
                required
              />
              <button
                type="button"
                onClick={() => removeFeature(idx)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
                ✕
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addFeature}
            className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
          >
            + Add Feature
          </button>
        </div>

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
