import React from "react";

import styles from "./Button.module.scss";

const Button: React.FC<Props & Button> = ({ children, className, type = "button", onClick }) => {
  return (
    <button className={`${className} ${styles.button}`} type={type} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
