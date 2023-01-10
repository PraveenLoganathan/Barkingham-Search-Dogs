import React from "react";
import { Link } from "react-router-dom";

const linkButtonClassNames = {
  base: "bg-white text-center text-brown py-5",
  link: "px-4 py-2 rounded text-lighter-brown hover:text-brown",
};

function LinkButton({ to = "/", text, prefix = "" }) {
  return (
    <div className={linkButtonClassNames.base}>
      {prefix}
      <Link to={to}>
        <button className={linkButtonClassNames.link}>{text}</button>
      </Link>
    </div>
  );
}

export default LinkButton;
