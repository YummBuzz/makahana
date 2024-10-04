import React, { useEffect, useState } from "react";
import "./Userpage.css";
import axios from "axios";

export default function Userpage() {
  const [data, setData] = useState([]);
  const [userDetail, setUserDetail] = useState([]);
  const [modal, setModal] = useState(false);
  const handleData = (e) => {
    setModal(true);

    axios
      .get(`${import.meta.env.VITE_APP_API_URL}/alluser?id=${e}`)
      .then((response) => {
        setUserDetail(response.data.userDetail);
        console.log(response.data.userDetail);
      })
      .catch((error) => {
        console.error(error);
      });
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

                {/* <div className="ms-bx" style={{ width: "100%" }}>
                  <p
                    className=" d-flex gap-2 align-items-center"
                    style={{ fontSize: "20px" }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      fill="currentColor"
                      className="bi bi-cash-coin"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8m5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0"
                      />
                      <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195z" />
                      <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083q.088-.517.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1z" />
                      <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 6 6 0 0 1 3.13-1.567" />
                    </svg>
                    Stats
                  </p>
                  <div className="dt-sec d-flex flex-wrap justify-content-evenly gap-5 mt-5">
                    <div className="stats">
                      <p style={{ fontSize: "13px" }}>Average Order</p>
                      <p style={{ fontSize: "22px", margin: "3px 0px" }}>
                        $000
                      </p>
                      <p style={{ fontSize: "8px" }}>
                        Based On Total Order Value
                      </p>
                    </div>
                    <div className="stats">
                      <p style={{ fontSize: "13px" }}>
                        Average Order Per Month
                      </p>
                      <p style={{ fontSize: "22px", margin: "3px 0px" }}>
                        $000
                      </p>
                      <p style={{ fontSize: "8px" }}>
                        Based On Total Order Value Per Month
                      </p>
                    </div>
                    <div className="stats">
                      <p style={{ fontSize: "13px" }}>Average Order</p>
                      <p style={{ fontSize: "22px", margin: "3px 0px" }}>
                        $000
                      </p>
                      <p style={{ fontSize: "8px" }}>
                        Based On Total Order Value
                      </p>
                    </div>
                    <div className="stats">
                      <p style={{ fontSize: "13px" }}>Average Order</p>
                      <p style={{ fontSize: "22px", margin: "3px 0px" }}>
                        $000
                      </p>
                      <p style={{ fontSize: "8px" }}>
                        Based On Total Order Value
                      </p>
                    </div>
                  </div>
                </div> */}
              </div>
              {/* Address */}
              {/* <div className="ms-1 ">
                <div
                  className="ms-bx d-flex flex-column gap-5"
                  style={{ width: "100%", height: "60vh", overflow: "scroll" }}
                >
                  <p className=" d-flex gap-2 align-items-center  ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      fill="currentColor"
                      className="bi bi-geo-alt"
                      viewBox="0 0 16 16"
                    >
                      <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                      <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                    </svg>
                    Addresses
                  </p>
                  <div className="stats-1">
                    <p style={{ fontSize: "13px", color: "#00000053" }}>
                      Address-1
                    </p>

                    <p style={{ fontSize: "15px", margin: "5px 0px" }}>
                      123 Bird Street, LN Road, Alabama <br /> Tallahassee, FL
                      32301 <br />
                      Suite 101
                    </p>
                  </div>
                  <div className="stats-1">
                    <p style={{ fontSize: "13px", color: "#00000053" }}>
                      Address-2
                    </p>

                    <p style={{ fontSize: "15px", margin: "5px 0px" }}>
                      123 Bird Street, LN Road, Alabama <br /> Tallahassee, FL
                      32301 <br />
                      Suite 101
                    </p>
                  </div>
                  <div className="stats-1">
                    <p style={{ fontSize: "13px", color: "#00000053" }}>
                      Address-3
                    </p>

                    <p style={{ fontSize: "15px", margin: "5px 0px" }}>
                      123 Bird Street, LN Road, Alabama <br /> Tallahassee, FL
                      32301 <br />
                      Suite 101
                    </p>
                  </div>
                </div>
              </div> */}
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
                              {/* {data.map((data) => (
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
                              ))} */}
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
