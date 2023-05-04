
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import logo from "../../images/logo.png";
import Logout from "./logout";
import "./navbar.css";

const Navbar =() => {
  const [isMobile, setIsMobile] = useState(false)

  const useData = useSelector((state) => state.addUser);

  return (
    
    <nav className="navbar navbar-expand-lg">
    
      <div className="container">
       

          <div className="mobile-menu-icon" onClick={() => setIsMobile(!isMobile)}>
                {isMobile ? (
                <i className="fas fa-times"></i>
                ):(
                <i className="fas fa-bars"></i>
                )}
          </div>
        
          <div>
            <NavLink to="/" className="" >
              <img src={logo} alt='logo' width="150"/>
            </NavLink>
          </div>

          
            <div className={isMobile ? "nav-links-mobile" : "nav-links"} onClick={() => setIsMobile(false)} id="navbarNavAltMarkup">
              {useData.role === "user" ? (
                <div className="container">
                  <div className="navbar-nav">
                    <Link to="/" className="nav-item nav-link active text-white fs-5">
                      Areas
                    </Link>
                    <Link
                      to="/viewbooking"
                      className="nav-item nav-link text-white fw-normal"
                    >
                      Bookings
                    </Link>
                  </div>
                </div>
              ) : useData.role === "admin" ? (
                <div className="container">
                  <div className="navbar-nav">
                    <Link to="/" className="nav-item nav-link active text-white">
                      Areas
                    </Link>
                    <Link to="/addarea" className="nav-item nav-link text-white">
                      Add Area
                    </Link>
                  </div>
                </div>
              ) : null}

            </div>
            
          
          <Logout />
          </div>
       
      
    </nav>
  );
}

export default Navbar;
