import React, { useEffect, useState } from "react";
import Card from "./Card";
import { Link } from "react-router-dom";
const Allproducts = () => {
  const [products, setProducts] = useState();
  useEffect(() => {
    fetch("/product.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  return (
    <div className="my-10">
      <div className="my-8 flex justify-between">
        <div className="font-semibold">
          <Link to="/">
            <span className="text-col">Home </span>
          </Link>
          / All Products
        </div>

        <div>
          <select className="select select-bordered w-full max-w-xs">
            <option disabled  selected>
              Choose Product Category
            </option>
            <option>Keyboard</option>
            <option>Mouse</option>
          </select>
        </div>

      </div>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3 ">
        {products &&
          products.map((product, index) => (
            <Card key={index} product={product} />
          ))}
      </div>
    </div>
  );
};

export default Allproducts;
