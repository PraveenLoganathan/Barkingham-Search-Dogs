import React from "react";

function InfoAlert({ message, color }) {
  return (
    <div style={{ color }}>
      <div className="px-4 mb-4">{message}</div>
    </div>
  );
}

InfoAlert.defaultProps = {
  color: "red",
};

export default InfoAlert;
