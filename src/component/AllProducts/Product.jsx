import React, { useEffect, useState } from "react";
import Card from "./Card";
import { Link } from "react-router-dom";
import Title from "../Shared/Title";
import useProducts from "../Hook/useProducts";

const Product = () => {
  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   fetch("/product.json")
  //     .then((res) => res.json())
  //     .then((data) => setProducts(data));
  // }, []);

  const [products, isLoading, refetch] = useProducts() || [];

  return (
    <div className=" mx-auto px-4 py-8 mt-5 md:mt-10">
      <Title head={"Our"} head2={"Products"}></Title>
      {!products ? (
        <p className="text-center font-bold">No Products Yet !</p>
      ) : (
        <div className="grid gap-6 grid-cols-2 md:grid-cols-4 ">
          {products &&
            products
              .slice(0, 4)
              .map((product, index) => <Card key={index} product={product} />)}
        </div>
      )}

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
