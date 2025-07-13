import { IoIosMenu } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../Hook/useAuth";
import Swal from "sweetalert2";
import img from "../../assets/Potato-logo-sqr-img.png";
import { FaShoppingCart } from "react-icons/fa";
import { useState } from "react";
import useCart from "../Hook/useCart";
const Navbar = () => {
  const { user, handleLogout } = useAuth();
  const [cart , isLoading , refetch] = useCart([]);

  const navigate = useNavigate();
  function logOut() {
    handleLogout()
      .then(() => {
        Swal.fire({
          title: "Logout Successfull",
          icon: "success",
        });
        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          title: "Try Again",
          icon: "error",
        });
      });
  }


  const link = (
    <>
      <Link to={"/checkout"}>
        <li className="before:w-0 mx-2 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] text-black hover:text-[#3B9DF8] transition-all duration-300 before:left-0 cursor-pointer capitalize font-semibold ">
           <button className="relative  text-center text-black font-bold">
            Cart
            <FaShoppingCart className="text-lg " />
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
             +{cart.length}  
               
            </div>
          </button>
        </li>
      </Link>
      <Link to={"/allproducts"}>
        <li className="before:w-0 mx-2 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] text-black hover:text-[#3B9DF8] transition-all duration-300 before:left-0 cursor-pointer capitalize font-semibold">
          All Products
        </li>
      </Link>
      <Link to={"/about"}>
        <li className="before:w-0 mx-2 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] text-black hover:text-[#3B9DF8] transition-all duration-300 before:left-0 cursor-pointer capitalize font-semibold">
          About
        </li>
      </Link>

      {!user ? (
        <Link to={"/login"}>
          <li className="before:w-0 mx-2 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] text-black hover:text-[#3B9DF8] transition-all duration-300 before:left-0 cursor-pointer capitalize font-semibold">
            Log In
          </li>
        </Link>
      ) : (
        <li
          onClick={logOut}
          className="before:w-0 mx-2 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] text-black hover:text-[#3B9DF8] transition-all duration-300 before:left-0 cursor-pointer capitalize font-semibold"
        >
          Log Out
        </li>
      )}
      <Link to={"/dashboard"}>
        <li className="before:w-0 mx-2 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] text-black hover:text-[#3B9DF8] transition-all duration-300 before:left-0 cursor-pointer capitalize font-semibold">
          Dashboard
        </li>
      </Link>
    </>
  );
  return (
    <div>
      <div className="navbar bg-base-100 border-b md:px-16 px-3">
        <div className="md:flex-1  w-full">
          <div className="flex items-center justify-normal gap-2">
            <img src={img} alt="potato tech" className="w-9 h-9 rounded-full" />
            <Link to={'/'} className="text-lg  md:text-2xl text-col font-extrabold">
              <button>Potato Tech</button>
            </Link>
          </div>
        </div>

        {/* Window */}

        <div className="hidden md:flex">
          <div className=" flex-none   ">
            <ul className="menu menu-horizontal text-color px-1 gap-3">
              {link}
            </ul>
          </div>
        </div>

        {/* Mobile */}

        <div className="drawer md:hidden justify-end z-50">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            {/* Page content here */}
            <label htmlFor="my-drawer" className="btn text-color drawer-button">
              <IoIosMenu size={35} />
            </label>
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
            ></label>
            <ul className="menu items-center bg-base-200 text-base-content min-h-full w-80 gap-2 p-4">
              {link}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
