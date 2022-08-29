import React from "react";

import styles from "./Select.module.scss";

const Select: React.FC<Props & Input> = ({ children, className, name }) => {
  return (
    <select className={`${className} ${styles.select}`} name={name}>
      {children}
    </select>
  );
};

export default Select;
