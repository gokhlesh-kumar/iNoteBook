import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = (props) => {
  let location = useLocation();

  let navigate = useNavigate();

  const handleLogout = () =>{
    localStorage.removeItem('token');
    props.alert("Logout Succesfully", "success")
    navigate("/login")
    console.log("logout");
    console.log(localStorage.getItem('token'));
    window.location.reload(true)
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark sticky-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            iNoteBookk
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/about"
              >
                About
              </Link>
            </div>
          </div>

          {!localStorage.getItem('token') ? <form className="d-flex">
            <Link className="btn btn-primary mx-1" role="button" to="/login">Login</Link>
            <Link className="btn btn-primary mx-1" role="button" to="/signup">Sign Up</Link>
          </form> : <Link className="btn btn-primary mx-1" role="button" onClick={handleLogout}>Logout</Link>}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
