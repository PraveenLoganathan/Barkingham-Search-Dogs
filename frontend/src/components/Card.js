import React from "react";
import Dog from "./Dog";
import classnames from "classnames";

const containerClasses = classnames("container", "mx-auto", "py-40");

const cardClasses = classnames(
  "flex",
  "flex-col",
  "lg:flex-row",
  "w-10/12",
  "lg:w-8/12",
  "bg-white",
  "rounded-xl",
  "mx-auto",
  "shadow-lg",
  "overflow-hidden"
);

const imageClassNames = {
  base: "lg:w-1/2",
  flex: "flex flex-col",
  fit: "items-center justify-center p-12",
  background: "bg-no-repeat bg-yellow bg-cover bg-center",
};

const Card = ({ imageURL, breed, getPicture, children }) => {
  return (
    <div className={containerClasses}>
      <div className={cardClasses}>
        <div
          className={classnames(
            imageClassNames.base,
            imageClassNames.flex,
            imageClassNames.fit,
            imageClassNames.background
          )}
        >
          <Dog imageURL={imageURL} onClick={getPicture} />
          <div className="mx-auto">
            <p className="text-lighter-brown">click image to fetch new pic</p>
          </div>
        </div>
        <div className="w-full lg:w-1/2 py-16 px-12">
          <h2 className="text-3xl text-brown mb-4 underline">{breed}</h2>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Card;
