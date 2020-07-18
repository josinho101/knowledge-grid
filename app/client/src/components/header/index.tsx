import React from "react";
import UserProfile from "./userprofile";
import logo from "../../assets/images/logo.png";

const Header: React.FunctionComponent = () => {
  return (
    <header>
      <nav className="navbar navbar-expand navbar-light grey-bg topbar static-top shadow">
        <div>
          <img src={logo} width="250" />
        </div>
        <button
          id="sidebarToggleTop"
          className="btn btn-link d-md-none rounded-circle mr-3"
        >
          <i className="fa fa-bars"></i>
        </button>
        <UserProfile displayName={"John Honai"} />
      </nav>
    </header>
  );
};

export default Header;
