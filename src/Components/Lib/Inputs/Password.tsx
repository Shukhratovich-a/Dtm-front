import React from "react";

import Hide from "../Icons/Hide";
import Show from "../Icons/Show";

import styles from "./Input.module.scss";

const Password: React.FC<Input & Props> = ({ className, placeholder, name }) => {
  const [isHide, setIsHide] = React.useState<boolean>(true);

  return (
    <label className={`${className} ${styles.label}`}>
      <input
        className={`${className} ${styles.input} ${styles["input--password"]}`}
        type={isHide ? "password" : "text"}
        name={name}
        placeholder={placeholder!.charAt(0).toUpperCase() + placeholder!.slice(1)}
      />

      <button
        className={`${styles.input__button}`}
        type="button"
        onClick={() => setIsHide(!isHide)}
      >
        {isHide ? <Hide /> : <Show />}
      </button>
    </label>
  );
};

export default Password;
