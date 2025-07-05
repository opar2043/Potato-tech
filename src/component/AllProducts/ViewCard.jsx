import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const ViewCard = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetch("/product.json")
      .then((res) => res.json())
      .then((data) => {
        
        setProduct(data);
      });
  }, [id]);

  console.log(id);
  console.log(product);

  const myProduct = product.find(pro => pro._id  == id) || {};

  console.log(myProduct);

  const { name, price, description, category, image } = myProduct || {};


  return (
    <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        
      <div className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-md">
        <img
          src={image }
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 px-2 py-1 text-xs font-semibold bg-black text-white rounded">
          {category}
        </div>
      </div>

    
      <div className="flex flex-col justify-center gap-4">
        <h1 className="text-3xl font-semibold text-gray-800">{name}</h1>
        <p className="text-gray-600">{description}</p>
        <div className="flex items-center gap-3 text-lg font-medium">
          <span className="text-[#0FABCA]">${price}</span>
        </div>

        {/* Quantity & Wishlist */}
        <div className="flex items-center gap-4 mt-4">
          <div className="flex items-center bg-gray-100 rounded-md">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-4 py-2 text-xl hover:bg-gray-200 rounded-l-md"
            >
              −
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value) || 1))
              }
              className="w-12 text-center bg-transparent outline-none"
            />
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-4 py-2 text-xl hover:bg-gray-200 rounded-r-md"
            >
              +
            </button>
          </div>

          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className="flex items-center gap-2 border px-4 py-2 rounded-md hover:bg-gray-100"
          >
            {isFavorite ? (
              <FaHeart className="text-red-500" />
            ) : (
              <FaRegHeart className="text-gray-700" />
            )}
            Wishlist
          </button>
        </div>

        <button className="w-full mt-6 px-6 py-3 bg-[#0FABCA] text-white rounded-md hover:bg-[#0FABCA]/90">
          Add to Cart
        </button>
      </div>


    </div>
  );
};

export default ViewCard;







