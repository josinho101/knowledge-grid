import React from "react";

function Authorize<T>(Component: React.ComponentType<T>) {
  return (props: T) => <Component {...props} />;
}

export default Authorize;
