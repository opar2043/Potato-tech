
import { IoIosMenu } from "react-icons/io";
import { Link } from "react-router-dom";
const Navbar = () => {
  const link = (
    <>
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
      <Link to={"/login"}>
        <li className="before:w-0 mx-2 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] text-black hover:text-[#3B9DF8] transition-all duration-300 before:left-0 cursor-pointer capitalize font-semibold">
          Log In
        </li>
      </Link>
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
          <span className="text-lg md:text-xl text-color font-extrabold">
            Potato Tech
          </span>
        </div>

        {/* Window */}

        <div className="hidden md:flex">
          <div className=" flex-none   ">
            <ul className="menu menu-horizontal text-color px-1 gap-2">
              {link}
            </ul>
          </div>
        </div>

        {/* Mobile */}

        <div className="drawer md:hidden justify-end">
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
            <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
              {link}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
