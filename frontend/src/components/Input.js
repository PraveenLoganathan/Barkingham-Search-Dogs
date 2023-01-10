import React from "react";
import classnames from "classnames";

const inputClassNames = {
  base: "border border-lighter-brown rounded w-full p-3",
  hover: "hover:border-brown placeholder-lighter-brown",
};

function Input({
  type = "text",
  placeholder,
  value = "",
  onChange,
  name,
  autoComplete = "off",
}) {
  return (
    <div className="px-4 mb-4">
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={classnames(inputClassNames.base, inputClassNames.hover)}
        autoComplete={autoComplete}
      />
    </div>
  );
}

export default Input;
