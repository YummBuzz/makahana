import React from "react";
import "../Navbar/Navbar.css";
import { FaRegUser } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <div
        className="mn-navbar"
        style={{ backgroundColor: "black", height: "70px" }}
      >
        <div
          className="sub-navbar d-flex align-items-center"
          style={{ width: "90%", margin: "auto", height: "100%" }}
        >
          <nav
            className="d-flex justify-content-between align-items-center "
            style={{ height: "100%", width: "100%" }}
          >
            <div className="logo">
              <Link to="">Logo</Link>
            </div>
            <div className="links d-flex gap-4">
              <Link to="">Home</Link>
              <Link to="/shop">Shop</Link>
              <Link to="/about">About Us</Link>
              <Link to="/blog">Blog</Link>
              <Link to="/contact">Contact</Link>
            </div>
            <div className="icon d-flex gap-3">
              <Link to="" className="links">
                {" "}
                <FaRegUser />
              </Link>
              <Link to="" style={{position:"relative"}}>
                {" "}
                <FaShoppingBag  />
                <span className="cartvalue d-flex justify-content-center align-items-center" style={{position:"absolute",top:"-8px",left:"16px",color:"#fff",fontSize:"14px"}}>0</span>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
