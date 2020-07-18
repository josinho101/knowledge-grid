import React from "react";
import profileIcon from "../../assets/images/dummy-user.jpg";

const UserProfile: React.FunctionComponent = () => {
  return (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item dropdown no-arrow">
        <a
          className="nav-link dropdown-toggle"
          href="#"
          id="userDropdown"
          role="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <span className="mr-2 d-none d-lg-inline text-white-600 small">
            John Honai
          </span>
          <img className="img-profile rounded-circle" src={profileIcon} />
        </a>
        <div
          className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
          aria-labelledby="userDropdown"
        >
          <a
            className="dropdown-item"
            href="#"
            data-toggle="modal"
            data-target="#logoutModal"
          >
            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
            Logout
          </a>
        </div>
      </li>
    </ul>
  );
};

export default UserProfile;
