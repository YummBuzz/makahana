import React from "react";

import "./Adminnavbar.css";

export default function Adminnavbar() {
const access = window.localStorage.getItem("access")
const admin = window.localStorage.getItem("admin")
const logOut = () => {
  window.localStorage.clear();
  window.location.href = "/adminpanel";
};

  return (
    <>
      <div className="mn-sec">
        <div className="mn-sub-sec">
          <div className="d-flex justify-content-between align-items-center sec-ab">
            <div className="c-name">Yumm Buzz</div>
            <div className="dt-sec d-flex justify-content-between align-items-center gap-4 ">
              <div className="dt-1 d-flex flex-column ">
                <span>
                  <strong>{admin}</strong>
                </span>
                <span style={{fontSize:"12px"}}>{access}</span>
              </div>
              <div className="dt-bt">
                <span className="lg-span" onClick={logOut}>
                  Sign out
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Link to='/admindashboard/overview'>Overview</Link>
    <Link to='/admindashboard/products'>Products</Link>
    <Link to='/admindashboard/orders'>Orders</Link>
     */}
    </>
  );
}
