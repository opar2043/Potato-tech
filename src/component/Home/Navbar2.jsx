import React from "react";
import useProducts from "../Hook/useProducts";
import { Link } from "react-router-dom";

const Navbar2 = () => {
  const [products, isLoading, refetch] = useProducts() || [];

  const getSubCategories = (category) => {
    const filtered = products?.filter((p) => p.category === category);
    const uniqueSubs = [...new Set(filtered.map((item) => item.sub))];
    return uniqueSubs;
  };

  const categories = ["Keyboard", "Mouse", "Switch", "Keycaps", "Keyboard Accessories"];

  // 🔁 Don't render anything if products are missing or empty
  if (!products || products.length === 0) return "";

  return (
    <div className="navbar items-center justify-center bg-white text-gray-800 font-semibold">
      <ul className="menu menu-horizontal px-1">
        {categories.map((category) => {
          const subcategories = getSubCategories(category);
          return (
            <li key={category} className="relative group">
              <span className="capitalize cursor-pointer">{category}</span>

              {/* Submenu on hover */}
              <ul className="absolute hidden group-hover:flex flex-col bg-gray-200 text-black z-40 rounded shadow-md mt-2 min-w-[150px]">
                {subcategories.map((sub, idx) => (
                  <li key={idx}>
                    <Link
                      to={`/category/${sub}`}
                      className="block px-3 py-1 hover:bg-gray-300 rounded"
                    >
                      {sub}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Navbar2;
