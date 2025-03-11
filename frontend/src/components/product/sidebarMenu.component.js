import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaChartBar } from "react-icons/fa";
import { TbMessageChatbot } from "react-icons/tb";
import { RxDashboard } from "react-icons/rx";
import { ImHome } from "react-icons/im";

const SidebarMenu = ({ isOpen, toggleSidebar }) => {
  return (
    <div className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
      {isOpen ? (
        <ul className="sidebar-menu">
          <li>
            <Link to="/">
            <ImHome />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/product/dashbord">
            <RxDashboard />
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link to="/product/chatbot">
            <TbMessageChatbot />
              <span>ChatBot</span>
            </Link>
          </li>
        </ul>
      ) : (
        <div className="sidebar-icons">
          <FaHome onClick={toggleSidebar} />
          <FaChartBar onClick={toggleSidebar} />
        </div>
      )}
    </div>
  );
};

export default SidebarMenu;
