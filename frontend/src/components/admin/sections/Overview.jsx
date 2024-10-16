import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import "./Overview.css";
import { Doughnut } from "react-chartjs-2";
import Table from "react-bootstrap/Table";
import { IoIosTrendingUp } from "react-icons/io";
import { IoIosTrendingDown } from "react-icons/io";

export default function Overview() {
  const [usersWeek, setUsersWeek] = useState([]);
  const [usersWeekCount, setUsersWeekCount] = useState([]);
  const [usersMonth, setUsersMonth] = useState([]);
  const [usersMonthCount, setUsersMonthCount] = useState([]);
  const [totalUser, setTotalUser] = useState([]);
  const [trend, setTrend] = useState("");
  const [percentage, setPercentage] = useState("");
  const [monthtrend, setMonthtrend] = useState("");
  const [monthpercentage, setMonthpercentage] = useState("");
  const [totalProducts, setTotalProducts] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [selectedButton, setSelectedButton] = useState("week");
  const [latestOrder, setLatestOrder] = useState("");
  const [incomePercentage, setIncomePercentage] = useState("");
  const [topProducts, setTopProducts] = useState("");
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_API_URL}/activeuser`)
      .then((response) => {
        setUsersWeek(response.data.usersWeek);
        setUsersWeekCount(response.data.usersWeekCount);
        setUsersMonth(response.data.usersMonth);
        setUsersMonthCount(response.data.usersMonthCount);
        setTrend(response.data.trend);
        setPercentage(response.data.percentage);
        setMonthpercentage(response.data.monthpercentage);
        setMonthtrend(response.data.monthtrend);
        setTotalProducts(response.data.productscount);

       
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get(`${import.meta.env.VITE_APP_API_URL}/alluser`)
      .then((response) => {
        setTotalUser(response.data.userCount);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get(`${import.meta.env.VITE_APP_API_URL}/orderdata`)
      .then((response) => {
        const amount = (response.data.totalMoney / 1000).toFixed(2);
        setTotalAmount(amount);
        setIncomePercentage(response.data.percentageGrowth);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get(`${import.meta.env.VITE_APP_API_URL}/getorder`)
      .then((response) => {
        const orders = response.data;
        setLatestOrder(orders);
        
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get(`${import.meta.env.VITE_APP_API_URL}/topselling`)
      .then((response) => {
        const topproducts = response.data;
        setTopProducts(topproducts);
        
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <>
      <div className="ov-container">
        <div className="row g-6 mb-6">
          <div className="col-xl-3 col-sm-6 col-12">
            <div className="card shadow border-0">
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <span className="h6 font-semibold text-muted text-sm d-block mb-2">
                      All Products
                    </span>
                    <span className="h3 font-bold mb-0">{totalProducts}</span>
                  </div>
                  <div className="col-auto">
                    <div className="icon icon-shape bg-tertiary text-white text-lg rounded-circle">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-box-fill"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M15.528 2.973a.75.75 0 0 1 .472.696v8.662a.75.75 0 0 1-.472.696l-7.25 2.9a.75.75 0 0 1-.557 0l-7.25-2.9A.75.75 0 0 1 0 12.331V3.669a.75.75 0 0 1 .471-.696L7.443.184l.004-.001.274-.11a.75.75 0 0 1 .558 0l.274.11.004.001zm-1.374.527L8 5.962 1.846 3.5 1 3.839v.4l6.5 2.6v7.922l.5.2.5-.2V6.84l6.5-2.6v-.4l-.846-.339Z"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="mt-2 mb-0 text-sm">
                  <span className="badge badge-pill bg-soft-success text-success me-2">
                    <i className="bi bi-arrow-up me-1"></i>0%
                  </span>
                  <span className="text-nowrap text-xs text-muted">
                    Since last month
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 col-12">
            <div className="card shadow border-0">
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <span className="h6 font-semibold text-muted text-sm d-block mb-2">
                      Total Users
                    </span>
                    <span className="h3 font-bold mb-0">{totalUser}</span>
                  </div>
                  <div className="col-auto">
                    <div className="icon icon-shape bg-primary text-white text-lg rounded-circle">
                      <i className="bi bi-people"></i>
                    </div>
                  </div>
                </div>
                <div className="mt-2 mb-0 text-sm">
                  {/* <span className="badge badge-pill bg-soft-success text-success me-2">
                    <i className="bi bi-arrow-up me-1"></i>30%
                  </span> */}
                  {monthtrend == "increase" ? (
                    <span className="badge badge-pill bg-soft-success text-success me-2">
                      <i className="bi bi-arrow-up me-1"></i>
                      {monthpercentage}%
                    </span>
                  ) : (
                    <span className="badge badge-pill bg-soft-danger text-danger me-2">
                      <i className="bi bi-arrow-down me-1"></i>
                      {monthpercentage}%
                    </span>
                  )}
                  <span className="text-nowrap text-xs text-muted">
                    Since last month
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 col-12">
            <div className="card shadow border-0">
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <span className="h6 font-semibold text-muted text-sm d-block mb-2">
                      New Users
                    </span>
                    <span className="h3 font-bold mb-0">{usersWeekCount}</span>
                  </div>
                  <div className="col-auto">
                    <div className="icon icon-shape bg-info text-white text-lg rounded-circle">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-person-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="mt-2 mb-0 text-sm">
                  {trend == "increase" ? (
                    <span className="badge badge-pill bg-soft-success text-success me-2">
                      <i className="bi bi-arrow-up me-1"></i>
                      {percentage}%
                    </span>
                  ) : (
                    <span className="badge badge-pill bg-soft-danger text-danger me-2">
                      <i className="bi bi-arrow-down me-1"></i>
                      {percentage}%
                    </span>
                  )}

                  <span className="text-nowrap text-xs text-muted">
                    Since last week
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-sm-6 col-12">
            <div className="card shadow border-0">
              <div className="card-body">
                <div className="row">
                  <div className="col">
                    <span className="h6 font-semibold text-muted text-sm d-block mb-2">
                      Total Revenue
                    </span>
                    <span className="h3 font-bold mb-0">{totalAmount} k</span>
                  </div>
                  <div className="col-auto">
                    <div className="icon icon-shape bg-warning text-white text-lg rounded-circle">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-wallet2"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="mt-2 mb-0 text-sm">
                  <span className="badge badge-pill bg-soft-success text-success me-2">
                    <i className="bi bi-arrow-up me-1"></i>
                    {incomePercentage}%
                  </span>
                  <span className="text-nowrap text-xs text-muted">
                    Since last month
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="chart-sec">{/* <Doughnut  /> */}</div>

        <div className="active-user my-5">
          <div className="row">
            <div className="col-md-12">
              <div className="main-card mb-3 card">
                <div className="card-header d-flex justify-content-between">
                  <strong style={{ fontSize: "20px" }}>Active Users</strong>
                  <div className="btn-actions-pane-right">
                    <div role="group" className="btn-group-sm btn-group">
                      <button
                        onClick={() => setSelectedButton("week")}
                        className={
                          selectedButton === "week"
                            ? "active btn btn-focus"
                            : "btn btn-focus"
                        }
                      >
                        Last Week
                      </button>
                      <button
                        onClick={() => setSelectedButton("month")}
                        className={
                          selectedButton === "month"
                            ? "active btn btn-focus"
                            : "btn btn-focus"
                        }
                      >
                        All Month
                      </button>
                    </div>
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                    <thead>
                      <tr>
                        <th className="text-center">_id</th>
                        <th>Username</th>
                        <th className="text-center"> Name</th>
                        {/* <th className="text-center">Last Name</th> */}
                        <th className="text-center">Phone</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedButton === "week"
                        ? usersWeek.map((data) => (
                            <tr key={data._id}>
                              <td className="text-center text-muted">
                                {data._id}
                              </td>
                              <td>
                                <div className="widget-content p-0">
                                  <div className="widget-content-wrapper">
                                    <div className="widget-content-left mr-3"></div>
                                    <div className="widget-content-left flex2">
                                      <div className="widget-heading">
                                        {data.username}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="text-center">{data.name}</td>

                              <td className="text-center">{data.phone}</td>
                            </tr>
                          ))
                        : usersMonth.map((data) => (
                            <tr key={data._id}>
                              <td className="text-center text-muted">
                                {data._id}
                              </td>
                              <td>
                                <div className="widget-content p-0">
                                  <div className="widget-content-wrapper">
                                    <div className="widget-content-left mr-3"></div>
                                    <div className="widget-content-left flex2">
                                      <div className="widget-heading">
                                        {data.username}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="text-center">{data.name}</td>

                              <td className="text-center">{data.phone}</td>
                            </tr>
                          ))}
                    </tbody>
                  </table>
                </div>
                {/* <div className="d-block text-center card-footer">
                  {selectedButton === "week" && usersWeek.length >= 7 ? (
                    <button className="btn-wide btn btn-success">
                      View All
                    </button>
                  ) : null}
                  {selectedButton === "month" && usersMonth.length >= 7 ? (
                    <button className="btn-wide btn btn-success">
                      View All
                    </button>
                  ) : null}
                </div> */}
              </div>
            </div>
          </div>
        </div>

        {/* top selling products */}

        <div className="active-user my-5">
          <div className="row">
            <div className="col-md-12">
              <div className="main-card mb-3 card">
                <div className="card-header d-flex justify-content-between">
                  <strong style={{ fontSize: "20px" }}>
                    Top Selling Products
                  </strong>
                  <div className="btn-actions-pane-right">
                    {/* <div role="group" className="btn-group-sm btn-group">
                      <button
                        // onClick={() => setSelectedButton("week")}
                        // className={
                        //   selectedButton === "week"
                        //     ? "active btn btn-focus"
                        //     : "btn btn-focus"
                        // }
                        className={"active btn btn-focus"}
                      >
                        7 Days
                      </button>
                      <button
                        // onClick={() => setSelectedButton("month")}
                        className={
                          "active btn btn-focus"
                          // selectedButton === "month"
                          //   ? "active btn btn-focus"
                          //   : "btn btn-focus"
                        }
                      >
                        15 Days
                      </button>
                    </div> */}
                  </div>
                </div>
                <div className="table-responsive">
                  <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                    <thead>
                      <tr>
                      <th>#Product Id</th>
                        <th>Product</th>
                        <th>Size</th>
                        <th>Total Quantity </th>
                        <th>Total Amount  </th>
                      </tr>
                    </thead>
                    <tbody>
                      {topProducts.length == 0 ? <span
                          className="d-flex justify-content-center align-items-center "
                          style={{
                            fontSize: "20px",
                            color: "#000",
                            borderBottom: "none",
                            marginTop: "10px",
                            width: "100%",
                          }}
                        >
                          No Top Products Yet
                        </span>  : topProducts.map((data,index) => (
                            <tr key={index}>
                              <td className="text-center text-muted">
                                {data.details._id}
                              </td>
                              <td>
                                <div className="widget-content p-0">
                                  <div className="widget-content-wrapper">
                                    <div className="widget-content-left mr-3"></div>
                                    <div className="widget-content-left flex2">
                                      <div className="widget-heading">
                                        {data.details.title}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="text-center">{data.details.size}</td>

                              <td className="text-center">{data.totalQuantity}</td>
                              <td className="text-center">{data.totalAmount}</td>
                            </tr>
                          ))
                        }
                    </tbody>
                  </table>
                </div>

                {/* <div className="d-block text-center card-footer">
                  {selectedButton === "week" && usersWeek.length >= 7 ? (
                    <button className="btn-wide btn btn-success">
                      View All
                    </button>
                  ) : null}
                  {selectedButton === "month" && usersMonth.length >= 7 ? (
                    <button className="btn-wide btn btn-success">
                      View All
                    </button>
                  ) : null}
                </div> */}
              </div>
            </div>
          </div>
        </div>

        {/* recent orders  */}

        <div className="active-user my-5">
          <div className="row">
            <div className="col-md-12">
              <div className="main-card mb-3 card">
                <div className="card-header d-flex justify-content-between">
                  <strong style={{ fontSize: "20px" }}>Recent Orders (per Day)</strong>
                </div>
                <div className="table-responsive">
                  <table className="align-middle mb-0 table table-borderless table-striped table-hover">
                    <thead>
                      <tr>
                        <th>Order Id </th>
                        <th>Product</th>

                        <th>Quantity</th>
                        <th>Total Amount</th>
                        <th>Txn Id</th>
                      </tr>
                    </thead>
                    <tbody>
                      {latestOrder.length == 0 ? (
                        <span
                          className="d-flex justify-content-center align-items-center "
                          style={{
                            fontSize: "20px",
                            color: "#000",
                            borderBottom: "none",
                            marginTop: "10px",
                            width: "100%",
                          }}
                        >
                          No Latest Order Yet
                        </span>
                      ) : (
                        latestOrder.map((data) => (
                          <tr key={data._id}>
                            <td className="text-center text-muted">
                              {data.razorpay_order_id}
                            </td>
                            <td>
                              <div className="widget-content p-0">
                                <div className="widget-content-wrapper">
                                  <div className="widget-content-left mr-3"></div>
                                  <div className="widget-content-left flex2">
                                    <div className="widget-heading">
                                      {data.firstname}  {data.lastname}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </td>

                            <td className="text-center">
                              {data.cartTotalQuantity}
                            </td>
                            <td className="text-center">
                              {data.cartTotalAmount}
                            </td>
                            <td className="text-center">
                              {data.razorpay_payment_id}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {/* <div className="d-block text-center card-footer">
                  {selectedButton === "week" && usersWeek.length >= 7 ? (
                    <button className="btn-wide btn btn-success">
                      View All
                    </button>
                  ) : null}
                  {selectedButton === "month" && usersMonth.length >= 7 ? (
                    <button className="btn-wide btn btn-success">
                      View All
                    </button>
                  ) : null}
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
