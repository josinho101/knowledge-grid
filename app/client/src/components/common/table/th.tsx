import React from "react";

interface Props {
  id: string;
  data?: any;
  className?: string;
}

const Th: React.FC<Props> = (props) => {
  return <th className={props.className}>{props.data}</th>;
};

export default Th;
