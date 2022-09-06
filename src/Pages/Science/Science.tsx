import React from "react";

import Navigation from "../../Components/Navigation/Navigation";
import PageHeading from "../../Components/PageHeading/PageHeading";
import ScienceSelect from "../../Components/ScienceSelect/ScienceSelect";

import styles from "./Science.module.scss";

const Science: React.FC = () => {
  return (
    <main className={`${styles["main--science"]} main`}>
      <Navigation className={`${styles.science__navigation}`} to={"/"} />
      <PageHeading
        className={`${styles.science__heading}`}
        heading="Assosiy Imtihonga hush kelibsiz"
        step={1}
      />
      <ScienceSelect />
    </main>
  );
};

export default Science;
