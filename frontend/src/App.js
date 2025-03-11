
import * as React from "react";
import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import Breadcrumb from "./components/product/breadCrumb";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import List from './components/product/List.component';
import ViewComponent from "./components/product/View.component";
import CreateComponent from "./components/product/create.component";
import SidebarMenu from "./components/product/sidebarMenu.component";
import DashbordComponent from "./components/product/dashbord.component";
import Chatbot from "./components/product/chatbot";
import { MdDarkMode } from "react-icons/md";
import { useTheme } from "@mui/material/styles";
import { TbMessageChatbot } from "react-icons/tb";

import "./styles.css";
import NotificationComponent from "./components/product/NotificationComponent";

import "./styles.css"
import Logins from "./components/LoginSignup/logins";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatbotOpen, setChatbotOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleChatbot = () => {
    setChatbotOpen(!chatbotOpen);
  };

  const breadCrumbUrls = [
    { name: "Home", url: "/" },
  ];

  const theme = useTheme();
  const [darkMode, setDarkMode] = useState(false);

  const changeTheme = () => {
    setDarkMode(!darkMode);
  };
  return (
    <Router>
      <div className="app-container" style={{ width: "100%" }}>
        <SidebarMenu isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <div
          className="main-content"
          style={{
            marginTop: "100px",
            marginLeft: sidebarOpen ? "250px" : "0",
          }}
        >
          <AppBar style={{ position: "fixed" }}>
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleSidebar}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <a href="/" style={{ color: "white", textDecoration: "none" }}>
                  Issues Model
                </a>
              </Typography>
              <IconButton
                color="inherit"
                aria-label="toggle dark mode"
                onClick={changeTheme}
              >
                <MdDarkMode />
              </IconButton>
              <Button href="/LoginSignup/logins" color="inherit">User</Button>
              <NotificationComponent />
              {/* <Button href="" color="inherit">Notification</Button> */}
            </Toolbar>
          </AppBar>

          <header>
            <div className="text-center" style={{color:'blue'}}>
              <h2>Vulnerability Threat Management And Issue Prioritization</h2>
            </div>
            <div className="layout-width" style={{}}>
              <div className="navbar-header" style={{ paddingLeft: "4%", marginBottom: "20px" }}>
                <Breadcrumb title="Request View" pageTitle="Request View" breadCrumbUrls={breadCrumbUrls} />
              </div>
            </div>
          </header>
            <Routes>
              <Route path="/LoginSignup/Logins" 
                element= { <Logins />
                  // <PrivateRoute element={<Logins />}/>
                } 
              />
              <Route exact path="/" element={<List />} />
              {/* <Route path="/product/Loginsignup" element={<Loginsignup />} /> */}
              <Route path="/product/create" element={<CreateComponent />} />
              <Route path="/product/view/:id" element={<ViewComponent />} />
              <Route path="/product/dashbord" element={<DashbordComponent />} />
              <Route path="/product/chatbot" element={<Chatbot />} />
            </Routes>

          <div
            style={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
              zIndex: "999",
            }}
          >

            {chatbotOpen && (
              <div className="chatbox">
                <IconButton
                  className="close-chatbot"
                  size="large"
                  onClick={toggleChatbot}
                  sx={{ position: "absolute", top: "5px", right: "5px", zIndex: "1000" }}
                >
                </IconButton>
                <Chatbot />
              </div>
            )}
            <Button variant="contained" onClick={toggleChatbot}>
              {chatbotOpen ? "Close Chatbot" : "Open Chatbot"}
            </Button>
          </div>

            <div
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: '999',
        }}
      >
        {chatbotOpen && (
          <div className="chatbox">
            <IconButton
              className="close-chatbot"
              size="large"
              onClick={toggleChatbot}
              sx={{ position: 'absolute', top: '5px', right: '5px', zIndex: '1000' }}
            >
            </IconButton>
            <Chatbot 
            // messages={messages} handleSend={handleSend} loading={loading} 
            />
          </div>
        )}
        <IconButton onClick={toggleChatbot} style={{ fontSize: '48px', color: '#007bff' }}>
          {/* <TbMessageChatbot /> */}
        </IconButton>
      </div>
        </div>
      </div>
    </Router>
  );
}

export default App;