import classNames from "classnames";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LeftNavigator: React.FunctionComponent = () => {
  const [isOpen, setNavState] = useState(true);

  const onToggleClick = () => {
    setNavState(!isOpen);
  };

  return (
    <ul
      className={classNames(
        "navbar-nav bg-gradient-grey sidebar sidebar-dark accordion",
        { toggled: !isOpen }
      )}
      id="accordionSidebar"
    >
      <hr className="sidebar-divider my-0" />

      <li className="nav-item">
        <a className="nav-link" href="/">
          <FontAwesomeIcon
            size="sm"
            icon={["fas", "tachometer-alt"]}
            className={classNames({ "fa-fw mr-2 text-gray-400": isOpen })}
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
            size="sm"
            icon={["fas", "book"]}
            className={classNames({ "fa-fw mr-2 text-gray-400": isOpen })}
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
            size="sm"
            icon={["fas", "object-group"]}
            className={classNames({ "fa-fw mr-2 text-gray-400": isOpen })}
          />
          <span>Testlet</span>
        </a>
      </li>

      <li className="nav-item">
        <a className="nav-link" href="#">
          <FontAwesomeIcon
            size="sm"
            icon={["fas", "flask"]}
            className={classNames({ "fa-fw mr-2 text-gray-400": isOpen })}
          />
          <span>Tests</span>
        </a>
      </li>

      <hr className="sidebar-divider" />

      <div className="sidebar-heading">Test Management</div>

      <li className="nav-item">
        <a className="nav-link" href="#">
          <FontAwesomeIcon
            size="sm"
            icon={["fas", "user"]}
            className={classNames({ "fa-fw mr-2 text-gray-400": isOpen })}
          />
          <span>Candidates</span>
        </a>
      </li>

      <div className="sidebar-heading">App Management</div>

      <li className="nav-item">
        <a className="nav-link" href="#">
          <FontAwesomeIcon
            size="sm"
            icon={["fas", "users"]}
            className={classNames({ "fa-fw mr-2 text-gray-400": isOpen })}
          />
          <span>Users</span>
        </a>
      </li>

      <li className="nav-item">
        <a className="nav-link" href="#">
          <FontAwesomeIcon
            size="sm"
            icon={["fas", "cog"]}
            className={classNames({ "fa-fw mr-2 text-gray-400": isOpen })}
          />
          <span>Roles &amp; Permissions</span>
        </a>
      </li>

      <hr className="sidebar-divider d-none d-md-block" />

      <div className="text-center d-none d-md-inline">
        <button
          className="rounded-circle border-0"
          id="sidebarToggle"
          onClick={onToggleClick}
        ></button>
      </div>
    </ul>
  );
};

export default LeftNavigator;
