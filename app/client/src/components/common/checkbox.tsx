import React from "react";

interface Props {
  id: string;
  label?: string;
  className?: string;
  labelClassName?: string;
}

const Checkbox: React.FunctionComponent<Props> = (props) => {
  const { id, label, className, labelClassName } = props;
  return (
    <React.Fragment>
      <input type="checkbox" id={id} className={className} />
      <label className={labelClassName} htmlFor={id}>
        {label}
      </label>
    </React.Fragment>
  );
};

export default Checkbox;
