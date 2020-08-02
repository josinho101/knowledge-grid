import React from "react";

interface Props {
  id: string;
  data?: any;
  className?: string;
}

const Td: React.FC<Props> = (props) => {
  return <td className={props.className}>{props.data}</td>;
};

export default Td;
