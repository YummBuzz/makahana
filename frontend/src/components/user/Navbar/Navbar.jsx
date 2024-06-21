import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// cart data
import {
  
  clearCart,
  
  getTotals,
  removeFromCart,
} from "../../../Store/cartSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Navbar({ logo, brand, pdScroll }) {
  const [isCart, setIsCart] = useState(false);
  const [isHamburger, setISHumburger] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const hamburgerButtonClick = () => {
    setISHumburger(true);
  };
  const handleButtonClick = () => {
    setIsCart(true);
  };

  let brandlogo = null;

  if (brand === "Yumm Buzz") {
    brandlogo = "/logos/yummbuzz-logo.png";
  } else if (brand === "wagini") {
    brandlogo = "/logos/wagini-logo.png";
  }

  useEffect(() => {
    // Function to handle scroll event
    if (pdScroll === 0) {
      setScrolled(true);
    } 
    const handleScroll = () => {
      // Check if the page has been scrolled beyond a certain threshold
       if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Add event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Remove event listener when the component unmounts
    // return () => {
    //   window.removeEventListener("scroll", handleScroll);
    // };
  });

  // cart data

  const cart = useSelector((state) => state.cart);
  // console.log(cart.cartItems)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleRemoveFromCart = (product) => {
    // console.log(product);
    dispatch(removeFromCart(product));
  };
  const handleClearCart = (e) => {
    dispatch(clearCart());
  };

  return (
    <>
      <div className={scrolled ? "header scrolled" : "header"}>
        <div className="container">
          <div className="nav">
            {/* <!--menu button--> */}
            <div className="hamburger-container">
              <label className="hamburger" onClick={hamburgerButtonClick}>
                <input type="checkbox" className="checkbox" />
                <svg viewBox="0 0 32 32">
                  <path
                    className="line line-top-bottom"
                    d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
                  ></path>
                  <path className="line" d="M7 16 27 16"></path>
                </svg>
              </label>
            </div>
            {/* <!--logos--> */}

            {brand && (
              <div className="logos">
                <Link to="/" className="logo-1">
                  <img src={brandlogo} className="img-fluid" />
                </Link>
              </div>
            )}

            {logo && (
              <div className="logos">
                <Link to="/" className="logo-1">
                  <img src={logo} className="img-fluid" />
                </Link>
              </div>
            )}

            {/* <!--cart and login--> */}
            <div className="cart-login">
              <div className="cart-icon" onClick={handleButtonClick}>
                <i className="ph-bold ph-shopping-cart-simple">
                  {" "}
                  <span> {cart.cartItems.length} </span>
                </i>
              </div>
              <div>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  {" "}
                  <i className="ph-bold ph-user"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* side bar */}
      <div className={isHamburger ? "header2 show" : "header2 "}>
        <div className="close-btn" onClick={() => setISHumburger(false)}>
          <i className="ph ph-x-circle"></i>
        </div>
        {/* <!--header2-head--> */}
        <div className="header2-head">
          <h2>Navigations</h2>
        </div>
        {/* <!--header2-menuslinks--> */}
        <div className="header2-links">
          <Link to="/"> Home </Link>
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#flush-collapseTwo"
                aria-expanded="false"
                aria-controls="flush-collapseTwo"
              >
                <div className="d-flex justify-content-between w-100">
                  <span>Shop Now </span>
                  <i className="ph ph-caret-circle-down"></i>
                </div>
              </button>
            </h2>

            <div
              id="flush-collapseTwo"
              className="accordion-collapse collapse"
              data-bs-parent="#accordionFlushExample"
            >
              <div className="accordion-body">
                <Link to="/products/Yumm Buzz"> Yumm Buzz</Link>
                <Link to="/products/wagini"> Wagini</Link>
              </div>
            </div>
          </div>
          <Link to="/about"> About Us</Link>
          <Link to="/"> Blogs </Link>
          <Link to="/contact"> Contact Us</Link>
        </div>

        {/* <!--header2-social links--> */}
        <div className="header2-socials">
          <div className="social-head">
            <p>Social Links</p>
          </div>
          <div className="social-links">
            <div className="col-12 footer-social-icons ">
              <a href="#!">
                {" "}
                <i className="ph-bold ph-facebook-logo"></i>{" "}
              </a>
              <a href="#!">
                {" "}
                <i className="ph-bold ph-instagram-logo"></i>
              </a>
              <a href="#!">
                {" "}
                <i className="ph-bold ph-twitter-logo"></i>
              </a>
            </div>
            
          </div>
        </div>
      </div>

      <div className={isCart ? "cart-box show" : "cart-box"}>
        {/* <!--cart-head--> */}
        <div className="cart-head">
          <h4>Your Shopping Cart</h4>
          <i
            className="ph-bold ph-x-circle close-cart"
            onClick={() => setIsCart(false)}
          ></i>
        </div>
        {/* <!--cart-produt-container --> */}
        <div className="cart-product-container">
          {/* <!--empty cart container--> */}
          {cart.cartItems.length === 0 ? (
            <div className="empty-cart-container ">
              <p>Your Cart is Empty</p>
            </div>
          ) : (
            <div className="products-in-cart">
              {/* <!--product-column--> */}
              {cart.cartItems.map(cartItem => (
              <div className="product-column"  key={cartItem._id}>
                <div className="img-content-container">
                  {/* <!--cart-product-image--> */}
                  <div className="cart-img-container">
                    <img
                      src={cartItem.imgFront}
                      className="img-fluid"
                    />
                  </div>
                  {/* <!--cart-product-detail--> */}

                 
                    <div className="cart-product-detail">
                      <h5>{cartItem.title}</h5>
                      <div className="cart-size-quantity">
                        <p>
                          Size:<span> {cartItem.size}</span>
                        </p>
                        <p>
                          Quantity: <span> {cartItem.quantity}</span>
                        </p>
                      </div>
                      <p className="price">
                        <span> Rs.</span>
                        {cartItem.price}
                      </p>
                    </div>
                 
                </div>
                {/* <!--remove icon--> */}
                <div
                  className="remove-icon"
                  onClick={() => handleRemoveFromCart(cartItem)}
                >
                  <i className="ph-bold ph-trash"></i>
                </div>
               
              </div>
               ))}
            </div>
          )}
        </div>

        {/* <!--cart-total--> */}
        <div className="cart-total-container">
          <div className="row">
            <div className="col-12 cart-price">
              <div className="row">
                <div className="col-6">
                  <p>Total Items</p>
                </div>
                <div className="col-6 text-end">
                  <p>{cart.cartTotalQuantity}</p>
                </div>
              </div>
            </div>
            <div className="col-12 cart-price">
              <div className="row">
                <div className="col-6">
                  <p>Sub Total</p>
                </div>
                <div className="col-6 text-end">
                  <p>{cart.cartTotalAmount}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="cart-btn">
            <Link to='/checkout'> Check Out</Link>
            <Link to='/products/all'> Continue Shopping </Link>
          </div>
        </div>
      </div>
    </>
  );
}
