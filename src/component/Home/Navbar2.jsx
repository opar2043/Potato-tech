import React from "react";
import useProducts from "../Hook/useProducts";
import { Link } from "react-router-dom";

const Navbar2 = () => {
  const [products] = useProducts([]);

  // 🔹 Group by category and extract unique subcategories
  const getSubCategories = (category) => {
    const filtered = products.filter((p) => p.category === category);
    const uniqueSubs = [...new Set(filtered.map((item) => item.sub))];
    return uniqueSubs;
  };

  const categories = ["Keyboard", "Switch", "Keycaps", "Keyboard Accessories", "Mouse"];

  return (
    <div className="navbar items-center justify-center bg-blue-600 text-white">
      <ul className="menu menu-horizontal px-1">
        {categories.map((category) => {
          const subcategories = getSubCategories(category);
          return (
            <li key={category}>
              <details>
                <summary className="capitalize">{category}</summary>
                <ul className="bg-blue-100 text-black z-50 rounded-t-none p-2">
                  {subcategories.map((sub, idx) => (
                    <li key={idx}>
                      <Link to={`/${sub}`}
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
