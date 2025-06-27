import React, { useEffect, useState } from "react";
import Card from "./Card";
import { Link } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/product.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center text-col  mb-8">
        Our Products
      </h2>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-3 ">
        {products &&
          products
            .slice(0, 6)
            .map((product, index) => <Card key={index} product={product} />)}
      </div>
      <div className="flex justify-center mt-10">
        <Link to={"/allproducts"}>
          <button className="btn bg-color text-white hover:bg-blue-600 duration-300">
            Show All Product
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Product;
