import React from "react";
import classNames from "classnames";

interface Props {
  text: string;
  iconClass: string;
  buttonType: "primary" | "danger" | "secondary";
}

const IconButton: React.FC<Props> = (props) => {
  const getButtonType = () => {
    let className = "";

    switch (props.buttonType) {
      case "primary":
        className = "btn-primary";
        break;
      case "danger":
        className = "btn-danger";
        break;
    }

    return className;
  };
  return (
    <a
      href="#"
      className={classNames("btn btn-sm btn-icon-split mr-1", getButtonType())}
    >
      <span className="icon text-white-50">
        <i className={props.iconClass}></i>
      </span>
      <span className="text">{props.text}</span>
    </a>
  );
};

export default IconButton;
