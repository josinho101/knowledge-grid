import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LeftNavigator: React.FunctionComponent = () => {
  return (
    <ul
      className="navbar-nav bg-gradient-grey sidebar sidebar-dark accordion"
      id="accordionSidebar"
    >
      <hr className="sidebar-divider my-0" />

      <li className="nav-item">
        <a className="nav-link" href="/">
          <FontAwesomeIcon
            icon={["fas", "tachometer-alt"]}
            size="sm"
            className="fa-fw mr-2 text-gray-400"
          />
          <span>Dashboard</span>
        </a>
      </li>

      <hr className="sidebar-divider" />

      <div className="sidebar-heading">Test Composer</div>

      <li className="nav-item">
        <a
          className="nav-link collapsed"
          href="#"
          data-toggle="collapse"
          data-target="#collapseUtilities"
          aria-expanded="false"
          aria-controls="collapseUtilities"
        >
          <FontAwesomeIcon
            icon={["fas", "book"]}
            size="sm"
            className="fa-fw mr-2 text-gray-400"
          />
          <span>Library</span>
        </a>
        <div
          id="collapseUtilities"
          className="collapse"
          aria-labelledby="headingUtilities"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <a className="collapse-item" href="#">
              Item Collection
            </a>
            <a className="collapse-item" href="#">
              Assets
            </a>
          </div>
        </div>
      </li>

      <li className="nav-item">
        <a className="nav-link" href="#">
          <FontAwesomeIcon
            icon={["fas", "object-group"]}
            size="sm"
            className="fa-fw mr-2 text-gray-400"
          />
          <span>Testlet</span>
        </a>
      </li>

      <li className="nav-item">
        <a className="nav-link" href="#">
          <FontAwesomeIcon
            icon={["fas", "flask"]}
            size="sm"
            className="fa-fw mr-2 text-gray-400"
          />
          <span>Tests</span>
        </a>
      </li>

      <hr className="sidebar-divider" />

      <div className="sidebar-heading">Test Management</div>

      <li className="nav-item">
        <a className="nav-link" href="#">
          <FontAwesomeIcon
            icon={["fas", "user"]}
            size="sm"
            className="fa-fw mr-2 text-gray-400"
          />
          <span>Candidates</span>
        </a>
      </li>

      <div className="sidebar-heading">App Management</div>

      <li className="nav-item">
        <a className="nav-link" href="#">
          <FontAwesomeIcon
            icon={["fas", "users"]}
            size="sm"
            className="fa-fw mr-2 text-gray-400"
          />
          <span>Users</span>
        </a>
      </li>

      <li className="nav-item">
        <a className="nav-link" href="#">
          <FontAwesomeIcon
            icon={["fas", "cog"]}
            size="sm"
            className="fa-fw mr-2 text-gray-400"
          />
          <span>Roles &amp; Permissions</span>
        </a>
      </li>

      <hr className="sidebar-divider d-none d-md-block" />

      <div className="text-center d-none d-md-inline">
        <button className="rounded-circle border-0" id="sidebarToggle"></button>
      </div>
    </ul>
  );
};

export default LeftNavigator;
