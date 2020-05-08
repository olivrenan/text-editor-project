import React from "react";

const Button = React.forwardRef(({ active, ...props }, ref) => {
  const name = () => {
    if (active) return "#000";
    return "#fff";
  };

  return <span {...props} ref={ref} style={{ color: name() }} />;
});

export default Button;
