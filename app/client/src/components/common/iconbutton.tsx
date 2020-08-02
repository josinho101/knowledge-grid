import React from "react";
import classNames from "classnames";

interface Props {
  text?: string;
  title?: string;
  iconClass?: string;
  buttonType: "primary" | "danger" | "secondary" | "success" | "warning";
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
      case "success":
        className = "btn-success";
        break;
      case "warning":
        className = "btn-warning";
        break;
    }

    return className;
  };
  return (
    <a
      href="#"
      title={props.title}
      className={classNames("btn btn-sm btn-icon-split mr-1", getButtonType())}
    >
      {props.iconClass ? (
        <span className="icon text-white-50">
          <i className={props.iconClass}></i>
        </span>
      ) : null}

      {props.text ? <span className="text">{props.text}</span> : null}
    </a>
  );
};

export default IconButton;
