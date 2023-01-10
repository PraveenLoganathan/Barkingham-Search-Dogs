import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import MobileMenu from "./MobileMenu";
import { AuthContext } from "../App";

const navClassNames = {
  base: "bg-papaya",
};

const divClassNames = {
  base: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  flex: "flex items-center justify-between h-16",
};

const burgerClassNames = {
  base: "bg-white inline-flex items-center justify-center p-2 rounded-md text-yellow",
  hover: "hover:text-white hover:bg-yellow",
  focus:
    "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-white",
};

function NavBar({ links }) {
  const { authenticated, logoutHandler } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <nav className={navClassNames.base}>
        <div className={divClassNames.base}>
          <div className={divClassNames.flex}>
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <FontAwesomeIcon icon={faPaw} color="brown" />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {links.map((link) => {
                    return (
                      <Link
                        key={link.label}
                        to={link.path}
                        className="text-brown px-3 py-2 rounded-md text-sm font-medium hover:bg-yellow"
                      >
                        {link.label}
                      </Link>
                    );
                  })}

                  {authenticated && (
                    <Link
                      key={"Logout"}
                      onClick={logoutHandler}
                      className="text-brown px-3 py-2 rounded-md text-sm font-medium hover:bg-yellow"
                    >
                      {"Logout"}
                    </Link>
                  )}
                  {!authenticated && (
                    <Link
                      key={"Login"}
                      to={"/login"}
                      className="text-brown px-3 py-2 rounded-md text-sm font-medium hover:bg-yellow"
                    >
                      {"Login"}
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className={`${burgerClassNames.base} ${burgerClassNames.hover} ${burgerClassNames.focus}`}
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <MobileMenu links={links} />
        </Transition>
      </nav>
    </div>
  );
}

export default NavBar;
