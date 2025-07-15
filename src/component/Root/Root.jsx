import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { FaWhatsapp } from "react-icons/fa";

const Root = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="w-11/12 mx-auto">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>

      <div className="fixed bottom-10 right-8">
        <button className="btn w-11 h-11 text-xs bg-green-500 hover:bg-white hover:text-green-400 hover:border-0 text-white rounded-full border border-green-500">
          <div className="text-3xl">
            <a href="https://wa.me/qr/WKZSZEROZ3DPK1">
              <FaWhatsapp></FaWhatsapp>
            </a>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Root;
