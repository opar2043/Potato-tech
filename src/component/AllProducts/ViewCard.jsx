import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaBox,
  FaCoins,
  FaHeart,
  FaHome,
  FaRegHeart,
  FaShoppingCart,
} from "react-icons/fa";
import useAxios from "../Hook/useAxios";
import Swal from "sweetalert2";
import useProducts from "../Hook/useProducts";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const ViewCard = () => {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const axiossecure = useAxios();
  const [products, isLoading, refetch] = useProducts();

  // useEffect(() => {
  //   fetch("/product.json")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setProduct(data);
  //     });
  // }, [id]);

  const myProduct = products.find((pro) => pro._id == id) || {};
  const {
    name,
    description,
    category,
    images = [],
    sub,
    _id,
    features,
    stock,
    sortdes,
  } = myProduct;
  console.log(myProduct);

  const imageList = images.map((item) => item.img);
  const selectedImage = imageList[currentImageIndex];
  const selectedPrice = images[currentImageIndex]?.price || 0;
  const offerPrice = images[currentImageIndex]?.prePrice || 0;
  const itemStock = images[currentImageIndex]?.itemStock || 0;
  console.log(itemStock);
  console.log(selectedImage , 'image');

  console.log(imageList , 'here');

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
        refetch();
      }
    });
  }

  return (
    <div>
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="relative w-full aspect-square bg-gray-100 rounded-lg overflow-hidden shadow-md">
            <img
              src={selectedImage}
              alt={name}
              className="w-full h-full object-cover"
            />
            <span
              className={`absolute top-4 left-4 px-2 py-1 text-xs font-semibold rounded 
    ${
      itemStock == "available" ? "bg-green-500 text-white" : "bg-red-500 text-white"
    }`}
            >
              {itemStock == "available" ? "Available" : "Out of Stock"}
            </span>
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
        <div className="relative flex flex-col justify-center gap-4 ">
          <h1 className="text-3xl font-semibold text-gray-800">{name} </h1>

          <p className="text-gray-600">
            {category} ({sub || "Only Variant"})
          </p>
          <ul className="list-disc ml-5 text-gray-700">
            {sortdes
              ? sortdes
                  ?.split(".")
                  .map((line, index) =>
                    line.trim() ? <li key={index}>{line.trim()}.</li> : null
                  )
              : "No Short Description Given"}
          </ul>

          <div className="flex flex-col  font-semibold justify-start gap-5">
            <div className="flex items-center gap-3 text-lg font-medium">
              <span className="text-[#0FABCA] font-semibold flex items-center gap-2 text-lg">
                <FaCoins className="text-yellow-400" />
                {selectedPrice} TK 
                {offerPrice && (
                  <span className="text-red-400 italic line-through text-md font-semibold ml-3">
                    ({offerPrice})
                  </span>
                )}
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
          <div>
            {/* Color Changes Dynamically */}
            <div>
              <div className="flex gap-2 justify-start flex-row">
                {images.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative p-1  flex items-center justify-center text-white font-semibold rounded transition-all duration-300 text-xs ${
                      currentImageIndex === index
                        ? "bg-[#0FABCA] ring-2 ring-[#0FABCA] "
                        : "bg-gray-400 hover:ring-2 hover:ring-[#0FABCA]"
                    }`}
                  >
                    {item.color}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-3">
            <Link to={`/checkout`} className="w-full">
              <button className="w-full mt-6 px-6 py-3 bg-[#0FABCA] hover:bg-blue-600 text-white rounded-md hover:bg-[#0FABCA]/90">
                Go to Checkout Page
              </button>
            </Link>

            {/* {   stock == 'available' ?         <button
              onClick={handleAddtoCart}
              className="w-full flex items-center gap-3 justify-center mt-6 px-6 py-3 bg-red-600 text-white rounded-md hover:bg-orange-500"
            >
              <FaShoppingCart /> Add To Cart
            </button> :
             <button
              onClick={handleAddtoCart}
              className="w-full flex items-center gap-3 justify-center mt-6 px-6 py-3 bg-red-600 text-white rounded-md hover:bg-orange-500"
            >
              <FaShoppingCart /> Add To Cart
            </button>
            } */}

            <button
              onClick={handleAddtoCart}
              disabled={!stock == "available"}
              className={`w-full flex items-center gap-3 justify-center mt-6 px-6 py-3 rounded-md transition duration-300
    ${
      itemStock == "available"
        ? "bg-red-600 hover:bg-orange-500 text-white cursor-pointer"
        : "bg-gray-400 text-gray-200 cursor-not-allowed"
    }
  `}
            >
              <FaShoppingCart />{" "}
              {stock == "available" ? "Add To Cart" : "Out of Stock"}
            </button>
          </div>
        </div>
      </div>

      {/* Tab Panel */}

      <div className="flex my-5 justify-center items-center w-full">
        <div className="w-full ">
          <Tabs className="w-full ">
            <TabList className="text-center">
              <Tab>Description</Tab>
              <Tab>Features </Tab>
            </TabList>

            {/* Description Tab */}
            <TabPanel className="w-full mt-4">
              <ul className="list-disc ml-5 text-gray-700">
                {description
                  ?.split(".")
                  .map((line, index) =>
                    line.trim() ? <li key={index}>{line.trim()}.</li> : null
                  )}
              </ul>
            </TabPanel>

            {/* Features Tab */}
            <TabPanel className="w-full mt-4 overflow-x-auto">
              <table className="w-full border border-gray-300 text-left">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="p-2 border">#</th>
                    <th className="p-2 border">Feature</th>
                    <th className="p-2 border"></th>
                  </tr>
                </thead>
                <tbody>
                  {features &&
                    features.map((item, idx) => (
                      <tr key={idx} className="hover:bg-gray-100">
                        <td className="p-2 border">{idx + 1}</td>
                        <td className="p-2 border">{item.features}</td>
                        <td className="p-2 border">{item.value}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ViewCard;

