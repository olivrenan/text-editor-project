import React, { useState } from "react";

const PopOver = ({ actionsArray, listChildren, icon }) => {
  const [display, setDisplay] = useState(false);

  const Options = () => {
    const handleClick = index => {
      actionsArray[index]();
      setDisplay(false);
    };

    return (
      <div className="pop-over-wrap">
        <div
          className="pop-over-options"
          onMouseLeave={() => setDisplay(false)}
          onMouseEnter={() => setDisplay(true)}
        >
          {listChildren.map((children, index) => (
            <div
              key={index}
              className="pop-over-option"
              onClick={() => handleClick(index)}
            >
              {children}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div
      className="pop-over"
      onMouseLeave={() => (display ? setDisplay(false) : null)}
    >
      {display ? <Options /> : null}
      <i
        className="material-icons options-icon"
        onClick={() => setDisplay(!display)}
      >
        {icon}
      </i>
    </div>
  );
};

export default PopOver;
