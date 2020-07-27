import React, { useState } from "react";

interface Props {
  id: string;
  type: "text" | "email" | "password";
  className: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Textbox: React.FunctionComponent<Props> = (props) => {
  const [value, setValue] = useState("");
  const { id, type, className, placeholder } = props;

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
    />
  );
};

export default Textbox;
