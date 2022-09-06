import React from "react";

import Navigation from "../../Components/Navigation/Navigation";
import PageHeading from "../../Components/PageHeading/PageHeading";
import DirectionSelect from "../../Components/DirectionSelect/DirectionSelect";

import styles from "./Direction.module.scss";

const Direction: React.FC = () => {
  return (
    <main className={`${styles["main--direction"]} main`}>
      <Navigation className={`${styles.direction__navigation}`} />
      <PageHeading
        className={`${styles.direction__heading}`}
        heading="Blok testlar hush kelibsiz"
        step={2}
      />
      <DirectionSelect />
    </main>
  );
};

export default Direction;
