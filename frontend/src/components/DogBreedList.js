import React from "react";
import classnames from "classnames";

const divClassNames = {
  base: "grid",
  cols: "grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3",
  margins: "my-10 lg:my-20",
};

const linkClassNames = {
  base: "p-4 rounded",
  background: "bg-yellow",
  hoverBackground: "hover:bg-papaya",
  transition: "transition-all duration-200",
};

const BreedList = ({ breeds }) => {
  return (
    <div
      className={classnames(
        divClassNames.base,
        divClassNames.cols,
        divClassNames.margins
      )}
    >
      {breeds.map((breed) => (
        <a
          href={`/breeds/${breed}`}
          key={breed}
          className={classnames(
            linkClassNames.base,
            linkClassNames.background,
            linkClassNames.hoverBackground,
            linkClassNames.transition
          )}
        >
          <article>
            <h3 className="text-brown text-lg font-bold mt-4">{breed}</h3>
          </article>
        </a>
      ))}
    </div>
  );
};

export default BreedList;
