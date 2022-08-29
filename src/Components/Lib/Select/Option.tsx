import React from "react";

const Option: React.FC<Props & Input> = ({ children, value }) => {
  return <option value={value}>{children}</option>;
};

export default Option;
