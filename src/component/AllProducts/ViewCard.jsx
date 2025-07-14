import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaBox, FaHeart, FaHome, FaRegHeart, FaShoppingCart } from "react-icons/fa";
import useAxios from "../Hook/useAxios";
import Swal from "sweetalert2";
import useProducts from "../Hook/useProducts";

const ViewCard = () => {
  const { id } = useParams();
  // const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const axiossecure = useAxios();
  const [products , isLoading , refetch ] = useProducts()

  // useEffect(() => {
  //   fetch("/product.json")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setProduct(data);
  //     });
  // }, [id]);

  const myProduct = products.find((pro) => pro._id == id) || {};
  const { name, description, category, images = [], sub, _id } = myProduct;
  console.log(myProduct);

  const imageList = images.map((item) => item.img); // Extract only image URLs
  const selectedImage = imageList[currentImageIndex]; // Image to display
  const selectedPrice = images[currentImageIndex]?.price || 0; // Price based on current image

  function handleAddtoCart() {
    const cartItem = {
      itemId: _id,
      name: myProduct.name,
      price: selectedPrice,
      image: selectedImage,
    };

    axiossecure.post("/add-to-cart", cartItem).then((res) => {
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${name} added to cart`,
          showConfirmButton: false,
          timer: 1000,
        });
        refetch()
      }
    });
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Image Gallery */}
      <div className="space-y-4">
        <div className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-md">
          <img
            src={selectedImage}
            alt={name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 px-2 py-1 text-xs font-semibold bg-black text-white rounded">
            {category}
          </div>
        </div>

        {/* Thumbnails */}
        <div className="flex gap-4 justify-between">
          {imageList.map((img, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`relative w-[6rem] aspect-square transition-all duration-300 rounded overflow-hidden ${
                currentImageIndex === index
                  ? "ring-2 ring-[#0FABCA]"
                  : "hover:ring-2 hover:ring-[#0FABCA]"
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-col justify-center gap-4 ">
        <h1 className="text-3xl font-semibold text-gray-800">{name}</h1>
        <p className="text-gray-600">
          {category} ({sub || "Only Variant"})
        </p>
        <p className="text-gray-600">{description}</p>

        <div className="flex items-center font-semibold justify-start gap-5">
          <div className="flex items-center gap-3 text-lg font-medium">
            <span className="text-[#0FABCA] font-semibold">
              ${selectedPrice.toFixed(2)}{" "}
            </span>
          </div>

          <div>
            <Link to={"/allproducts"}>
              <button className="btn btn-xs px-6 py-4 border rounded border-[#0FABCA] hover:bg-[#0FABCA] hover:text-white text-[#0FABCA] text-sm">
                <FaBox /> Go to All Products
              </button>
            </Link>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-3">
          <Link to={`/checkout`} className="w-full">
            <button className="w-full mt-6 px-6 py-3 bg-[#0FABCA] hover:bg-blue-600 text-white rounded-md hover:bg-[#0FABCA]/90">
              Go to Checkout Page
            </button>
          </Link>

          <button
            onClick={handleAddtoCart}
            className="w-full flex items-center gap-3 justify-center mt-6 px-6 py-3 bg-red-600 text-white rounded-md hover:bg-orange-500"
          >
            <FaShoppingCart /> Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewCard;
