import React from "react";

const Footer: React.FunctionComponent = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className="sticky-footer bg-white">
      <div className="container my-auto">
        <div className="copyright text-center my-auto">
          <span>{`Copyright © Sentinel ${year}`}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
