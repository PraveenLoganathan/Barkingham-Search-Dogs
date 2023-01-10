import React from "react";
import classnames from "classnames";

const buttonClassNames = {
  base: "bg-yellow text-brown border rounded w-full px-4 py-3",
  hover: "hover:bg-papaya",
  paddingMargin: "px-4",
  outline: "focus:outline-none",
  active: "active:bg-papaya-dark",
  disabled: "opacity-50 cursor-not-allowed",
};

function Button({ text, onClick, type = "button", disabled = false }) {
  const className = classnames(
    buttonClassNames.base,
    buttonClassNames.hover,
    buttonClassNames.paddingMargin,
    buttonClassNames.outline,
    {
      [buttonClassNames.active]: !disabled,
      [buttonClassNames.disabled]: disabled,
    }
  );

  return (
    <div className={buttonClassNames.paddingMargin}>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={className}
      >
        {text}
      </button>
    </div>
  );
}

export default Button;
