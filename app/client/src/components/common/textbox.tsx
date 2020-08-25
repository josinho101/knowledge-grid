import React, { useState } from "react";

interface Props {
  id: string;
  type: "text" | "email" | "password" | "search";
  className: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
}

const Textbox: React.FunctionComponent<Props> = (props) => {
  const [value, setValue] = useState("");
  const { id, type, className, placeholder, maxLength } = props;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);

    if (props.onChange) {
      props.onChange(e);
    }
  };

  return (
    <input
      id={id}
      type={type}
      value={value}
      className={className}
      placeholder={placeholder}
      onChange={onChange}
      maxLength={maxLength}
    />
  );
};

export default Textbox;
