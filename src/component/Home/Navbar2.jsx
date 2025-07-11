import React from "react";
import useProducts from "../Hook/useProducts";
import { Link } from "react-router-dom";

const Navbar2 = () => {
  const [products] = useProducts([]) || [];
  console.log(products);
  

  // 🔹 Group by category and extract unique subcategories
  const getSubCategories = (category) => {
    const filtered = products?.filter((p) => p.category === category);
    const uniqueSubs = [...new Set(filtered.map((item) => item.sub))];
    return uniqueSubs;
  };

  const categories = ["Keyboard", "Switch", "Keycaps", "Keyboard Accessories", "Mouse"];

  return (
    <div className="navbar pb-3 items-center justify-center bg-white text-gray-800 font-semibold">
      <ul className="menu menu-horizontal px-1">
        {categories.map((category) => {
          const subcategories = getSubCategories(category);
          return (
            <li key={category}>
              <details>
                <summary className="capitalize">{category}</summary>
                <ul className="bg-gray-200 text-black z-40 rounded-t-none p-2">
                  {subcategories.map((sub, idx) => (
                    <li key={idx}>
                      <Link to={`/category/${sub}`}
                      >{sub}</Link>
                     
                    </li>
                  ))}
                </ul>
              </details>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Navbar2;
