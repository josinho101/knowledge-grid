import React from "react";

interface Props {
  id: string;
  href?: string;
  text: string;
  className: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

const Anchor: React.FunctionComponent<Props> = (props) => {
  const { id, href, className, text, onClick } = props;

  return (
    <a id={id} href={href} className={className} onClick={onClick}>
      {text}
    </a>
  );
};

export default Anchor;
