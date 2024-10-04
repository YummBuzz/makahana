import React, { useEffect, useState } from "react";
import "./Orders.css";
import axios from "axios";

export default function Orders() {
  const [selectedButton, setSelectedButton] = useState("unpacked");
  const [unpackeddata, setUnpackedData] = useState([]);
  const [packeddata, setPackedData] = useState([]);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_API_URL}/packedorder`)
      .then((response) => {
        setPackedData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get(`${import.meta.env.VITE_APP_API_URL}/unpackedorder`)
      .then((response) => {
        setUnpackedData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [unpackeddata,packeddata]);

  const markPacked = async (id) => {
 
    axios.put(`${import.meta.env.VITE_APP_API_URL}/statusorder/${id}`)
    .then(response => {
      console.log(response)
      setUnpackedData(unpackeddata.filter((data) => data._id !== id));

      
    })
    .catch(error => {
      console.error('Error updating packed status: ', error);
    });
  };

  return (
    <>
      <div className="user-container">
        <h1>All Orders</h1>

        <div className="active-user my-5">
          <div className="row">
            <div className="col-md-12">
              <div className="main-card mb-3 card">
                <div className="card-header d-flex justify-content-between">
                  <strong style={{ fontSize: "20px" }}>Orders</strong>
                  <div className="btn-actions-pane-right">
                    <div
                      role="group"
                      className="btn-group-sm btn-group d-flex gap-4"
                    >
                      <button
                        onClick={() => setSelectedButton("packed")}
                        className={
                          selectedButton === "packed"
                            ? "active btn btn-focus"
                            : "btn btn-focus"
                        }
                      >
                        Packed
                      </button>
                      <button
                        onClick={() => setSelectedButton("unpacked")}
                        className={
                          selectedButton === "unpacked"
                            ? "active btn btn-focus"
                            : "btn btn-focus"
                        }
                      >
                        Unpacked
                      </button>
                    </div>
                  </div>
                </div>
                <div className="table-responsive">
                  {selectedButton == "packed" && (
                    <>
                      {packeddata.length == 0 ? (
                        <h2> No Packed Orders Yet</h2>
                      ) : (
                        <>
                          {packeddata.map((data) => (
                            <div class="container mt-3 mt-md-5" key={data._id}>
                              <div className="row">
                                <div className="col-12">
                                  <div className="list-group mb-5">
                                    <div
                                      className="list-group-item p-3 bg-snow"
                                      style={{ position: "relative" }}
                                    >
                                      <div className="row w-100 no-gutters">
                                        <div className="col-6 col-md">
                                          <h6 className="text-charcoal mb-0 w-100">
                                            Order Id
                                          </h6>
                                          <span
                                            className="text-pebble mb-0 w-100 mb-2 mb-md-0"
                                            style={{ color: "#49AED0" }}
                                          >
                                            {data.razorpay_order_id}
                                          </span>
                                        </div>
                                        <div className="col-6 col-md">
                                          <h6 className="text-charcoal mb-0 w-100">
                                            Date
                                          </h6>
                                          <p className="text-pebble mb-0 w-100 mb-2 mb-md-0">
                                            {new Date(
                                              data.createdAt
                                            ).toLocaleString()}
                                          </p>
                                        </div>
                                        <div className="col-6 col-md">
                                          <h6 className="text-charcoal mb-0 w-100">
                                            Total Amount
                                          </h6>
                                          <p className="text-pebble mb-0 w-100 mb-2 mb-md-0 bold">
                                            ₹ {data.cartTotalAmount}
                                          </p>
                                        </div>
                                        <div className="col-6 col-md">
                                          <h6 className="text-charcoal mb-0 w-100">
                                            Txn Id.
                                          </h6>
                                          <p className="text-pebble mb-0 w-100 mb-2 mb-md-0"  style={{ color: "#49AED0" }}>
                                            {data.razorpay_payment_id}
                                          </p>
                                        </div>
                                        <div className="col-12 col-md-3">
                                          
                                          {
                                            data.packed == false && <button className="btn btn-primary w-100" onClick={() => markPacked(data._id)}>
                                            Packed It
                                          </button>
                                          }
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      className="list-group-item p-3 bg-snow"
                                      style={{ position: "relative" }}
                                    >
                                      <div className="row w-100 no-gutters">
                                        <div className="col-6 col-md">
                                          <h6 className="text-charcoal mb-0 w-100">
                                            First Name
                                          </h6>
                                          <span className="text-pebble mb-0 w-100 mb-2 mb-md-0">
                                            {data.firstname}
                                          </span>
                                        </div>
                                        <div className="col-6 col-md">
                                          <h6 className="text-charcoal mb-0 w-100">
                                            Last Name
                                          </h6>
                                          <p className="text-pebble mb-0 w-100 mb-2 mb-md-0">
                                            {data.lastname}
                                          </p>
                                        </div>
                                        <div className="col-6 col-md">
                                          <h6 className="text-charcoal mb-0 w-100">
                                            Email
                                          </h6>
                                          <p className="text-pebble mb-0 w-100 mb-2 mb-md-0 ">
                                            {data.email}
                                          </p>
                                        </div>
                                        <div className="col-6 col-md">
                                          <h6 className="text-charcoal mb-0 w-100">
                                            Phone Number
                                          </h6>
                                          <p className="text-pebble mb-0 w-100 mb-2 mb-md-0">
                                            {data.phone}
                                          </p>
                                        </div>
                                        <div className="col-6 col-md">
                                          <h6 className="text-charcoal mb-0 w-100">
                                            Address
                                          </h6>
                                          <p className="text-pebble mb-0 w-100 mb-2 mb-md-0">
                                            {data.apartment} , {data.address},
                                            {data.city},{data.pincode},
                                            {data.state},{data.country}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    {data.cartdata.map((product) => (
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
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </>
                      )}
                    </>
                  )}
                  {selectedButton == "unpacked" && (
                    <>
                      {unpackeddata.length == 0 ? (
                        <h2> No Unpacked Orders Yet</h2>
                      ) : (
                        <>
                          {unpackeddata.map((data) => (
                            <div class="container mt-3 mt-md-5" key={data._id}>
                              <div className="row">
                                <div className="col-12">
                                  <div className="list-group mb-5">
                                    <div
                                      className="list-group-item p-3 bg-snow"
                                      style={{ position: "relative" }}
                                    >
                                      <div className="row w-100 no-gutters">
                                        <div className="col-6 col-md">
                                          <h6 className="text-charcoal mb-0 w-100">
                                            Order Id
                                          </h6>
                                          <span
                                            className="text-pebble mb-0 w-100 mb-2 mb-md-0"
                                            style={{ color: "#49AED0" }}
                                          >
                                            {data.razorpay_order_id}
                                          </span>
                                        </div>
                                        <div className="col-6 col-md">
                                          <h6 className="text-charcoal mb-0 w-100">
                                            Date
                                          </h6>
                                          <p className="text-pebble mb-0 w-100 mb-2 mb-md-0">
                                            {new Date(
                                              data.createdAt
                                            ).toLocaleString()}
                                          </p>
                                        </div>
                                        <div className="col-6 col-md">
                                          <h6 className="text-charcoal mb-0 w-100">
                                            Total Amount
                                          </h6>
                                          <p className="text-pebble mb-0 w-100 mb-2 mb-md-0 bold">
                                            ₹ {data.cartTotalAmount}
                                          </p>
                                        </div>
                                        <div className="col-6 col-md">
                                          <h6 className="text-charcoal mb-0 w-100">
                                            Txn Id.
                                          </h6>
                                          <p className="text-pebble mb-0 w-100 mb-2 mb-md-0">
                                            {data.razorpay_payment_id}
                                          </p>
                                        </div>
                                        <div className="col-12 col-md-3">
                                          
                                          <button className="btn btn-primary w-100" onClick={() => markPacked(data._id)}>
                                            Packed It
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                    <div
                                      className="list-group-item p-3 bg-snow"
                                      style={{ position: "relative" }}
                                    >
                                      <div className="row w-100 no-gutters">
                                        <div className="col-6 col-md">
                                          <h6 className="text-charcoal mb-0 w-100">
                                            First Name
                                          </h6>
                                          <span className="text-pebble mb-0 w-100 mb-2 mb-md-0">
                                            {data.firstname}
                                          </span>
                                        </div>
                                        <div className="col-6 col-md">
                                          <h6 className="text-charcoal mb-0 w-100">
                                            Last Name
                                          </h6>
                                          <p className="text-pebble mb-0 w-100 mb-2 mb-md-0">
                                            {data.lastname}
                                          </p>
                                        </div>
                                        <div className="col-6 col-md">
                                          <h6 className="text-charcoal mb-0 w-100">
                                            Email
                                          </h6>
                                          <p className="text-pebble mb-0 w-100 mb-2 mb-md-0 ">
                                            {data.email}
                                          </p>
                                        </div>
                                        <div className="col-6 col-md">
                                          <h6 className="text-charcoal mb-0 w-100">
                                            Phone Number
                                          </h6>
                                          <p className="text-pebble mb-0 w-100 mb-2 mb-md-0">
                                            {data.phone}
                                          </p>
                                        </div>
                                        <div className="col-6 col-md">
                                          <h6 className="text-charcoal mb-0 w-100">
                                            Address
                                          </h6>
                                          <p className="text-pebble mb-0 w-100 mb-2 mb-md-0">
                                            {data.apartment} , {data.address},
                                            {data.city},{data.pincode},
                                            {data.state},{data.country}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                    {data.cartdata.map((product) => (
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
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </>
                      )}
                    </>
                  )}

                  {/* <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone </th>
                        <th className='w-40 overflow-scroll'>Message </th>
                        
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((data) => (
                        <tr key={data._id}>
                          <td>{data.name.toUpperCase()}</td>
                          <td>{data.email}</td>
                         
                          <td>{data.contact}</td>
                          <td className="overflow-scroll" style={{width:"200px"}}>{data.message}</td>
                          
                        </tr>
                      ))}
                    </tbody>
                  </table> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
