import React, { useEffect, useState } from "react";
import "./Userpage.css";
import axios from "axios";

export default function Userpage() {
  const [data, setData] = useState([]);
  const [userDetail, setUserDetail] = useState([]);
  const [modal, setModal] = useState(false);
  const [userOrders,setUserOrders] = useState([]);
  const handleData = (e) => {
    setModal(true);

    axios
      .get(`${import.meta.env.VITE_APP_API_URL}/alluser?id=${e}`)
      .then((response) => {
        setUserDetail(response.data.userDetail);
       
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
     
        axios
          .post(`${import.meta.env.VITE_APP_API_URL}/userorders`, {
            id:e,
          })
          .then((orderResponse) => {
            setUserOrders(orderResponse.data); // Assuming you're setting orders in state
            console.log(orderResponse.data);
          })
          .catch((error) => {
            console.error(error.response.data.message);
          });
          })
  };
  

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_API_URL}/alluser`)
      .then((response) => {
        setData(response.data.user);
        // console.log(response.data.user)
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const [isOpen, setIsOpen] = useState(false);

        const toggleDetails = () => {
          setIsOpen(!isOpen);
        };

  return (
    <>
      <div className="user-container">
        <h1>All User</h1>

        <div className="active-user my-5">
          <div className="row">
            <div className="col-md-12">
              <div className="main-card mb-3 card">
                <div className="card-header d-flex justify-content-between">
                  <strong style={{ fontSize: "20px" }}>Users</strong>
                </div>
                <div className="table-responsive">
                  <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Phone </th>
                        <th>Verified </th>
                        <th>Id</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((data) => (
                        <tr key={data._id}>
                          <td>{data.name.toUpperCase()}</td>
                          <td>{data.username}</td>
                          <td></td>
                          <td>{data.isVerified ? "Yes" : "No"}</td>
                          <td>{data._id}</td>
                          <td>
                            <button
                              type="button"
                              id="PopoverCustomT-1"
                              className="btn btn-primary btn-sm"
                              onClick={() => handleData(data._id)}
                            >
                              Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        {modal && (
          <div className="modalsec">
            <div className="modalsec1 d-flex justify-content-between">
              <span style={{ fontSize: "22px" }}>User Profile </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="34"
                height="34"
                fill="currentColor"
                className="bi bi-x-circle"
                viewBox="0 0 16 16"
                onClick={() => setModal(false)}
                style={{ cursor: "pointer" }}
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
              </svg>
            </div>
            <div className="modalsec2 d-flex ">
              <div className="ms-1 d-flex flex-column ">
                <div className="ms-bx" style={{ width: "100%" }}>
                  <p className=" d-flex gap-2 align-items-center  ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      fill="currentColor"
                      className="bi bi-person"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                    </svg>
                    Contact Info
                    {/* {data.isVerified ? "Yes" : "No"} */}

                  </p>
                  

                  <div className="dt-sec d-flex flex-row gap-6 mt-4 ">
                    <div
                      className="dt-sec-1 d-flex flex-column gap-2"
                      style={{ color: "#00000053" }}
                    >
                      <span>ID</span>
                      <span>Name</span>
                      <span>Phone</span>
                      <span>Email</span>
                    </div>
                    <div
                      className="dt-sec-1 mx-5 d-flex flex-column gap-2"
                      style={{ color: "#000000dd" }}
                    >
                      <span>{userDetail._id}</span>
                      <span>{userDetail.name}</span>
                      {userDetail.phone != "" ? (
                        <span>None</span>
                      ) : (
                        <span>{userDetail.phone}</span>
                      )}

                      <span>{userDetail.username}</span>
                    </div>
                  </div>
                </div>

                
              </div>
              
            </div>

            {/* recent orders */}

            <div className="modelsec3">
              <div className="ms-bx" style={{ width: "100%" }}>
                <p className=" d-flex gap-2 align-items-center  ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    fill="currentColor"
                    className="bi bi-cart-check"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z" />
                    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                  </svg>
                  Orders
                </p>
                <div className="active-user my-5">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="main-card mb-3 card">
                      
                        <div className="table-responsive">
                          <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                            <thead>
                              <tr>
                                <th>Order Id</th>
                                <th>Customer Name</th>
                                <th>Date & Time </th>
                                <th>Product </th>
                                <th>Quantity</th>
                                <th>Amount</th>
                              </tr>
                            </thead>
                            <tbody>
                              {userOrders.map((data) => (
                                <tr key={data._id}>
                                  <td>{data._id}</td>
                                  <td>{data.userdetail.toUpperCase()}</td>
                                  <td> {new Date(
                                              data.createdAt
                                            ).toLocaleString()}</td>
                                            {/* <td>{data.cartdata.map((product) => (
                                      <div className="list-group-item p-3 bg-white">
                                        <div className="row no-gutters">
                                          <div className="row no-gutters mt-3">
                                            <div className="col-3 col-md-1"></div>
                                            <div className="col-9 col-md-8 pr-0 pr-md-3">
                                              <h6 className="text-charcoal mb-2 mb-md-1">
                                                <span
                                                  className="text-charcoal"
                                                  style={{ color: "#49AED0" }}
                                                >
                                                  {product.quantity} x {product.title}
                                                </span>
                                              </h6>
                                              <ul className="list-unstyled text-pebble mb-2 small">
                                                <li className="">
                                                  <b>Type:</b> {product.type}
                                                </li>
                                                <li className="">
                                                  <b>Size:</b> {product.size}
                                                </li>
                                                <li className="">
                                                  <b>Quantity:</b> {product.quantity}
                                                </li>
                                              </ul>
                                              <h6 className="text-charcoal text-left mb-0 mb-md-2">
                                                <b> ₹{product.price}</b>
                                              </h6>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    ))}</td> */}
                                    <td>
              <div onClick={toggleDetails} style={{ cursor: 'pointer', color: '#49AED0' }}>
                {isOpen ? 'Hide Details' : 'Show Details'}
              </div>
              {isOpen && (
                <div>
                  {data.cartdata.map((product) => (
                    <div className="list-group-item p-3 bg-white" key={product.id}>
                      <div className="row no-gutters">
                        <div className="col-9 col-md-8 pr-0 pr-md-3">
                          <h6 className="text-charcoal mb-2 mb-md-1">
                            <span className="text-charcoal" style={{ color: "#49AED0" }}>
                              {product.quantity} x {product.title}
                            </span>
                          </h6>
                          <ul className="list-unstyled text-pebble mb-2 small">
                            <li><b>Type:</b> {product.type}</li>
                            <li><b>Size:</b> {product.size}</li>
                            <li><b>Quantity:</b> {product.quantity}</li>
                          </ul>
                          <h6 className="text-charcoal text-left mb-0 mb-md-2">
                            <b> ₹{product.price}</b>
                          </h6>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </td>
                                  <td>{data.cartTotalQuantity}</td>
                                  
                                  <td>
                                  ₹{data.cartTotalAmount}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
