import React from "react";

import Button from "../../Components/Lib/Button/Button";

import Container from "../../Components/Container/Contianer";

import styles from "./Home.module.scss";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <main className={`${styles["main--home"]} main`}>
      <Container className={`${styles.container}`}>
        <Link className={`${styles.home__link}`} to={"/winners"}>
          <Button className={`${styles.home__button}`}>G'oliblar</Button>
        </Link>
        <Link className={`${styles.home__link}`} to={"/science"}>
          <Button className={`${styles.home__button}`}>Test ishlash</Button>
        </Link>
      </Container>
    </main>
  );
};

export default Home;
