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
  faPencilAlt,
  faPlus,
  faTrash,
  faExpand,
  faCompress,
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
    faBars,
    faPencilAlt,
    faPlus,
    faTrash,
    faExpand,
    faCompress
  );

  return null;
};

export default IconLibrary;
