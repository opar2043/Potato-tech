import React from 'react'
import { IoIosMenu } from 'react-icons/io'
import { Link } from 'react-router-dom'

const Navbar = () => {

    const link = <>
            <Link to={"/allproducts"}>
        <li className="">
          <a>All Products</a>
        </li>
      </Link>
            <Link to={"/about"}>
        <li className="">
          <a>About</a>
        </li>
      </Link>
    </>
  return (
   <div>
      <div className="navbar bg-base-100 border-b">
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
            <label
              htmlFor="my-drawer"
              className="btn text-color drawer-button"
            >
              <IoIosMenu  size={35} />
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
  )
}

export default Navbar