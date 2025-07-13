import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Card from './Card';

const SubCategory = () => {
  const { sub } = useParams(); 
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    fetch('/product.json')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const subCategoryFiltered = products.filter(
        (product) => product.sub.toLowerCase() === sub.toLowerCase()
      );
      setFiltered(subCategoryFiltered);
    }
  }, [sub, products]);

  return (
    <div className="my-10">
      <div className="my-8 flex flex-col md:flex-row justify-between md:items-center">
        <div className="font-semibold">
          <Link to="/">
            <span className="text-col hover:text-pink-500">Home </span>
          </Link>
          / {sub} Category Products
        </div>
      </div>

      <div className="grid gap-6 grid-cols-2 md:grid-cols-4">
        {filtered.length > 0 ? (
          filtered.map((product, index) => (
            <Card key={index} product={product} />
          ))
        ) : (
          <p className="text-center col-span-full text-red-500 font-medium">
            No products found in this subcategory.
          </p>
        )}
      </div>
    </div>
  );
};

export default SubCategory;
