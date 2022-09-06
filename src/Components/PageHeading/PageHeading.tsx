import React from "react";

import Container from "../Container/Contianer";

import styles from "./PageHeading.module.scss";

const PageHeading: React.FC<PageHeading & Props> = ({ className, heading, step }) => {
  return (
    <div className={`${styles.heading} ${className}`}>
      <Container>
        <h2 className={`${styles.heading__text}`}>{heading}</h2>

        <ol className={`${styles.heading__steps}`}>
          <li
            className={`${styles.heading__step} ${
              step === 1 ? styles["heading__step--active"] : ""
            }`}
          >
            <span>1</span>
          </li>
          <li
            className={`${styles.heading__step} ${
              step === 2 ? styles["heading__step--active"] : ""
            }`}
          >
            <span>2</span>
          </li>
          <li
            className={`${styles.heading__step} ${
              step === 3 ? styles["heading__step--active"] : ""
            }`}
          >
            <span>3</span>
          </li>
        </ol>
      </Container>
    </div>
  );
};

export default PageHeading;
