import React from "react";

import styles from "./Input.module.scss";

const TextInput: React.FC<Input & Props> = ({ className, placeholder, name }) => {
  return (
    <input
      className={` ${className} ${styles.input}`}
      type="text"
      name={name}
      placeholder={placeholder!.charAt(0).toUpperCase() + placeholder!.slice(1)}
    />
  );
};

export default TextInput;
