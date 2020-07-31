import classNames from "classnames";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import localeHelper from "../../utils/localehelper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SiteNavigator: React.FunctionComponent = () => {
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
        <Link className="nav-link" to="/">
          <FontAwesomeIcon
            size="sm"
            icon={["fas", "tachometer-alt"]}
            className={classNames({ "fa-fw mr-2 text-gray-400": isOpen })}
          />
          <span>{localeHelper.translate("site-nav.dashboard")}</span>
        </Link>
      </li>

      <hr className="sidebar-divider" />
      <div className="sidebar-heading">
        {localeHelper.translate("site-nav.test-composer.title")}
      </div>

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
          <span>
            {localeHelper.translate("site-nav.test-composer.library")}
          </span>
        </a>
        <div
          id="collapseUtilities"
          className="collapse"
          aria-labelledby="headingUtilities"
          data-parent="#accordionSidebar"
        >
          <div className="bg-white py-2 collapse-inner rounded">
            <Link className="collapse-item" to="/library/item-collection">
              {localeHelper.translate(
                "site-nav.test-composer.library-item-collection"
              )}
            </Link>
            <Link className="collapse-item" to="/library/assets">
              {localeHelper.translate("site-nav.test-composer.library-assets")}
            </Link>
          </div>
        </div>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/testlets">
          <FontAwesomeIcon
            size="sm"
            icon={["fas", "object-group"]}
            className={classNames({ "fa-fw mr-2 text-gray-400": isOpen })}
          />
          <span>
            {localeHelper.translate("site-nav.test-composer.testlets")}
          </span>
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/tests">
          <FontAwesomeIcon
            size="sm"
            icon={["fas", "flask"]}
            className={classNames({ "fa-fw mr-2 text-gray-400": isOpen })}
          />
          <span>{localeHelper.translate("site-nav.test-composer.tests")}</span>
        </Link>
      </li>

      <hr className="sidebar-divider" />
      <div className="sidebar-heading">
        {localeHelper.translate("site-nav.test-mgmt.title")}
      </div>

      <li className="nav-item">
        <Link className="nav-link" to="/candidates">
          <FontAwesomeIcon
            size="sm"
            icon={["fas", "user"]}
            className={classNames({ "fa-fw mr-2 text-gray-400": isOpen })}
          />
          <span>{localeHelper.translate("site-nav.test-mgmt.candidates")}</span>
        </Link>
      </li>

      <hr className="sidebar-divider" />
      <div className="sidebar-heading">
        {localeHelper.translate("site-nav.app-mgmt.title")}
      </div>

      <li className="nav-item">
        <Link className="nav-link" to="/users">
          <FontAwesomeIcon
            size="sm"
            icon={["fas", "users"]}
            className={classNames({ "fa-fw mr-2 text-gray-400": isOpen })}
          />
          <span>{localeHelper.translate("site-nav.app-mgmt.users")}</span>
        </Link>
      </li>

      <li className="nav-item">
        <Link className="nav-link" to="/users/roles">
          <FontAwesomeIcon
            size="sm"
            icon={["fas", "cog"]}
            className={classNames({ "fa-fw mr-2 text-gray-400": isOpen })}
          />
          <span>{localeHelper.translate("site-nav.app-mgmt.roles")}</span>
        </Link>
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

export default SiteNavigator;
