import React, { useState } from "react";
import { AppState } from "../../reducers";
import { logout } from "../../actions/auth";
import { connect, useSelector } from "react-redux";
import localeHelper from "../../utils/localehelper";
import ConfirmationModal from "../common/confirmationmodal";
import profileIcon from "../../assets/images/dummy-user.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  logout: Function;
}

const UserProfile: React.FunctionComponent<Props> = (props) => {
  const user = useSelector((state: AppState) => state.auth.user);
  const [doShowLogoutModal, setLogoutModalDisplay] = useState(false);

  const onCancelLogoutClick = (
    e: React.MouseEvent<HTMLElement, MouseEvent>
  ) => {
    setLogoutModalDisplay(false);
  };

  const onLogoutClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setLogoutModalDisplay(false);
    props.logout();
  };

  const onLogoutMenuClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    setLogoutModalDisplay(true);
  };

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
            {`${user?.firstname} ${user?.lastname}`}
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
            onClick={onLogoutMenuClick}
          >
            <FontAwesomeIcon
              icon={["fas", "sign-out-alt"]}
              className="fa-fw mr-2 text-gray-400"
            />
            {localeHelper.translate("user-widget.menu.logout")}
          </a>
          <ConfirmationModal
            id="logout-modal"
            isOpen={doShowLogoutModal}
            content={localeHelper.translate(
              "auth.logout-modal.message-content"
            )}
            primaryButtonText={localeHelper.translate(
              "auth.logout-modal.logout-button"
            )}
            secondaryButtonText={localeHelper.translate(
              "auth.logout-modal.cancel-button"
            )}
            closeButtonClickHandler={onCancelLogoutClick}
            primaryButtonClickHandler={onLogoutClick}
            secondaryButtonClickHandler={onCancelLogoutClick}
            title={localeHelper.translate("auth.logout-modal.message-title")}
          />
        </div>
      </li>
    </ul>
  );
};

const mapDispatchToProps = {
  logout,
};

export default connect(null, mapDispatchToProps)(UserProfile);
