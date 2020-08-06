import React from "react";

interface Props {
  text: string;
  className: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button: React.FunctionComponent<Props> = (props) => {
  const { className, text, onClick } = props;

  return (
    <button type="button" className={className} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
