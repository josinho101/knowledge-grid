import React from "react";

interface Props {
  id: string;
  href?: string;
  title?: string;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

const Anchor: React.FunctionComponent<Props> = (props) => {
  const { id, href, className, title, onClick } = props;

  return (
    <a
      id={id}
      href={href}
      className={className}
      onClick={onClick}
      title={title}
    >
      {props.children}
    </a>
  );
};

export default Anchor;
