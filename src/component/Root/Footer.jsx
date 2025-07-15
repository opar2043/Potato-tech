import React from "react";
import img from '../../assets/Potato-logo-sqr-img.png'
import { Link } from "react-router-dom";
import { FaYoutube, FaFacebook } from "react-icons/fa";
const Footer = () => {
  return (
    <div className="bg-neutral">
      <div>
        <footer className="footer flex md:flex-row flex-col md:justify-between text-neutral-content p-5
         md:p-10">
          <aside>
            <img src={img} alt="" className="w-16 h-16 rounded-full" />
            <p>
              Potato Tech
              <br />
              Your Trusted Tech Partner
            </p>
            <p>01905045531</p>
          </aside>
          <nav>
            <h6 className="footer-title">Social</h6>
            <div className="grid grid-flow-col gap-4">

              <Link to={'https://www.facebook.com/Potatotech.store'}>
                      <FaFacebook size={30}></FaFacebook> 
              </Link>

              <Link to={'https://www.youtube.com/@PotatoTechBD'}>
                      <FaYoutube size={30}></FaYoutube> 
              </Link>
            </div>
          </nav>
        </footer>
        <div className="footer footer-center text-white p-4">
          <aside>
            <p>
              Copyright © {new Date().getFullYear()} - All right reserved by
              Potato Tech
            </p>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Footer;
