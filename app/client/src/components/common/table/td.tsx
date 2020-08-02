import React from "react";

interface Props {
  id: string;
  data?: any;
  className?: string;
}

const Td: React.FC<Props> = (props) => {
  return <td className={props.className}>{props.children}</td>;
};

export default Td;
