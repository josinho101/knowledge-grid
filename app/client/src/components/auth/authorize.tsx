import React from "react";

interface Props {
  Component: React.ComponentType<any | string>;
}

function Authorize<T>(Component: React.ComponentType<T>) {
  return (props: T) => <Component {...props} />;
}

export default Authorize;
