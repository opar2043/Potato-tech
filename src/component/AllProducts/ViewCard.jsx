import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaHeart, FaHome, FaRegHeart } from "react-icons/fa";

const ViewCard = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetch("/product.json")
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      });
  }, [id]);

  const myProduct = product.find((pro) => pro._id == id) || {};
  const {
    name,
    price,
    description,
    category,
    image,
    images = [],
  } = myProduct || {};
  const imageList = images.length ? images : [image, image, image];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Image Gallery */}
      <div className="space-y-4">
        <div className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-md">
          <img
            src={imageList[currentImageIndex]}
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
      <div className="flex flex-col justify-center gap-4">
        <h1 className="text-3xl font-semibold text-gray-800">{name}</h1>
        <p className="text-gray-600">{category}</p>
        <p className="text-gray-600">{description}</p>
        <div className="flex items-center gap-3 text-lg font-medium">
          <span className="text-[#0FABCA]">${price}</span>
        </div>

        <div className="flex flex-col md:flex-row gap-3">
          <Link to={'/checkout'} className="w-full">
            <button className="w-full mt-6 px-6 py-3 bg-[#0FABCA] hover:bg-blue-600 text-white rounded-md hover:bg-[#0FABCA]/90">
            Go to Checkout Page
          </button>
          </Link>


          <Link to={"/allproducts"} className="w-full">
            <button className="w-full flex items-center gap-3 justify-center mt-6 px-6 py-3 bg-red-600 text-white rounded-md hover:bg-[#0FABCA]/90">
              <FaHome></FaHome> All Product Page
            </button>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default ViewCard;
