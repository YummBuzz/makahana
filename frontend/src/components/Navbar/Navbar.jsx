import React, { useState } from "react";
import "../Navbar/Navbar.css";
import { FaRegUser } from "react-icons/fa";
import { FaShoppingBag } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [clickedLink, setClickedLink] = useState();
  const [showIcon, setShowIcon] = useState(false);
  const handleClick = (e) => {
    setClickedLink(e);
    setShowIcon(false);
  };

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
            className="d-flex justify-content-between align-items-center nav-tab "
            style={{ height: "100%", width: "100%" }}
          >
            <div
              className="hamburger d-lg-none"
              onClick={() => setShowIcon(true)}
            >
              <GiHamburgerMenu />
            </div>
            <div className="logo">
              <Link to="" className="icon-logo" onClick={() => handleClick("logo")}
                style={{ color: clickedLink === "logo" ? "" : "blue" }}
                >
                Wagini
              </Link>
            </div>
            <div className="links d-lg-flex gap-4">
              <Link
                className="page-links"
                onClick={() => handleClick("home")}
                style={{ color: clickedLink === "home" ? "red" : "blue" }}
                to=""
              >
                Home
              </Link>
              <Link
                className="page-links"
                onClick={() => handleClick("shop")}
                style={{ color: clickedLink === "shop" ? "red" : "blue" }}
                to="/shop"
              >
                Shop
              </Link>
              <Link
                className="page-links"
                onClick={() => handleClick("about")}
                style={{ color: clickedLink === "about" ? "red" : "blue" }}
                to="/about"
              >
                About Us
              </Link>
              <Link
                className="page-links"
                onClick={() => handleClick("blog")}
                style={{ color: clickedLink === "blog" ? "red" : "blue" }}
                to="/blog"
              >
                Blog
              </Link>
              <Link
                className="page-links"
                onClick={() => handleClick("contact")}
                style={{ color: clickedLink === "contact" ? "red" : "blue" }}
                to="/contact"
              >
                Contact
              </Link>
            </div>
            <div className="icon d-flex gap-3">
              <Link to="/login" className="login-link">
                {" "}
                <FaRegUser />
              </Link>
              <Link to="" style={{ position: "relative" }}>
                {" "}
                <FaShoppingBag />
                <span
                  className="cartvalue d-flex justify-content-center align-items-center"
                  style={{
                    position: "absolute",
                    top: "-8px",
                    left: "16px",
                    color: "#fff",
                    fontSize: "14px",
                  }}
                >
                  0
                </span>
              </Link>
            </div>
          </nav>
        </div>
      </div>
      {showIcon && (
        <div className={`rs-links ${showIcon ? "show" : ""}`}>
          <div
            className="d-flex justify-content-end p-2 fs-1"
            onClick={() => setShowIcon(false)}
          >
            {" "}
            <IoClose />
          </div>
          <div className=" d-flex flex-column gap-4 align-items-start pt-4 px-5">
            <Link
              className="page-links"
              onClick={() => handleClick("home")}
              style={{ color: clickedLink === "home" ? "red" : "blue" }}
              to=""
            >
              Home
            </Link>
            <Link
              className="page-links"
              onClick={() => handleClick("shop")}
              style={{ color: clickedLink === "shop" ? "red" : "blue" }}
              to="/shop"
            >
              Shop
            </Link>
            <Link
              className="page-links"
              onClick={() => handleClick("about")}
              style={{ color: clickedLink === "about" ? "red" : "blue" }}
              to="/about"
            >
              About Us
            </Link>
            <Link
              className="page-links"
              onClick={() => handleClick("blog")}
              style={{ color: clickedLink === "blog" ? "red" : "blue" }}
              to="/blog"
            >
              Blog
            </Link>
            <Link
              className="page-links"
              onClick={() => handleClick("contact")}
              style={{ color: clickedLink === "contact" ? "red" : "blue" }}
              to="/contact"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
