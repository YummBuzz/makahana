import React from "react";
import { Routes, Route } from "react-router-dom";
import Adminnavbar from "./adminNavbar/Adminnavbar";
import Overview from "./Overview";
import Products from "./Products";
import Orders from "./Orders";
import "./Dashboard.css";
import Adminsidebar from "./adminNavbar/Adminsidebar";
import Userpage from "./Userpage";
import Access from "./Access";
import Adminlist from "./Adminlist";
import Producadd from "./Producadd";

export default function Dashboard() {
  
  return (
    <>
      <div className="mn-ds">
        <Adminnavbar />

        <div className="dh-sec d-flex justify-content-between ">
          <div className="dh-side-l">
            <Adminsidebar/>
          </div>
          <div className="dh-side-r p-4">
            <Routes>
              <Route path="/overview" element={<Overview />} />
              <Route path="/products" element={<Products />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/userslist" element={<Userpage/>}/>
              <Route path="/accesspannel" element={<Access/>}/>
              <Route path="/adminlist" element={<Adminlist/>}/>
              <Route path="/addproduct" element={<Producadd/>}/>
            </Routes>
          </div>
        </div>
      </div>
    </>
  );
}
