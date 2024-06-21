import React, { useState } from "react";

import "./Adminsidebar.css";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { FaNoteSticky } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { SiOpenaccess } from "react-icons/si";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { MdMessage } from "react-icons/md";

export default function Adminsidebar() {
  const [clickedLink, setClickedLink] = useState();

  const handleClick = (e) => {
    setClickedLink(e);
  };
  return (
    <>
      <div className="mn-sd p-4 d-flex flex-column gap-4">
        <div className="box">
          {/* <MdDashboard /> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-boxes"
            viewBox="0 0 16 16"
          >
            <path d="M7.752.066a.5.5 0 0 1 .496 0l3.75 2.143a.5.5 0 0 1 .252.434v3.995l3.498 2A.5.5 0 0 1 16 9.07v4.286a.5.5 0 0 1-.252.434l-3.75 2.143a.5.5 0 0 1-.496 0l-3.502-2-3.502 2.001a.5.5 0 0 1-.496 0l-3.75-2.143A.5.5 0 0 1 0 13.357V9.071a.5.5 0 0 1 .252-.434L3.75 6.638V2.643a.5.5 0 0 1 .252-.434zM4.25 7.504 1.508 9.071l2.742 1.567 2.742-1.567zM7.5 9.933l-2.75 1.571v3.134l2.75-1.571zm1 3.134 2.75 1.571v-3.134L8.5 9.933zm.508-3.996 2.742 1.567 2.742-1.567-2.742-1.567zm2.242-2.433V3.504L8.5 5.076V8.21zM7.5 8.21V5.076L4.75 3.504v3.134zM5.258 2.643 8 4.21l2.742-1.567L8 1.076zM15 9.933l-2.75 1.571v3.134L15 13.067zM3.75 14.638v-3.134L1 9.933v3.134z" />
          </svg>
          <Link
            onClick={() => handleClick("Dashboard")}
            style={{ color: clickedLink === "Dashboard" ? "#fff" : "" }}
            to="/admindashboard/overview"
            className="bx-link"
          >
            Dashboard
          </Link>
        </div>
        <div className="box">
          {/* <FaShoppingCart /> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-cart-fill"
            viewBox="0 0 16 16"
          >
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
          </svg>
          <Link
            to="/admindashboard/products"
            className="bx-link"
            onClick={() => handleClick("Products")}
            style={{ color: clickedLink === "Products" ? "#fff" : "" }}
          >
            Products
          </Link>
        </div>
        <div className="box">
          {/* <FaNoteSticky /> */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-bookmark-fill"
            viewBox="0 0 16 16"
          >
            <path d="M2 2v13.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2" />
          </svg>
          <Link
            to="/admindashboard/orders"
            className="bx-link"
            onClick={() => handleClick("Orders")}
            style={{ color: clickedLink === "Orders" ? "#fff" : "" }}
          >
            Orders
          </Link>
        </div>
        <div className="box">
          {/* <FaUser /> */}
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
          <Link
            to="/admindashboard/userslist"
            className="bx-link"
            onClick={() => handleClick("Users")}
            style={{ color: clickedLink === "Users" ? "#fff" : "" }}
          >
            Users
          </Link>
        </div>
        <div className="box">
          <SiOpenaccess style={{ fontSize: "18px" }} />
          <Link
            to="/admindashboard/accesspannel"
            className="bx-link"
            onClick={() => handleClick("Access")}
            style={{ color: clickedLink === "Access" ? "#fff" : "" }}
          >
            Access
          </Link>
        </div>
        <div className="box">
          <MdMessage style={{ fontSize: "18px" }} />
          <Link
            to="/admindashboard/message"
            className="bx-link"
            onClick={() => handleClick("Message")}
            style={{ color: clickedLink === "Message" ? "#fff" : "" }}
          >
            Message
          </Link>
        </div>
      </div>
    </>
  );
}
