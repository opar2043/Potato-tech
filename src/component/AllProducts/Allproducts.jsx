import React, { useEffect, useState } from "react";
import Card from "./Card";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const Allproducts = () => {
  const [products, setProducts] = useState([]);
  const [mouse, setMouse] = useState("");
  const [search, setSearch] = useState("");
  const [dbSearch, setDbSearch] = useState("");

  useEffect(() => {
     fetch(`https://potato-tech-server.vercel.app/products?category=${mouse}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, [mouse]);
  console.log(mouse);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDbSearch(search.trim().toLowerCase());
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const filterItem = products.filter(
    (item) =>
      dbSearch === "" ||
      item.name?.toLowerCase().includes(dbSearch) ||
      item.category?.toLowerCase().includes(dbSearch)
  );

  function handleSort(e) {
    const value = e.target.value;
    let sortedProducts = [...products];

    if (value === "lowToHigh") {
      sortedProducts.sort(
        (a, b) => (a.images?.[0]?.price || 0) - (b.images?.[0]?.price || 0)
      );
    } else if (value === "highToLow") {
      sortedProducts.sort(
        (a, b) => (b.images?.[0]?.price || 0) - (a.images?.[0]?.price || 0)
      );
    }

    setProducts(sortedProducts);
  }

  function reset() {
    setSearch("");
    setMouse("");
  }

  return (
    <div className="my-10">
      <div className="my-8 flex flex-col md:flex-row justify-between md:items-center">
        {/* Breadcrumb */}
        <div className="font-semibold">
          <Link to="/">
            <span className="text-col hover:text-pink-500">Home </span>
          </Link>
          / All Products
        </div>

        {/* Search */}
        <div className="flex-1">
          <div className="flex justify-end my-3">
            <div className="w-full md:w-2/3 flex flex-row justify-center items-center gap-4 p-2 border rounded-xl shadow-md bg-white mx-auto">
              <div className="w-full flex items-center pl-2">
                <FaSearch />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by item name"
                  className="w-full rounded-lg px-4 py-2 outline-0 shadow-sm text-sm"
                />
              </div>
              <button className="btn bg-color text-white">Search</button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-row md:flex-col gap-2">
          {/* Category */}
          <div>
            <select
              value={mouse}
              onChange={(e) => setMouse(e.target.value)}
              className="select border font-semibold border-gray-600 w-full max-w-xs"
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

          {/* Price Sort */}
          <div>
            <select
              className="select border font-semibold border-gray-600 w-full max-w-xs"
              onChange={handleSort}
            >
              <option disabled value="">
                Price Range : Choose
              </option>
              <option value="lowToHigh">Price Range : Low to High</option>
              <option value="highToLow">Price Range : High to Low</option>
            </select>
          </div>

          {/* Reset Button */}
          <div>
            <button onClick={reset} className="btn w-full btn-outline">
              Reset All
            </button>
          </div>
        </div>
      </div>

      {/* Product Grid or No Result */}
      {filterItem.length > 0 ? (
        <div className="grid gap-6 grid-cols-2 md:grid-cols-4">
          {filterItem.map((product, index) => (
            <Card key={index} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center col-span-full text-red-500 font-medium">
          No Products found in this name
        </p>
      )}
    </div>
  );
};

export default Allproducts;
