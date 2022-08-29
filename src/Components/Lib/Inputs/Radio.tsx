import React from "react";

import styles from "./Input.module.scss";

const RadioInput: React.FC<Input & Props> = ({ className, value, name, label, defaultChecked }) => {
  return (
    <label className={`${className} ${styles.radio}`}>
      <input
        className={`${styles.radio__input} visually-hidden`}
        type="radio"
        name={name}
        value={value}
        defaultChecked={defaultChecked}
      />

      <span className={`${styles.radio__controller}`}></span>

      <span className={`${styles.radio__controller__text}`}>
        {label!.charAt(0).toUpperCase() + label!.slice(1)}
      </span>
    </label>
  );
};

export default RadioInput;
