import React from "react";
import * as usersService from "../services/usersService";

import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";

function SiteNav(props) {
  // console.log("SiteNav: ", props);

  const navigate = useNavigate();

  const onLogOutClick = (e) => {
    console.log("logout working?");
    e.preventDefault();
    props.user.isLoggedIn &&
      usersService.logout().then(logoutSuccess).catch(logoutError);
    navigate("/loginPage");
  };

  const logoutSuccess = (response) => {
    console.log("logoutSuccess: ", response);
    props.logoutHandler();
    navigate("/");
  };

  const logoutError = (error) => {
    console.log("logoutError: ", error);
  };

  return (
    <React.Fragment>
      <nav
        className="navbar navbar-expand-md navbar-dark bg-dark"
        aria-label="Fourth navbar example"
      >
        <div className="container">
          <a className="navbar-brand" href="/">
            <img
              src="https://pw.sabio.la/images/Sabio.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Sabio"
            />
          </a>
          <Link
            to="/"
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsExample04"
            aria-controls="navbarsExample04"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </Link>

          <div className="collapse navbar-collapse" id="navbarsExample04">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                <Link to="/" className="nav-link px-2 text-white link-button">
                  Home
                </Link>
              </li>
              <li className="nav-item"></li>
              <li className="nav-item">
                <Link
                  to="/friendsPage"
                  className="nav-link px-2 text-white link-button"
                >
                  Friends
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/jobsPage"
                  href="#"
                  className="nav-link px-2 text-white link-button"
                >
                  Jobs
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/companiesPage"
                  href="#"
                  className="nav-link px-2 text-white link-button"
                >
                  Tech Companies
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/eventsPage"
                  href="#"
                  className="nav-link px-2 text-white link-button"
                >
                  Events
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/T&APage"
                  href="#"
                  className="nav-link px-2 text-white link-button"
                >
                  Test and Ajax Call
                </Link>
              </li>
            </ul>
            <div className="text-end">
              <Link
                to="/"
                href="/"
                className="align-items-center mb-2 me-2 mb-lg-0 text-white text-decoration-none"
              >
                Welcome {props.user.firstName}!
              </Link>
              <button
                type="button"
                className="btn btn-outline-light me-2"
                onClick={onLogOutClick}
              >
                {props.user.isLoggedIn === false ? "Login" : "Logout"}
              </button>
              <Link
                type="button"
                className="btn btn-warning me-3"
                to="/registerPage"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
}

export default SiteNav;
