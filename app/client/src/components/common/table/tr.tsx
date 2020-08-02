import React from "react";

interface Props {
  id: string;
  className?: string;
}

const Tr: React.FC<Props> = (props) => {
  return <tr>{props.children}</tr>;
};

export default Tr;
