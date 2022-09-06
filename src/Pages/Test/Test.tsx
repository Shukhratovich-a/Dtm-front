import React from "react";
import Tests from "../../Components/Tests/Tests";

import styles from "./Test.module.scss";

const Test: React.FC = () => {
  return (
    <main className={`${styles["main--test"]} main`}>
      <Tests />
    </main>
  );
};

export default Test;
