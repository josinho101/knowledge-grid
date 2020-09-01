import React from "react";
import localeHelper from "../../utils/localehelper";

const Footer: React.FunctionComponent = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className="sticky-footer bg-white">
      <div className="container my-auto">
        <div className="copyright text-center my-auto">
          <span>{`${localeHelper.translate(
            "pages.common.footer.copyright"
          )} ${year}`}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
