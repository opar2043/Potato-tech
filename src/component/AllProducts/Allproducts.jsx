import React, { useEffect, useState } from "react";
import Card from "./Card";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
const Allproducts = () => {
  const [products, setProducts] = useState();
  const [mouse, setMouse] = useState("");
  const [search, setSearch] = useState("");
  const [dbSearch, setDbSearch] = useState("");

  useEffect(() => {
    fetch(`/product.json?mouse=${mouse}`)
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, [mouse]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDbSearch(search.trim().toLowerCase());
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const filterItem =
    products &&
    products.filter(
      (item) =>
        dbSearch === "" ||
        item.name?.toLowerCase().includes(dbSearch) ||
        item.category?.toLowerCase().includes(dbSearch)
    );

  function handleSort(e) {
    const value = e.target.value;
    let sortedProducts = [...products];

    if (value === "lowToHigh") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (value === "highToLow") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    setProducts(sortedProducts);
  }

  return (
    <div className="my-10">
      <div className="my-8 flex flex-col md:flex-row justify-between  md:items-center">
        <div className="font-semibold">
          <Link to="/">
            <span className="text-col hover:text-pink-500">Home </span>
          </Link>
          / All Products
        </div>

        {/* Search Text */}

        <div className="flex-1 ">
          <div className="flex justify-end my-3">
            <div className="w-full md:w-2/3 flex flex-row justify-center items-center gap-4 p-2 border rounded-xl shadow-md bg-white mx-auto">
              <div className="w-full flex items-center pl-2">
                <FaSearch></FaSearch>
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

        <div className="flex flex-row md:flex-col gap-2">
          <div>
            <select
              onChange={(e) => setMouse(e.target.value)}
              className="select border font-semibold border-gray-600 w-full max-w-xs"
            >
              <option disabled selected>
                Choose Product Category
              </option>
              <option value={"keyboard"}>Keyboard</option>
              <option value={"mouse"}>Mouse</option>
            </select>
          </div>

          {/* Price */}
          <div>
            <select
              className="select border font-semibold border-gray-600 w-full max-w-xs"
              onChange={handleSort}
            >
              <option disabled selected>
                Price Range : Choose
              </option>
              <option value="lowToHigh">Price Range : Low to High</option>
              <option value="highToLow">Price Range : High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-4 ">
        {filterItem && filterItem.length > 0 ? (
          filterItem.map((product, index) => (
            <Card key={index} product={product} />
          ))
        ) : (
          <p className="text-center col-span-full text-red-500 font-medium">
            No Products found in this name
          </p>
        )}
      </div>
    </div>
  );
};

export default Allproducts;
