import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faTachometerAlt,
  faMoneyBill,
  faBook,
  faObjectGroup,
  faFlask,
  faUser,
  faUsers,
  faCog,
  faSignOutAlt,
  faBars,
} from "@fortawesome/free-solid-svg-icons";

const IconLibrary: React.FunctionComponent = () => {
  library.add(
    faTachometerAlt,
    faMoneyBill,
    faBook,
    faObjectGroup,
    faFlask,
    faUser,
    faUsers,
    faCog,
    faSignOutAlt,
    faBars
  );

  return null;
};

export default IconLibrary;
