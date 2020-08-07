import React from "react";
import classNames from "classnames";

interface Props {
  id: string;
  spinnerCount?: number;
  size: "large" | "small";
  color: "blue" | "dark" | "green" | "yellow" | "red";
}

const Spinner: React.FunctionComponent<Props> = (props) => {
  const getSpinnerSize = () => {
    let size = props.size;
    let className = "";

    switch (size) {
      case "large":
        className = "spinner-grow-sm";
        break;
      case "small":
        className = "spinner-grow-very-sm";
        break;
    }

    return className;
  };

  const getColorClass = () => {
    let color = props.color;
    let className = "";

    switch (color) {
      case "blue":
        className = "text-primary";
        break;
      case "dark":
        className = "text-dark";
        break;
      case "green":
        className = "text-success";
        break;
      case "yellow":
        className = "text-warning";
        break;
      case "red":
        className = "text-danger";
        break;
    }

    return className;
  };

  const grenderSpinners = () => {
    let spinners = [];
    let colorClass = getColorClass();
    let sizeClass = getSpinnerSize();

    if (props.spinnerCount) {
      for (let i = 1; i <= props.spinnerCount; i++) {
        spinners.push(
          <div
            key={`${props.id}-dot-${i}`}
            className={classNames(
              "spinner-grow spinner-margin",
              sizeClass,
              colorClass
            )}
            role="status"
          ></div>
        );
      }
    }

    return spinners;
  };

  return <div className="spinner-wrapper">{grenderSpinners()}</div>;
};

Spinner.defaultProps = {
  spinnerCount: 5,
};

export default Spinner;
