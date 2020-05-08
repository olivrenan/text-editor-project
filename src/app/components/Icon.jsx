import React from "react";

const Icon = React.forwardRef(({ ...props }, ref) => (
  <i {...props} ref={ref} className="material-icons" />
));

export default Icon;
