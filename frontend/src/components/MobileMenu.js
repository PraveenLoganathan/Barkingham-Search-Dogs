import React, { useContext } from "react";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { AuthContext } from "../App";

const mobileMenuClassNames = {
  base: "md:hidden px-2 pt-2 pb-3 space-y-1 sm:px-3",
};

const linkClassNames = {
  base: "text-brown block px-3 py-2 rounded-md text-base font-medium",
  hover: "hover:bg-yellow",
};

function MobileMenu({ links }) {
  const { authenticated, logoutHandler } = useContext(AuthContext);

  return (
    <div id="mobile-menu" className={`${mobileMenuClassNames.base}`}>
      {links.map((link) => {
        return (
          <Link
            key={link.label}
            to={link.path}
            className={classnames(linkClassNames.base, linkClassNames.hover)}
          >
            {link.label}
          </Link>
        );
      })}
      {authenticated && (
        <Link
          key={"Logout"}
          onClick={logoutHandler}
          className={classnames(linkClassNames.base, linkClassNames.hover)}
        >
          {"Logout"}
        </Link>
      )}
      {!authenticated && (
        <Link
          key={"Login"}
          to={"/login"}
          className={classnames(linkClassNames.base, linkClassNames.hover)}
        >
          {"Login"}
        </Link>
      )}
    </div>
  );
}

export default MobileMenu;
