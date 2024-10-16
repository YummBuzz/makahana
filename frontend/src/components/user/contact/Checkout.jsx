import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Button } from "bootstrap";
import { getTotals, removeFromCart,clearCart} from "../../../Store/cartSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Checkout() {
    const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (product) => {

    dispatch(removeFromCart(product));
  };
  const handleClearCart = () => {
    dispatch(clearCart());
  };

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const cartdata = cart.cartItems;
  const cartTotalAmount = cart.cartTotalAmount;
  const cartTotalQuantity = cart.cartTotalQuantity;

  //   contact information

  const [formData, setFormData] = useState({
    email: "",
    firstname: "",
    lastname: "",
    address: "",
    apartment: "",
    country: "India",
    city: "",
    state: "",
    pincode: "",
    phone: "",

  
  });

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });

    };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
   
    const {data:{order,key}}= await axios.post(
      `${import.meta.env.VITE_APP_API_URL}/create-order`,
      {
        cartTotalAmount,
      }
    );
    
    const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "Web Globe India",
        description: "Tutorial of RazorPay",
        image: "/payment.jpg",
        order_id: order.id,
        // callback_url: "http://localhost:3800/paymentverification",
        handler: async function (response) {
            const body = {
              ...response,
            };
    
            const validateRes = await fetch(
              `${import.meta.env.VITE_APP_API_URL}/paymentverification`,
              {
                method: "POST",
                body: JSON.stringify({
                    body: body,
                    cartdata: cartdata,
                    cartTotalAmount: cartTotalAmount,
                    cartTotalQuantity: cartTotalQuantity,
                    formData:formData

                  }),
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            const jsonRes = await validateRes.json();
            
            handleClearCart()
       navigate(`/paymentsuccess?reference=${jsonRes.orderId}&payment=${jsonRes.paymentId}`);
    
        
      
          },
        prefill: {
            name: formData.firstname,
            email: "test@example.com",
            contact: formData.phone
        },
        notes: {
            "address": "Razorpay Corporate Office"
        },
        theme: {
            "color": "#121212"
        }
    };
    const razor = new window.Razorpay(options);
    razor.open();

    
  };

  return (
    <>
      <Navbar pdScroll={0} />
      <div className="checkout-section1">
        <div className="container">
          <div className="row">
            <div className="col-12 order-1 col-lg-6 checkout-form">
              <form className="row g-4" onSubmit={handleSubmit}>
                <div className="col-12">
                  <p className="form-head">Contact</p>
                  <input
                    type="text"
                    class="form-control"
                    id="formGroupExampleInput"
                    placeholder="E-mail Address "
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12">
                  <p className="form-head">Delivery</p>
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput"
                    placeholder="Country Region"
                    // value="India"
                    required
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    
                  />
                </div>
                <div className="col-12 col-lg-6">
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput"
                    placeholder="First Name"
                    required
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12 col-lg-6">
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput"
                    placeholder="Last Name"
                    required
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12">
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput"
                    placeholder="Address"
                    required
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12">
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput"
                    placeholder="Apartment, suite, etc. (optional)"
                    required
                    name="apartment"
                    value={formData.apartment}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12 col-lg-4">
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput"
                    placeholder="City"
                    required
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12 col-lg-4">
                  <input
                    type="text"
                    className="form-control"
                    id="formGroupExampleInput"
                    placeholder="State"
                    required
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12 col-lg-4">
                  <input
                    type="number"
                    className="form-control"
                    id="formGroupExampleInput"
                    placeholder="Pincode"
                    required
                    name="pincode"
                    maxLength="6"
                    minLength="6"
                    value={formData.pincode}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-12">
                  <input
                    type="tel"
                    className="form-control"
                    id="formGroupExampleInput"
                    placeholder="Phone Number"
                    required
                    name="phone"
                    maxLength="10"
                      minLength="10"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-12">
                  <p className="form-head">Payment</p>
                  <img src="/payment.jpg" className="img-fluid w-100" />
                </div>

                <div className="col-12 form-btns">
                  <Link to="/">Cancel Payment</Link>
                  <button type="submit"> Pay Now </button>
                </div>
              </form>

             
              <div className="policy-pages-links">
                <Link to="/terms&conditions"> Terms & Conditions</Link>
                <Link to="/privacy-policy"> Privacy Policy</Link>
                <Link to="/contact"> Contact Information</Link>
              </div>
            </div>

            <div className="col-12 order-lg-1 col-lg-6 checkout-item-wrapper">
              <div className="checkout-items">
                {/* <!--checkout-items-container--> */}
                <div className="checkout-items-container">
                  {/* <!--product-column--> */}
                  {cart.cartItems.length === 0 && (
                    <div className="empty-cart-container ">
                      <p>Your Cart is Empty</p>
                    </div>
                  )}

                  {cart.cartItems.map((data) => (
                    <div
                    className="product-column checkout-product-column"
                      key={data._id}
                    >
                      <div className="img-content-container">
                        {/* <!--cart-product-image--> */}
                        <div className="cart-img-container">
                          <img src={data.imgFront} className="img-fluid" />
                        </div>
                        {/* <!--cart-product-detail--> */}
                        <div className="cart-product-detail">
                          <h5>{data.title}</h5>
                          <div className="cart-size-quantity">
                            <p>
                              Size:<span> {data.size}</span>
                            </p>
                            <p>
                              Quantity: <span> {data.quantity}</span>
                            </p>
                          </div>
                          <p className="price">
                            <span> Rs.</span>
                            {data.price}
                          </p>
                        </div>
                      </div>
                      {/* <!--remove icon--> */}
                      <div
                        className="remove-icon"
                        onClick={() => handleRemoveFromCart(data)}
                      >
                        <i className="ph-bold ph-trash"></i>
                      </div>
                    </div>
                  ))}

                  {/* <!--product-column--> */}
                </div>

                {/* <!--checkout total--> */}
                <div className="checkout-total">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
