import React from "react";
import { useNavigate } from "react-router-dom";

import Arrow from "../Lib/Icons/Arrow";

import Container from "../Container/Contianer";

import styles from "./Navigation.module.scss";

const Navigation: React.FC<Props> = ({ className }) => {
  const navigate = useNavigate();

  return (
    <div className={`${styles.navigation} ${className}`}>
      <Container>
        <button className={`${styles.navigation__button}`} onClick={() => navigate(-1)}>
          <Arrow />
          <span>Orqaga</span>
        </button>
      </Container>
    </div>
  );
};

export default Navigation;
