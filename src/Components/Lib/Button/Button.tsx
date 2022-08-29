import React from "react";

import styles from "./Button.module.scss";

const Button: React.FC<Props & Button> = ({ children, className, type = "button" }) => {
  return (
    <button className={`${className} ${styles.button}`} type={type}>
      {children}
    </button>
  );
};

export default Button;
