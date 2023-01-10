import React from "react";

const containerClassNames = {
  base: "min-h-screen py-40 bg-early-dawn",
  inner: "container max-w-md m-auto mt-6 bg-white",
  shadow: "overflow-hidden rounded shadow-xl",
};

function Container({ children }) {
  return (
    <div className={containerClassNames.base}>
      <div className={containerClassNames.inner}>
        <div className={containerClassNames.shadow}>{children}</div>
      </div>
    </div>
  );
}

export default Container;
